import { Role, User as UserPrisma } from "generated/prisma";

declare global {
  namespace Express {
    interface User extends UserPrisma {
      role?: Role;
      sumCart?: number;
    }
  }
}
