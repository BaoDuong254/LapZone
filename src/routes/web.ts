import {
  getAdminOrderPage,
  getAdminProductPage,
  getAdminUserPage,
  getDashboardPage,
} from "controllers/admin/dashboard.controller";
import { getProductPage } from "controllers/client/product.controller";
import {
  getCreateUser,
  getHomePage,
  getViewUser,
  postCreateUser,
  postDeleteUser,
  postUpdateUser,
} from "controllers/user.controller";
import express, { Express } from "express";
import fileUploadMiddleware from "src/middlewares/multer";
const router = express.Router();

const webRoutes = (app: Express) => {
  router.get("/", getHomePage);
  router.get("/product/:id", getProductPage);

  // admin routes
  router.get("/admin", getDashboardPage);
  router.get("/admin/user", getAdminUserPage);
  router.get("/admin/create-user", getCreateUser);
  router.post("/admin/handle-create-user", fileUploadMiddleware("avatar"), postCreateUser);
  router.post("/admin/delete-user/:id", postDeleteUser);
  router.get("/admin/view-user/:id", getViewUser);
  router.post("/admin/update-user", fileUploadMiddleware("avatar"), postUpdateUser);
  router.get("/admin/product", getAdminProductPage);
  router.get("/admin/order", getAdminOrderPage);
  app.use("/", router);
};

export default webRoutes;
