import { getDashboardPage } from "controllers/admin/dashboard.controller";
import {
  getCreateUser,
  getHomePage,
  getViewUser,
  postCreateUser,
  postDeleteUser,
  postUpdateUser,
} from "controllers/user.controller";
import express, { Express } from "express";
const router = express.Router();

const webRoutes = (app: Express) => {
  router.get("/", getHomePage);
  router.get("/create-user", getCreateUser);
  router.post("/handle-create-user", postCreateUser);
  router.post("/handle-delete-user/:id", postDeleteUser);
  router.get("/handle-view-user/:id", getViewUser);
  router.post("/handle-update-user/:id", postUpdateUser);
  router.get("/admin", getDashboardPage);
  app.use("/", router);
};

export default webRoutes;
