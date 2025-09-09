import { getCreateUser, getHomePage, getViewUser, postCreateUser, postDeleteUser } from "controllers/user.controller";
import express, { Express } from "express";
const router = express.Router();

const webRoutes = (app: Express) => {
  router.get("/", getHomePage);
  router.get("/create-user", getCreateUser);
  router.post("/handle-create-user", postCreateUser);
  router.post("/handle-delete-user/:id", postDeleteUser);
  router.get("/handle-view-user/:id", getViewUser);
  app.use("/", router);
};

export default webRoutes;
