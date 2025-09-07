import express, {Express} from "express";
const router = express.Router();

const webRoutes = (app: Express) => {
  router.get("/", (req, res) => {
    res.render("home");
  });
  router.get("/about", (req, res) => {
    res.send("About Page");
  });
  app.use("/", router);
};

export default webRoutes;
