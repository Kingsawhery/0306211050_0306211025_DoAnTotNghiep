import express from "express";
import passport from "passport";
import apiController from "../controllers/apiController";
import { verify } from "../function/verify";
import { CheckUserRole } from "../middleware/jwtActions";
const cookieParser = require("cookie-parser");

//Danh mục - Category 1
import {
  getAllCategories,
  getCategories,
  postNewCategory,
  editCategory,
  deleteCategory,
  searchCategories,
} from "../controllers/categoryController";

//Danh mục con - Sub Category 2
import {
  getAllSubCategories,
  getSubCategory,
  postNewSubCategory,
  editSubCategory,
  deleteSubCategory,
  searchSubCategories,
} from "../controllers/subCategoryController";

// Banner - 3
import { getAllBanners } from "../controllers/bannerController";

// Product - 4
import {
  getProduct,
  getProductDetail,
  getProductById,
  getListProductRandom,
  getSubProduct,
  getProductsImage,
  getProducts,
  getTypeClassifySubProduct,
} from "../controllers/productController";

import {
  getHomePage,
  handlePostUser,
  handleUserPage,
  handleDeleteUser,
  getUser,
  handleUpdateUser,
} from "../controllers/homeController";

// Post - 5
import { getAllPosts, getPostPage } from "../controllers/postController";
let router = express.Router();
let apiWebRoutes = (app) => {
  //Danh mục - Category 1
  router.get("/categories-homepage", getAllCategories);
  router.get("/categories/page=:page", getCategories);
  router.get("/categories/search", searchCategories);
  router.post("/categories", postNewCategory);
  router.put("/categories", editCategory);
  router.delete("/categories/:id", deleteCategory);

  //Danh mục con - Sub Category 2
  router.get("/sub-categories", getAllSubCategories);
  router.get("/sub-category", getSubCategory);
  router.get("/sub-categories/search", searchSubCategories);
  router.post("/sub-categories", postNewSubCategory);
  router.put("/sub-categories", editSubCategory);
  router.delete("/sub-categories/:id", deleteSubCategory);

  // Banner - 3
  router.get("/banners", getAllBanners);

  // Product - 4
  router.get("/product", getProduct);
  router.get("/products", getProducts);
  router.get("/product/:id", getProductById);
  router.get("/products-random", getListProductRandom);
  router.get("/sub-product", getSubProduct);
  router.get("/product-detail", getProductDetail);
  router.get("/product-detail-image", getProductsImage);
  router.get("/type-classify-sub-product", getTypeClassifySubProduct);

  // Post - 5
  router.get("/posts", getAllPosts);
  router.get("/post/:id", getPostPage);

  // User - 6
  router.get("/", getHomePage);
  // router.get("/user", handleCreatUser);
  router.get("/users", handleUserPage);
  router.post(
    "/users/create-user",
    async (req, res, next) => {
      let { email, username, password, token } = await req.body;
      let result = await verify(token);
      console.log(result);
      next();
    },
    handlePostUser
  );
  router.delete("/delete-user/:id", handleDeleteUser);
  router.get("/user-update", getUser);
  router.put("/user/user-update", handleUpdateUser);

  router.get("/test-api", apiController.testApi);
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);
  router.post("/forgot-password", apiController.handleSendEmail);
  router.post("/reset-password", apiController.handleResetPassword);
  router.get("/otp", apiController.handleOTP);
  router.post("/check-otp", apiController.handleVerify);

  router.post(
    "/auth/google",
    // passport.authenticate("google", { scope: ["profile", "email"] })
    apiController.handleLoginGG
  );

  router.get(
    "/google/redirect",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      console.log("<<<check google req", req.user);
      // Successful authentication, redirect home.
      res.redirect("/");
    }
  );
  //Cart - 7
  router.post("/cart-add", apiController.handleAddCart);
  // router.get("/cart", apiController.handleGetCart);
  //
  return app.use("/api", router);
};
module.exports = apiWebRoutes;