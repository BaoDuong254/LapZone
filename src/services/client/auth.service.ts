import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constants";
import { hashPassword } from "services/user.service";

const isEmailExist = async (email: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: { username: email },
  });
  return !!user;
};

const registerNewUser = async (fullName: string, email: string, password: string) => {
  const newPassword = await hashPassword(password);
  const userRole = await prisma.role.findUnique({
    where: { name: "USER" },
  });
  if (!userRole) throw new Error("Role USER not found");
  await prisma.user.create({
    data: {
      fullName,
      username: email,
      password: newPassword,
      roleId: userRole.id,
      accountType: ACCOUNT_TYPE.SYSTEM,
    },
  });
};

const getUserWithRoleByID = async (id?: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: +id!,
    },
    include: { role: true },
    omit: { password: true },
  });
  return user;
};

export { isEmailExist, registerNewUser, getUserWithRoleByID };
