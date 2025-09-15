import { NextFunction, Request, Response } from "express";
import { registerNewUser } from "services/client/auth.service";
import { RegisterSchema, TRegisterSchema } from "validation/register.schema";

const getLoginPage = (req: Request, res: Response) => {
  const { session } = req as any;
  const messages = session?.messages ?? [];
  res.render("client/auth/login", {
    messages,
  });
};

const getRegisterPage = (req: Request, res: Response) => {
  const errors: string[] = [];
  const oldData = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  res.render("client/auth/register", { errors, oldData });
};

const postRegister = async (req: Request, res: Response) => {
  const { confirmPassword, email, fullName, password } = req.body as TRegisterSchema;
  const validate = await RegisterSchema.safeParseAsync(req.body);
  if (!validate.success) {
    const errorsZod = validate.error.issues;
    const errors = errorsZod?.map((err) => `${err.message}: ${String(err.path[0])}`);
    const oldData = { fullName, email, password, confirmPassword };
    return res.render("client/auth/register", { errors, oldData });
  }
  await registerNewUser(fullName, email, password);
  return res.redirect("/login");
};

const getSuccessRedirectPage = (req: Request, res: Response) => {
  const user = req.user as any;
  if (user?.role?.name === "ADMIN") {
    return res.redirect("/admin");
  } else {
    return res.redirect("/");
  }
};

const postLogout = async (req: Request, res: Response, next: NextFunction) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

export { getLoginPage, getRegisterPage, postRegister, getSuccessRedirectPage, postLogout };
