
import { prisma } from 'config/client';
import getConnection from 'config/database';

const handleCreateUser = async (fullname: string, email: string, address: string) => {
  await prisma.user.create({
    data: {
      name: fullname,
      email: email,
      address: address
    }
  })
};

const getAllUsers = async () => {
  const connection = await getConnection();
  // A simple SELECT query
  try {
    const [results, fields] = await connection.query("SELECT * FROM `user`");

    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
    return results;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const handleDeleteUser = async (id?: string) => {
  try {
    const connection = await getConnection();
    const sql = "DELETE FROM `users` WHERE `id` = ?";
    const values = [id];
    const [result, fields] = await connection.execute(sql, values);
    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getUserByID = async (id?: string) => {
  try {
    const connection = await getConnection();
    const sql = "SELECT * FROM `users` WHERE `id` = ?";
    const values = [id];
    const [result, fields] = await connection.execute(sql, values);
    return (result as any[])[0];
  } catch (err) {
    console.log(err);
    return [];
  }
};

const updateUserByID = async (id: string, fullname: string, email: string, address: string) => {
  try {
    const connection = await getConnection();
    const sql = "UPDATE `users` SET `name` = ?, `email` = ?, `address` = ? WHERE `id` = ?";
    const values = [fullname, email, address, id];
    const [result, fields] = await connection.execute(sql, values);
    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export { handleCreateUser, getAllUsers, handleDeleteUser, getUserByID, updateUserByID };
