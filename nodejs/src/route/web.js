import express from "express";
import passport from "passport";
import cartController from "../controllers/cartController";
import apiController from "../controllers/apiController";
import invoiceController from "../controllers/invoiceController";
import forgotPasswordToken from "../controllers/forgotPasswordToken";
import { verify } from "../function/verify";
import { checkAdmin, checkToken, checkUser, checkAdminData } from "../middleware/checkToken";
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
  handleGetSubProd,   
  handleSetPriceSubProd,
  getProductDetail,
  getProductById,
  getListProductRandom,
  getSubProduct,
  getProductsImage,
  getProducts,
  getTypeClassifySubProduct,
  getSubProductImage,
  createNewProduct,
  deleteProduct,
  checkOutStock,
  handleSetProduct,
  restoreProduct,
  handleCreateSubProduct,
  putBrandOrPost
} from "../controllers/productController";
import {getAllBrands, postNewBrand, putNewBrand, handlePutDisplay, getAllBrandDisplay,
  getAllProductBrands
} from "../controllers/brandController"
import {
  getHomePage,
  handlePostUser,
  handleUserPage,
  handleDeleteUser,
  getUser,
  handleUpdateUser,
} from "../controllers/homeController";
import {
  handleGetDataUser,
  handleLockUser
}from "../controllers/userController";
import postController from "../controllers/postController"
// Post - 5
import { getAllPosts, getPostPage , handleGetListPost} from "../controllers/postController";
// Type Classify - 6
import {getAllTypeClassify,getAllTypeClassifyDetailById,getAllTypeClassifyDetailProductId} from "../controllers/classifyController"
import {getPromotion, getAllPromotions,handleCreatePromotions,handleCreatePromotionProduct, handleEditPromotions} from "../controllers/promotionController"
import path from "path";
import { toVietnameseSlug, xuLyTenFile } from "../function/generalFunction";
import { getTop10Invoices, getTopTenBrand, getTopTenProd, getTopTenSubCate} from "../controllers/dashboardController";
import { getTopTenSubProd } from "../controllers/dashboardController";
import { getTop10User } from "../controllers/dashboardController";
import { handleGetCommentsByProductDetailId } from "../controllers/commentController";
import { handleGetProperties } from "../controllers/propertyController";
handleGetCommentsByProductDetailId
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
let storagePost = multer.diskStorage({
  destination: async function (req, file, cb) {
    if (req.body.fileImage) {
    }
    // Set the destination folder for uploaded files
    const dir = `public/postImage/`;
    if (!fs.existsSync(dir)) {  
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const namefile = xuLyTenFile(req.body.image)
    cb(null,namefile);
  }
});
let storageUser = multer.diskStorage({
  destination: async function (req, file, cb) {
    if (req.body.fileImage) {
    }
    // Set the destination folder for uploaded files
    const dir = `public/userImage/`;
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
let storageInvoiceImage = multer.diskStorage({
  destination: async function (req, file, cb) {
    if (req.body.fileImage) {
    }
    // Set the destination folder for uploaded files
    const dir = `public/invoiceImage/${req.body.invoiceCode + "-" + req.body.username}`;
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
const uploadPost = multer({ storage: storagePost });
const uploadUserImage = multer({ storage: storageUser });
const uploadInvoiceImage = multer({ storage: storageInvoiceImage});
let apiWebRoutes = (app) => {
  //Dashboard 
  router.get("/top-10-subprod", getTopTenSubProd)
  router.get("/top-10-prod", getTopTenProd)
  router.get("/top-10-user", getTop10User)
  router.get("/top-10-sub-cate", getTopTenSubCate)
  router.get("/top-10-brand", getTopTenBrand)
  router.get("/top-10-invoices", getTop10Invoices)
  //Danh mục - Category 1
  router.get("/categories", categoryController.getListNameCategory); //
  router.get("/categories-name", categoryController.getListNameCategory); //
  router.get("/categories-name-admin", categoryController.getListNameCategoryAdmin); //
  router.put("/put-display-categories", categoryController.handlePutDisplay);
  router.get("/sub-product-category", categoryController.getProductByCategoryId); //
  router.get("/categories", categoryController.getAllCategoriesInList); //
  router.get("/categories-name", categoryController.getListNameCategory); //
  router.get("/sub-product-category", categoryController.getProductByCategoryId); //
  router.get("/categories-homepage", categoryController.getAllCategories);
  router.get("/categories-admin", categoryController.getCategories);
  router.get("/categories/search", categoryController.searchCategories);
  router.post("/categories", categoryController.postNewCategory);
  router.put("/categories", categoryController.editCategory);
  router.put("/change-categories", categoryController.deleteCategory);
  router.get("/categories-page", categoryController.handleGetProductByCategory);
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
  router.put("/brand-post", putBrandOrPost)
  router.get("/properties", handleGetProperties);

  router.get("/brands", getAllBrands);
  router.get("/product-by-brand", getAllProductBrands);
  router.post("/create-brand", postNewBrand);
  router.put("/put-brand", putNewBrand);
  router.put("/put-display-brand", handlePutDisplay);
  router.get("/brand-display", getAllBrandDisplay);
  // Product - 4
  router.get("/subprod-by-product", handleGetSubProd);
  router.put("/set-price-sub-product", handleSetPriceSubProd);
  router.put("/products", handleSetProduct);
  router.get("/comment-product", handleGetCommentsByProductDetailId);
  router.get("/product", getProduct);
  router.get("/products", getProducts);
  router.get("/product/:id", getProductById);
  router.get("/products-random", getListProductRandom);
  router.post("/create-sub-prod", handleCreateSubProduct);
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
  router.post("/check-out-stock",checkOutStock)
  router.delete("/product",checkToken,deleteProduct)
  router.put("/product-status",checkToken,restoreProduct)
  // Post - 5
  router.get("/posts", getAllPosts);
  router.get("/list-posts", handleGetListPost);
  router.get("/post/:id", getPostPage);
  router.post("/create-post", uploadPost.single("fileUpload"),postController.createPost);
  router.post("/put-post", uploadPost.single("fileUpload"),postController.putPost);
  // User - 6
  router.get("/", getHomePage);
  // router.get("/user", handleCreatUser);
  router.get("/users", handleUserPage);
  router.put("/lock-user", handleLockUser)
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
  router.put("/change-data-user", uploadUserImage.single("fileImage"),apiController.changeDataUser);
  router.post("/login", apiController.handleLogin);
  router.get("/otp", apiController.handleOTP);
  router.post("/check-otp", apiController.handleVerify);
  router.post(
    "/handle-forgot-password",
    forgotPasswordToken.handleForgetPasswordWithToken
  );
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
  router.get("/get-user",handleGetDataUser);
  //Cart - 7
  router.get("/cart", checkToken, cartController.handleGetCart);
  router.post("/cart-add", checkToken, cartController.handleAddCart);
  router.delete("/cart-delete", checkToken, cartController.handleDestroyCart);
  router.patch("/cart-change-status", checkToken, cartController.handleChangeStatus);
  router.get("/check",checkUser)
  router.get("/check-admin-role",checkAdmin)
  // Type Classify - 8 
  router.get("/type-classifies",getAllTypeClassify);
  router.get("/type-classifies-detail",getAllTypeClassifyDetailById);
  router.get("/type-classifies-detail-sub-prod",getAllTypeClassifyDetailProductId);
  //
  router.get("/promotion",getPromotion);
  router.get("/promotions", getAllPromotions);
  router.post("/create-prod-promotions", handleCreatePromotionProduct);
  router.post("/create-promotion", handleCreatePromotions);
  router.put("/edit-promotion", handleEditPromotions)
  //
  router.get("/get-sub-invoice",invoiceController.handleGetSubInvoice)
  router.post("/create-invoice",invoiceController.handleCreateInvoice)
  router.get("/get-invoice-status",invoiceController.handleGetInvoiceStatus)
  router.get("/get-invoice-by-status",checkAdminData,invoiceController.handleGetInvoiceByStatus)
  router.get("/get-invoice-by-status-user",invoiceController.handleGetInvoiceByStatusUser)
  router.post("/change-status-ivoice", uploadInvoiceImage.array("fileImage",10),invoiceController.handleChangeStatus);
  router.put("/cancel-invoice",  invoiceController.cancelInvoice);
  router.post("/callback",invoiceController.handlePaymentStatus)
  return app.use("/api", router);
};
module.exports = apiWebRoutes;
