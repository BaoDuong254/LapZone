import { Request, Response } from "express";
import { getAllUsers, handleCreateUser } from "services/user.service";

const getHomePage = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  return res.render("home", {
    users: users,
  });
};

const getCreateUserPage = (req: Request, res: Response) => {
  return res.render("create-user");
};

const postCreateUserPage = async (req: Request, res: Response) => {
  const { fullname, email, address } = req.body;
  await handleCreateUser(fullname, email, address);
  return res.redirect("/");
};

export { getHomePage, getCreateUserPage, postCreateUserPage };
