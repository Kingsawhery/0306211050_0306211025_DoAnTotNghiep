import express from "express";
import passport from "passport";
import cartController from "../controllers/cartController";
import apiController from "../controllers/apiController";
import invoiceController from "../controllers/invoiceController"
import forgotPasswordToken from "../controllers/forgotPasswordToken";
import { verify } from "../function/verify";
import { checkToken } from "../middleware/checkToken";
const cookieParser = require("cookie-parser");
import multer from "multer";
import fs from "fs";
//Danh mục - Category 1
import categoryController from "../controllers/categoryController";

//Danh mục con - Sub Category 2
import subCategoryController from "../controllers/subCategoryController";

// Banner - 3
import bannerController from "../controllers/bannerController";

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
  getSubProductImage,
  createNewProduct,
  deleteProduct
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
// Type Classify - 6
import {getAllTypeClassify,getAllTypeClassifyDetailById} from "../controllers/classifyController"
import {getPromotion} from "../controllers/promotionController"

let router = express.Router();
let storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    if (req.body.fileImage) {
    }
    // Set the destination folder for uploaded files
    const dir = `public/productImage/${req.body.subCategoryName}`;
    if (!fs.existsSync(dir)) {

      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    // Set the filename to be used for uploaded files
    cb(null, file.originalname);
  },
});
let storageUser = multer.diskStorage({
  destination: async function (req, file, cb) {
    if (req.body.fileImage) {
    }
    // Set the destination folder for uploaded files
    const dir = `public/userImage/${req.body.username}`;
    if (!fs.existsSync(dir)) {

      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    // Set the filename to be used for uploaded files
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
const uploadUserImage = multer({ storage: storageUser });


let apiWebRoutes = (app) => {
  //Danh mục - Category 1
  router.get("/categories", categoryController.getListNameCategory); //
  router.get("/categories-name", categoryController.getListNameCategory); //
  router.get("/sub-product-category", categoryController.getProductByCategoryId); //
  router.get("/categories", categoryController.getAllCategoriesInList); //
  router.get("/categories-name", categoryController.getListNameCategory); //
  router.get("/sub-product-category", categoryController.getProductByCategoryId); //
  router.get("/categories-homepage", categoryController.getAllCategories);
  router.get("/categories/page=:page", categoryController.getCategories);
  router.get("/categories/search", categoryController.searchCategories);
  router.post("/categories", categoryController.postNewCategory);
  router.put("/categories", categoryController.editCategory);
  router.delete("/categories/:id", categoryController.deleteCategory);

  //Danh mục con - Sub Category 2
  router.get("/sub-categories", subCategoryController.getAllSubCategories);
  router.get("/sub-category", subCategoryController.getSubCategory);
  router.get("/sub-categories/search", subCategoryController.searchSubCategories);
  router.post("/sub-categories", subCategoryController.postNewSubCategory);
  router.put("/sub-categories", subCategoryController.editSubCategory);
  router.delete("/sub-categories/:id", subCategoryController.deleteSubCategory);
  router.get("/sub-categories-name", subCategoryController.getSubCategoryNameById);

  // Banner - 3
  router.get("/banners", bannerController.getAllBanners);

  // Product - 4
  router.get("/product", getProduct);
  router.get("/products", getProducts);
  router.get("/product/:id", getProductById);
  router.get("/products-random", getListProductRandom);
  router.get("/sub-product", getSubProduct);
  router.get("/product-detail", getProductDetail);
  router.get("/product-detail-image", getProductsImage);
  router.get("/type-classify-sub-product", getTypeClassifySubProduct);
  router.get("/sub-product-image", getSubProductImage);
  router.post(
    "/create-product",
    upload.array("fileImage", 10),
    createNewProduct
  );
  router.delete("/product",checkToken,deleteProduct)
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
      if (token && result) {
        next();
      } else {
        res.status(401).json({
          EM: "Unauthorized!",
        });
      }
    },
    handlePostUser
  );
  router.delete("/delete-user/:id", handleDeleteUser);
  router.get("/user-update", getUser);
  router.put("/user/user-update", handleUpdateUser);

  router.post("/register", uploadUserImage.single("fileImage"),apiController.handleRegister);
  router.post("/login", apiController.handleLogin);

  router.get("/otp", apiController.handleOTP);
  router.post("/check-otp", apiController.handleVerify);

  router.post("/forgot-password", forgotPasswordToken.handleSendTokenToMail);
  router.post(
    "/reset-password",
    forgotPasswordToken.handleResetPasswordWithToken
  );
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
  router.get("/cart", checkToken, cartController.handleGetCart);
  router.post("/cart-add", checkToken, cartController.handleAddCart);
  router.delete("/cart-delete", checkToken, cartController.handleDestroyCart);
  router.patch("/cart-change-status", checkToken, cartController.handleChangeStatus);

  


  // Type Classify - 8 
  router.get("/type-classifies",getAllTypeClassify);
  router.get("/type-classifies-detail",getAllTypeClassifyDetailById);

  //
  router.get("/promotion",getPromotion);
  //
  router.post("/create-invoice",invoiceController.handleCreateInvoice)
  return app.use("/api", router);
};
module.exports = apiWebRoutes;
