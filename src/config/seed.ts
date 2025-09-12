import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constants";
import { hashPassword } from "services/user.service";

// const resetDatabase = async () => {
//   console.log("Resetting database...");

//   await prisma.user.deleteMany();
//   await prisma.role.deleteMany();
//   await prisma.order.deleteMany();
//   await prisma.product.deleteMany();

//   await prisma.$executeRaw`ALTER TABLE users AUTO_INCREMENT = 1`;
//   await prisma.$executeRaw`ALTER TABLE roles AUTO_INCREMENT = 1`;
//   await prisma.$executeRaw`ALTER TABLE orders AUTO_INCREMENT = 1`;
//   await prisma.$executeRaw`ALTER TABLE products AUTO_INCREMENT = 1`;

//   console.log("Database reset completed");
// };

const initDatabase = async () => {
  const countUser = await prisma.user.count();
  const countRole = await prisma.role.count();

  // if (countRole === 0) {
  //   await prisma.$executeRaw`ALTER TABLE roles AUTO_INCREMENT = 1`;
  // }
  // if (countUser === 0) {
  //   await prisma.$executeRaw`ALTER TABLE users AUTO_INCREMENT = 1`;
  // }

  if (countRole === 0) {
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
  }
  if (countUser === 0) {
    const defaultPassword = await hashPassword("1234");
    const adminRole = await prisma.role.findFirst({
      where: { name: "ADMIN" },
    });
    if (adminRole)
      await prisma.user.createMany({
        data: [
          {
            fullName: "Admin",
            username: "rafael@gmail.com",
            password: defaultPassword,
            accountType: ACCOUNT_TYPE.SYSTEM,
            roleId: adminRole.id,
          },
          {
            fullName: "User1",
            username: "user@order.com.vn",
            password: defaultPassword,
            accountType: ACCOUNT_TYPE.SYSTEM,
            roleId: adminRole.id,
          },
        ],
      });
  }
  console.log("Database initialized");
};

export default initDatabase;
// export { resetDatabase };
