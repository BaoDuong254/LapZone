import { Request, Response } from "express";

const getDashboardPage = async (req: Request, res: Response) => {
  return res.render("admin/dashboard");
};

export { getDashboardPage };
