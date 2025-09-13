import { prisma } from "config/client";

const createProduct = async (
  name: string,
  price: number,
  detailDesc: string,
  factory: string,
  quantity: number,
  shortDesc: string,
  target: string,
  image: string | null
) => {
  await prisma.product.create({
    data: { name, price, detailDesc, factory, quantity, shortDesc, target, ...(image && { image }) },
  });
};

const getProductList = async () => {
  return await prisma.product.findMany();
}

export { createProduct, getProductList };
