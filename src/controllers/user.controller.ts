import { Request, Response } from "express";
import { countTotalProductClientPages, getProducts } from "services/client/item.service";
import { getProductWithFilter } from "services/client/product.filter";
import { getAllRoles, getUserByID, handleCreateUser, handleDeleteUser, updateUserByID } from "services/user.service";

const getHomePage = async (req: Request, res: Response) => {
  const { page } = req.query;
  let currentPage = page ? +page : 1;
  if (currentPage < 1) currentPage = 1;
  const totalPages = await countTotalProductClientPages(8);
  const products = await getProducts(currentPage, 8);
  return res.render("client/home/show.ejs", { products: products, totalPages: +totalPages, page: +currentPage });
};

const getCreateUser = async (req: Request, res: Response) => {
  const roles = await getAllRoles();
  return res.render("admin/user/create.ejs", { roles: roles });
};

const postCreateUser = async (req: Request, res: Response) => {
  const { fullname, username, phone, role, address } = req.body;
  const file = req.file;
  const avatar = file ? file.filename : "";
  await handleCreateUser(fullname, username, address, phone, avatar, role);
  return res.redirect("/admin/user");
};

const postDeleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await handleDeleteUser(id);
  return res.redirect("/admin/user");
};

const getViewUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getUserByID(id);
  const roles = await getAllRoles();
  return res.render("admin/user/detail.ejs", { id: id, user: user, roles: roles });
};

const postUpdateUser = async (req: Request, res: Response) => {
  const { fullname, username, phone, role, address, id } = req.body;
  const file = req.file;
  const avatar = file ? file.filename : "";
  await updateUserByID(id, fullname, phone, role, address, avatar);
  return res.redirect("/admin/user");
};

const getProductFilterPage = async (req: Request, res: Response) => {
  const {
    page,
    factory = "",
    target = "",
    price = "",
    sort = "",
  } = req.query as {
    page?: string;
    factory: string;
    target: string;
    price: string;
    sort: string;
  };
  let currentPage = page ? +page : 1;
  if (currentPage < 1) currentPage = 1;
  const data = await getProductWithFilter(currentPage, 6, factory, target, price, sort);
  return res.render("client/product/filter.ejs", {
    products: data.products,
    totalPages: +data.totalPages,
    page: +currentPage,
  });
};

const getAboutPage = async (req: Request, res: Response) => {
  return res.render("client/about.ejs");
};

const getSupportPage = async (req: Request, res: Response) => {
  return res.render("client/support.ejs");
};

const getTermsPage = async (req: Request, res: Response) => {
  return res.render("client/terms.ejs");
};

export {
  getHomePage,
  getCreateUser,
  postCreateUser,
  postDeleteUser,
  getViewUser,
  postUpdateUser,
  getProductFilterPage,
  getAboutPage,
  getSupportPage,
  getTermsPage,
};
