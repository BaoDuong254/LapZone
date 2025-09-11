import { Request, Response } from "express";
import { getAllUsers, getUserByID, handleCreateUser, handleDeleteUser, updateUserByID } from "services/user.service";

const getHomePage = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  return res.render("home", {
    users: users,
  });
};

const getCreateUser = (req: Request, res: Response) => {
  return res.render("admin/user/create.ejs");
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

const getViewUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getUserByID(id);
  return res.render("view-user.ejs", { id: id, user: user });
};

const postUpdateUser = async (req: Request, res: Response) => {
  const { id, fullname, email, address } = req.body;
  await updateUserByID(id, fullname, email, address);
  return res.redirect("/");
};

export { getHomePage, getCreateUser, postCreateUser, postDeleteUser, getViewUser, postUpdateUser };
