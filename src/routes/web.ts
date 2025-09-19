import {
  getAdminOrderDetailPage,
  getAdminOrderPage,
  getAdminProductPage,
  getAdminUserPage,
  getDashboardPage,
} from "controllers/admin/dashboard.controller";
import {
  getAdminCreateProductPage,
  getViewProduct,
  postAdminCreateProduct,
  postDeleteProduct,
  postUpdateProduct,
} from "controllers/admin/product.controller";
import {
  getLoginPage,
  getRegisterPage,
  getSuccessRedirectPage,
  postLogout,
  postRegister,
} from "controllers/client/auth.controller";
import { getAccountPage, postUpdateProfile } from "controllers/client/account.controller";
import {
  getCartPage,
  getCheckOutPage,
  getOrderHistoryPage,
  getProductPage,
  getThanksPage,
  postAddProductToCart,
  postAddToCartFromDetailPage,
  postDeleteProductInCart,
  postHandleCartToCheckout,
  postPlaceOrder,
} from "controllers/client/product.controller";
import {
  getAboutPage,
  getCreateUser,
  getHomePage,
  getProductFilterPage,
  getSupportPage,
  getTermsPage,
  getViewUser,
  postCreateUser,
  postDeleteUser,
  postUpdateUser,
} from "controllers/user.controller";
import express, { Express } from "express";
import passport from "passport";
import { isAdmin } from "src/middlewares/auth";
import fileUploadMiddleware from "src/middlewares/multer";
const router = express.Router();

const webRoutes = (app: Express) => {
  // client routes
  router.get("/", getHomePage);
  router.get("/products", getProductFilterPage);
  router.get("/success-redirect", getSuccessRedirectPage);
  router.get("/product/:id", getProductPage);
  router.get("/login", getLoginPage);
  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/success-redirect",
      failureRedirect: "/login",
      failureMessage: true,
    })
  );
  router.post("/logout", postLogout);
  router.get("/register", getRegisterPage);
  router.post("/register", postRegister);
  router.post("/add-product-to-cart/:id", postAddProductToCart);
  router.get("/cart", getCartPage);
  router.post("/delete-product-in-cart/:id", postDeleteProductInCart);
  router.post("/handle-cart-to-checkout", postHandleCartToCheckout);
  router.get("/checkout", getCheckOutPage);
  router.post("/place-order", postPlaceOrder);
  router.get("/thanks", getThanksPage);
  router.get("/order-history", getOrderHistoryPage);
  router.post("/add-to-cart-from-detail-page/:id", postAddToCartFromDetailPage);
  router.get("/about", getAboutPage);
  router.get("/support", getSupportPage);
  router.get("/terms", getTermsPage);

  // Account management routes
  router.get("/account", getAccountPage);
  router.post("/account/update-profile", fileUploadMiddleware("avatar"), postUpdateProfile);

  // admin routes
  // User
  router.get("/admin", getDashboardPage);
  router.get("/admin/user", getAdminUserPage);
  router.get("/admin/create-user", getCreateUser);
  router.post("/admin/handle-create-user", fileUploadMiddleware("avatar"), postCreateUser);
  router.post("/admin/delete-user/:id", postDeleteUser);
  router.get("/admin/view-user/:id", getViewUser);
  router.post("/admin/update-user", fileUploadMiddleware("avatar"), postUpdateUser);
  // Product
  router.get("/admin/product", getAdminProductPage);
  router.get("/admin/create-product", getAdminCreateProductPage);
  router.post("/admin/create-product", fileUploadMiddleware("image", "images/product"), postAdminCreateProduct);
  router.post("/admin/delete-product/:id", postDeleteProduct);
  router.get("/admin/view-product/:id", getViewProduct);
  router.post("/admin/update-product", fileUploadMiddleware("image", "images/product"), postUpdateProduct);
  // Order
  router.get("/admin/order", getAdminOrderPage);
  router.get("/admin/order/:id", getAdminOrderDetailPage);

  app.use("/", isAdmin, router);
};

export default webRoutes;
