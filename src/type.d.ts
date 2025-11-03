import { Role, User as UserPrisma } from "generated/prisma";
import "express-session";

declare global {
  namespace Express {
    interface User extends UserPrisma {
      role?: Role;
      sumCart?: number;
      heello?: string;
    }
  }
}

declare module "express-session" {
  interface SessionData {
    successMessage?: string;
    errorMessage?: string;
  }
}
