import { Request, Response } from "express";
import { getProductById } from "services/admin/product.service";
import { addProductToCart } from "services/client/item.service";

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

export { getProductPage, postAddProductToCart };
