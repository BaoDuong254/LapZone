import { Request, Response } from "express";
import {
  getAllRoles,
  getAllUsers,
  getUserByID,
  handleCreateUser,
  handleDeleteUser,
  updateUserByID,
} from "services/user.service";

const getHomePage = async (req: Request, res: Response) => {
  return res.render("client/home/show.ejs");
};

const getCreateUser = async (req: Request, res: Response) => {
  const roles = await getAllRoles();
  return res.render("admin/user/create.ejs", { roles: roles });
};

const postCreateUser = async (req: Request, res: Response) => {
  const { fullname, username, phone, role, address } = req.body;
  const file = req.file;
  const avatar = file ? file.filename : "";
  await handleCreateUser(fullname, username, address, phone, avatar, role);
  return res.redirect("/admin/user");
};

const postDeleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await handleDeleteUser(id);
  return res.redirect("/admin/user");
};

const getViewUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getUserByID(id);
  const roles = await getAllRoles();
  return res.render("admin/user/detail.ejs", { id: id, user: user, roles: roles });
};

const postUpdateUser = async (req: Request, res: Response) => {
  const { fullname, username, phone, role, address, id } = req.body;
  const file = req.file;
  const avatar = file ? file.filename : "";
  await updateUserByID(id, fullname, phone, role, address, avatar);
  return res.redirect("/admin/user");
};

export { getHomePage, getCreateUser, postCreateUser, postDeleteUser, getViewUser, postUpdateUser };
