import { Role } from "generated/prisma";

declare global {
  namespace Express {
    interface User extends User {
      role?: Role;
    }
  }
}
