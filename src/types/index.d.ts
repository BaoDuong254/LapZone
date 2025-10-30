import { Role, User as UserPrisma } from "@prisma/client";
import "express-session";

declare global {
  namespace Express {
    interface User extends UserPrisma {
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
