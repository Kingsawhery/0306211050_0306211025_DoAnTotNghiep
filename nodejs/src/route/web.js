import express from "express";

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
  getTypeClassifySubProduct
} from "../controllers/productController";

// Post - 5
import {getAllPosts,getPostPage} from "../controllers/postController";
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
  router.get("/product/:id",getProductById);
  router.get("/products-random", getListProductRandom);
  router.get("/sub-product", getSubProduct);
  router.get("/product-detail", getProductDetail);
  router.get("/product-detail-image", getProductsImage);
  router.get("/type-classify-sub-product", getTypeClassifySubProduct);


  // Post - 5
  router.get("/posts",getAllPosts);
  router.get("/post/:id",getPostPage)
  return app.use("/api", router);
};
module.exports = apiWebRoutes;
