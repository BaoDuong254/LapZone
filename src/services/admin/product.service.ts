import { prisma } from "config/client";
import { TOTAL_ITEMS_PER_PAGE } from "config/constants";

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

const getProductList = async (page: number) => {
  const pageSize = TOTAL_ITEMS_PER_PAGE;
  const skip = (page - 1) * pageSize;
  return await prisma.product.findMany({
    skip: skip,
    take: pageSize,
  });
};

const handleDeleteProduct = async (id: number) => {
  await prisma.product.delete({
    where: { id },
  });
};

const countTotalProductsPages = async () => {
  const pageSize = TOTAL_ITEMS_PER_PAGE;
  const totalItems = await prisma.product.count();
  const totalPages = Math.ceil(totalItems / pageSize);
  return totalPages;
};

const getProductById = async (id: number) => {
  return await prisma.product.findUnique({
    where: { id },
  });
};

const updateProductById = async (
  id: number,
  name: string,
  price: number,
  detailDesc: string,
  factory: string,
  quantity: number,
  shortDesc: string,
  target: string,
  image: string | null
) => {
  await prisma.product.update({
    where: { id },
    data: { name, price, detailDesc, factory, quantity, shortDesc, target, ...(image && { image }) },
  });
};

export { createProduct, getProductList, handleDeleteProduct, getProductById, updateProductById, countTotalProductsPages };
