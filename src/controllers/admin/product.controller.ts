import { Request, Response } from "express";
import { createProduct } from "services/admin/product.service";
import { ProductSchema, TProductSchema } from "validation/product.schema";

const getAdminCreateProductPage = async (req: Request, res: Response) => {
  const errors: string[] = [];
  const oldData = {
    name: "",
    price: "",
    detailDesc: "",
    shortDesc: "",
    quantity: "",
    factory: "",
    target: "",
  };
  return res.render("admin/product/create.ejs", { errors, oldData });
};

const postAdminCreateProduct = async (req: Request, res: Response) => {
  const { name, price, detailDesc, factory, quantity, shortDesc, target } = req.body as TProductSchema;
  const validate = ProductSchema.safeParse(req.body);
  if (!validate.success) {
    const errorZod = validate.error.issues;
    const errors = errorZod?.map((item) => `${item.message} (${String(item.path[0])})`);
    const oldData = { name, price, detailDesc, factory, quantity, shortDesc, target };
    return res.render("admin/product/create.ejs", { errors, oldData });
  }
  const image = req.file ? req.file.filename : null;
  await createProduct(name, +price, detailDesc, factory, +quantity, shortDesc, target, image);
  return res.redirect("/admin/product");
};

export { getAdminCreateProductPage, postAdminCreateProduct };
