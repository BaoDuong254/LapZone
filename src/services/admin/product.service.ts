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
};

const handleDeleteProduct = async (id: number) => {
  await prisma.product.delete({
    where: { id },
  });
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

export { createProduct, getProductList, handleDeleteProduct, getProductById, updateProductById };
