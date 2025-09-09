import { prisma } from "config/client";
import getConnection from "config/database";

const handleCreateUser = async (fullname: string, email: string, address: string) => {
  await prisma.user.create({
    data: {
      name: fullname,
      email: email,
      address: address,
    },
  });
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
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
      name: fullname,
      email: email,
      address: address,
    },
  });
};

export { handleCreateUser, getAllUsers, handleDeleteUser, getUserByID, updateUserByID };
