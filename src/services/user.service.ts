import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constants";
import bcrypt from "bcrypt";
const saltRounds = 10;

const hashPassword = async (plainText: string) => {
  const hashedPassword = await bcrypt.hash(plainText, saltRounds);
  return hashedPassword;
};
const handleCreateUser = async (
  fullname: string,
  email: string,
  address: string,
  phone: string,
  avatar: string,
  role: string
) => {
  const defaultPassword = await hashPassword("123456");
  await prisma.user.create({
    data: {
      fullName: fullname,
      username: email,
      address: address,
      password: defaultPassword,
      accountType: ACCOUNT_TYPE.SYSTEM,
      avatar: avatar,
      phone: phone,
      roleId: +role,
    },
  });
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const getAllRoles = async () => {
  const roles = await prisma.role.findMany();
  return roles;
};

const handleDeleteUser = async (id?: string) => {
  const deleteUser = await prisma.user.delete({
    where: {
      id: +id!,
    },
  });
  return deleteUser;
};

const getUserByID = async (id?: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: +id!,
    },
  });
  return user;
};

const updateUserByID = async (id: string, fullname: string, email: string, address: string) => {
  const updateUser = await prisma.user.update({
    where: {
      id: +id,
    },
    data: {
      fullName: fullname,
      username: email,
      address: address,
      password: "123456",
      accountType: "",
    },
  });
};

export { handleCreateUser, getAllUsers, handleDeleteUser, getUserByID, updateUserByID, getAllRoles, hashPassword };
