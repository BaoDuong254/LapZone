import { prisma } from "config/client";

const initDatabase = async () => {
  const countUser = await prisma.user.count();
  const countRole = await prisma.role.count();
  if (countUser === 0) {
    await prisma.user.createMany({
      data: [
        {
          username: "rafael@gmail.com",
          password: "1234",
          accountType: "SYSTEM",
        },
        {
          username: "user@order.com.vn",
          password: "1234",
          accountType: "REGULAR",
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
