import { prisma } from "config/client";

const getProductWithFilter = async (
  page: number,
  pageSize: number,
  factory: string,
  target: string,
  price: string,
  sort: string
) => {
  const whereClause: any = {};
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

export { getProductWithFilter };
