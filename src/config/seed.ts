import { prisma } from "config/client";

const initDatabase = async () => {
  const countUser = await prisma.user.count();
  if (countUser > 0) return;
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
};

export default initDatabase;
