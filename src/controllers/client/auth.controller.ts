import { Request, Response } from "express";

const getLoginPage = (req: Request, res: Response) => {
  res.render("client/auth/login");
};

const getRegisterPage = (req: Request, res: Response) => {
  res.render("client/auth/register");
};

export { getLoginPage, getRegisterPage };
