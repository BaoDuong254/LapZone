import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constants";
import { hashPassword } from "services/user.service";

const initDatabase = async () => {
  const countUser = await prisma.user.count();
  const countRole = await prisma.role.count();
  if (countUser === 0) {
    const defaultPassword = await hashPassword("1234");
    await prisma.user.createMany({
      data: [
        {
          fullName: "Admin",
          username: "rafael@gmail.com",
          password: defaultPassword,
          accountType: ACCOUNT_TYPE.SYSTEM
        },
        {
          fullName: "User1",
          username: "user@order.com.vn",
          password: defaultPassword,
          accountType: ACCOUNT_TYPE.SYSTEM
        },
      ],
    });
  } else if (countRole === 0) {
    await prisma.role.createMany({
      data: [
        {
          name: "ADMIN",
          description: "Administrator with full access",
        },
        {
          name: "USER",
          description: "Regular user with limited access",
        },
      ],
    });
  } else {
    console.log("Database already initialized");
  }
};

export default initDatabase;
