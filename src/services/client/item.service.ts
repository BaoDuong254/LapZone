import { prisma } from "config/database";

const getProducts = async (page: number, pageSize: number) => {
  const skip = (page - 1) * pageSize;
  return await prisma.product.findMany({
    skip: skip,
    take: pageSize,
  });
};

const countTotalProductClientPages = async (pageSize: number) => {
  const totalItems = await prisma.product.count();
  const totalPages = Math.ceil(totalItems / pageSize);
  return totalPages;
};

const getProductById = async (id: number) => {
  return await prisma.product.findUnique({
    where: { id: id },
  });
};

const addProductToCart = async (quantity: number, productId: number, user: { id: number }) => {
  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
  });

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  if (cart) {
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        sum: {
          increment: quantity,
        },
      },
    });
    const currentCartDetail = await prisma.cartDetail.findFirst({
      where: {
        productId: productId,
        cartId: cart.id,
      },
    });
    await prisma.cartDetail.upsert({
      where: {
        id: currentCartDetail?.id ?? 0,
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        price: product.price,
        quantity: quantity,
        productId: productId,
        cartId: cart.id,
      },
    });
  } else {
    await prisma.cart.create({
      data: {
        sum: quantity,
        userId: user.id,
        cartDetails: {
          create: {
            price: product.price,
            quantity: quantity,
            productId: productId,
          },
        },
      },
    });
  }
};

const getProductInCart = async (userId: number) => {
  const cart = await prisma.cart.findUnique({
    where: { userId: userId },
  });

  if (cart) {
    const currentCartDetail = await prisma.cartDetail.findMany({
      where: { cartId: cart.id },
      include: { product: true },
    });
    return currentCartDetail;
  }
  return [];
};

const deleteProductInCart = async (cartDetailId: number, userId: number, sumCart: number) => {
  const currentCartDetail = await prisma.cartDetail.findUnique({
    where: { id: cartDetailId },
  });
  const quantityToRemove = currentCartDetail?.quantity || 0;
  await prisma.cartDetail.delete({
    where: { id: cartDetailId },
  });

  if (sumCart === 1) {
    await prisma.cart.delete({
      where: { userId: userId },
    });
  } else {
    await prisma.cart.update({
      where: { userId: userId },
      data: {
        sum: {
          decrement: quantityToRemove,
        },
      },
    });
  }
};

const updateCartDetailBeforeCheckout = async (data: { id: string; quantity: string }[], cartId: string) => {
  let quantity = 0;
  for (let i = 0; i < data.length; i++) {
    quantity += Number(data[i]?.quantity);
    await prisma.cartDetail.update({
      where: { id: Number(data[i]?.id) },
      data: {
        quantity: Number(data[i]?.quantity),
      },
    });
  }
  await prisma.cart.update({
    where: { id: Number(cartId) },
    data: {
      sum: quantity,
    },
  });
};

const handlePlaceOrder = async (
  userId: number,
  receiverName: string,
  receiverAddress: string,
  receiverPhone: string,
  totalPrice: number
) => {
  try {
    await prisma.$transaction(async (tx) => {
      const cart = await tx.cart.findUnique({
        where: { userId: userId },
        include: { cartDetails: true },
      });
      if (cart) {
        // Create order
        const dataOrderDetail =
          cart?.cartDetails?.map((item) => ({
            productId: item.productId,
            price: item.price,
            quantity: item.quantity,
          })) || [];
        await tx.order.create({
          data: {
            receiverName,
            receiverAddress,
            receiverPhone,
            paymentMethod: "COD",
            paymentStatus: "PAYMENT_UNPAID",
            status: "PENDING",
            totalPrice: totalPrice,
            userId,
            orderDetails: {
              create: dataOrderDetail,
            },
          },
        });
        // Clear cart
        await tx.cartDetail.deleteMany({
          where: { cartId: cart.id },
        });
        await tx.cart.delete({
          where: { id: cart.id },
        });
        // Update product quantity and sold
        for (let i = 0; i < cart.cartDetails.length; i++) {
          const productId = cart.cartDetails[i]?.productId;
          const cartDetailQuantity = cart.cartDetails[i]?.quantity ?? 0;
          const product = await tx.product.findUnique({
            where: { id: productId! },
          });
          if (!product || product.quantity < cartDetailQuantity) {
            throw new Error(`Product ${product?.name} is out of stock`);
          }
          await tx.product.update({
            where: { id: productId! },
            data: {
              quantity: {
                decrement: cart.cartDetails[i]?.quantity ?? 0,
              },
              sold: {
                increment: cart.cartDetails[i]?.quantity ?? 0,
              },
            },
          });
        }
      }
    });
    return "";
  } catch (error: any) {
    return error.message;
  }
};

const getOrderHistory = async (userId: number) => {
  const orders = await prisma.order.findMany({
    where: { userId },
    include: { orderDetails: { include: { product: true } } },
  });
  return orders;
};

export {
  getProducts,
  getProductById,
  addProductToCart,
  getProductInCart,
  deleteProductInCart,
  updateCartDetailBeforeCheckout,
  handlePlaceOrder,
  getOrderHistory,
  countTotalProductClientPages,
};
