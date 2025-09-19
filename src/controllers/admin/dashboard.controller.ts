import { Request, Response } from "express";
import { getDashboardInfo } from "services/admin/dashboard.service";
import { countTotalOrdersPages, getOrderAdmin, getOrderDetailAdmin } from "services/admin/order.service";
import { countTotalProductsPages, getProductList } from "services/admin/product.service";
import { countTotalUsersPages, getAllUsers } from "services/user.service";

const getDashboardPage = async (req: Request, res: Response) => {
  const info = await getDashboardInfo();
  return res.render("admin/dashboard/show", {
    info,
  });
};

const getAdminUserPage = async (req: Request, res: Response) => {
  const { page } = req.query;
  let currentPage = page ? +page : 1;
  if (currentPage < 1) {
    currentPage = 1;
  }
  const users = await getAllUsers(currentPage);
  const totalPages = await countTotalUsersPages();
  return res.render("admin/user/show.ejs", { users: users, totalPages: +totalPages, page: +page! });
};

const getAdminProductPage = async (req: Request, res: Response) => {
  const { page } = req.query;
  let currentPage = page ? +page : 1;
  if (currentPage < 1) {
    currentPage = 1;
  }
  const totalPages = await countTotalProductsPages();
  const products = await getProductList(currentPage);
  return res.render("admin/product/show.ejs", { products: products, totalPages: +totalPages, page: +currentPage! });
};

const getAdminOrderPage = async (req: Request, res: Response) => {
  const { page } = req.query;
  let currentPage = page ? +page : 1;
  if (currentPage < 1) {
    currentPage = 1;
  }
  const totalPages = await countTotalOrdersPages();
  const orders = await getOrderAdmin(currentPage);
  return res.render("admin/order/show.ejs", { orders: orders, totalPages: +totalPages, page: +currentPage! });
};

const getAdminOrderDetailPage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const orderDetails = await getOrderDetailAdmin(Number(id));
  return res.render("admin/order/detail.ejs", { orderDetails: orderDetails, id });
};

export { getDashboardPage, getAdminUserPage, getAdminProductPage, getAdminOrderPage, getAdminOrderDetailPage };
