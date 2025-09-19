import { prisma } from "config/client";

const userFilter = async (usernameInput: string) => {
  return await prisma.user.findMany({
    where: {
      username: {
        contains: usernameInput,
      },
    },
  });
};

const yeucau1 = async (minPrice: number) => {
  return await prisma.product.findMany({
    where: {
      price: {
        gte: minPrice,
      },
    },
  });
};

const yeucau2 = async (maxPrice: number) => {
  return await prisma.product.findMany({
    where: {
      price: {
        lte: maxPrice,
      },
    },
  });
};

const yeucau3 = async (factory: string) => {
  return await prisma.product.findMany({
    where: {
      factory: {
        equals: factory,
      },
    },
  });
};

const yeucau4 = async (factories: string[]) => {
  return await prisma.product.findMany({
    where: {
      factory: {
        in: factories,
      },
    },
  });
};

const yeucau5 = async (minPrice: number, maxPrice: number) => {
  return await prisma.product.findMany({
    where: {
      price: {
        gte: minPrice,
        lte: maxPrice,
      },
    },
  });
};

const yeucau6 = async () => {
  return await prisma.product.findMany({
    where: {
      OR: [
        {
          price: {
            gte: 10000000,
            lte: 15000000,
          },
        },
        {
          price: {
            gte: 16000000,
            lte: 20000000,
          },
        },
      ],
    },
  });
};

const yeucau7 = async () => {
  return await prisma.product.findMany({
    orderBy: {
      price: "asc",
    },
  });
};

const getProductWithFilter = async (
  page: number,
  pageSize: number,
  factory: string,
  target: string,
  price: string,
  sort: string
) => {
  let whereClause: any = {};
  if (factory) {
    const factoryInput = factory.split(",");
    whereClause.factory = {
      in: factoryInput,
    };
  }
  if (target) {
    const targetInput = target.split(",");
    whereClause.target = {
      in: targetInput,
    };
  }
  if (price) {
    const priceRanges = price.split(",");
    const priceConditions = [];
    for (let i = 0; i < priceRanges.length; i++) {
      if (priceRanges[i] === "duoi-10-trieu") {
        priceConditions.push({ price: { lt: 10000000 } });
      }
      if (priceRanges[i] === "10-15-trieu") {
        priceConditions.push({ price: { gte: 10000000, lte: 15000000 } });
      }
      if (priceRanges[i] === "15-20-trieu") {
        priceConditions.push({ price: { gte: 15000000, lte: 20000000 } });
      }
      if (priceRanges[i] === "tren-20-trieu") {
        priceConditions.push({ price: { gt: 20000000 } });
      }
    }
    whereClause.OR = priceConditions;
  }
  let orderByClause: any = {};
  if (sort) {
    if (sort === "gia-tang-dan") {
      orderByClause = { price: "asc" };
    } else if (sort === "gia-giam-dan") {
      orderByClause = { price: "desc" };
    }
  }
  const [products, count] = await prisma.$transaction([
    prisma.product.findMany({
      where: whereClause,
      orderBy: orderByClause,
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.product.count({ where: whereClause }),
  ]);
  const totalPages = Math.ceil(count / pageSize);
  return { products, totalPages };
};

export { userFilter, yeucau1, yeucau2, yeucau3, yeucau4, yeucau5, yeucau6, yeucau7, getProductWithFilter };
