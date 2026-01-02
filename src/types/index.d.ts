import { Role, User as UserPrisma } from "generated/prisma";
import "express-session";

declare global {
  namespace Express {
    interface User extends UserPrisma {
      id: number;
      role?: Role;
      sumCart?: number;
    }
  }
}

declare module "express-session" {
  interface SessionData {
    successMessage?: string;
    errorMessage?: string;
  }
}
