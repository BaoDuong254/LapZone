import { Request, Response, NextFunction } from "express";

const isLogin = (req: Request, res: Response, next: NextFunction) => {
  const isAuthenticated = req.isAuthenticated();
  if (isAuthenticated) {
    res.redirect("/");
  } else {
    next();
  }
};

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  if (user?.role?.name === "ADMIN") {
    next();
  } else {
    return res.redirect("/");
  }
};

export { isLogin, isAdmin };
