import { Request, Response } from "express";
import { getProductById } from "services/admin/product.service";
import { addProductToCart, getProductInCart } from "services/client/item.service";

const getProductPage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await getProductById(Number(id));
  return res.render("client/product/detail.ejs", { product: product });
};

const postAddProductToCart = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;
  if (user) {
    await addProductToCart(1, Number(id), user);
  } else {
    return res.redirect("/login");
  }
  return res.redirect("/");
};

const getCartPage = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.redirect("/login");
  }
  const cartDetails = await getProductInCart(+user.id);
  const totalPrice = cartDetails?.map((item) => +item.price * +item.quantity).reduce((a, b) => a + b, 0) || 0;
  return res.render("client/product/cart.ejs", { cartDetails, totalPrice });
}

export { getProductPage, postAddProductToCart, getCartPage };
