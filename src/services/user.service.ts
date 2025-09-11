import { prisma } from "config/client";
import getConnection from "config/database";

const handleCreateUser = async (fullname: string, email: string, address: string) => {
  await prisma.user.create({
    data: {
      fullName: fullname,
      username: email,
      address: address,
      password: "123456",
      accountType: "",
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

export { handleCreateUser, getAllUsers, handleDeleteUser, getUserByID, updateUserByID, getAllRoles };
