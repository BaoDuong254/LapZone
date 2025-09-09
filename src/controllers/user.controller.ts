import { Request, Response } from "express";
import { getAllUsers, handleCreateUser, handleDeleteUser } from "services/user.service";

const getHomePage = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  return res.render("home", {
    users: users,
  });
};

const getCreateUser = (req: Request, res: Response) => {
  return res.render("create-user");
};

const postCreateUser = async (req: Request, res: Response) => {
  const { fullname, email, address } = req.body;
  await handleCreateUser(fullname, email, address);
  return res.redirect("/");
};

const postDeleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await handleDeleteUser(id);
  return res.redirect("/");
};

export { getHomePage, getCreateUser, postCreateUser, postDeleteUser };
