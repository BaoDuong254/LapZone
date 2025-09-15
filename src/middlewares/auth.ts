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
  if (req.path.startsWith("/admin")) {
    const user = req.user;
    if (user?.role?.name === "ADMIN") {
      next();
    } else {
      res.render("status/403");
    }
    return;
  }
  next();
};

export { isLogin, isAdmin };
