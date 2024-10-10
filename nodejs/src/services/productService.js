import db, { Sequelize, sequelize } from "../models";
import category from "../models/category";
import product from "../models/product";
import product_detail from "../models/product_detail";
import { Op } from "sequelize";
let getProductsRandom = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = await db.product.findAll({
        order: Sequelize.literal("rand()"),
        attributes: [
          "id",
          "name",
          "price",
          "status",
          "subCategoryId",
          "image",
          "promotion",
        ],
        limit: 8,
      });
      if (products) {
        resolve(products);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getProductBySubCategory = async (page, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = await db.product.findAndCountAll({
        where: {
          subCategoryId: id,
        },
        include: [
          {
            model: db.product_detail,
          },
        ],
        attributes: ["id", "name", "price", "status", "promotion"],
        limit: 10,
        offset: (page - 1) * 10,
      });
      if (products) {
        resolve(products);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getProductDetailById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let productDetail = await db.product_detail.findOne({
        where: {
          productId: id,
        },
        include: [
          {
            model: db.type_classify,
            include: [
              {
                model: db.type_classify_detail,
                include: [
                  {
                    model: db.product_detail,
                    where: {
                      productId: id,
                    },
                  },
                ],
              },
            ],
          },
        ],
        attributes: ["id", "rate", "productId", "stock"],
      });
      if (productDetail) {
        resolve(productDetail);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getDataProductById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let productDetail = await db.product.findOne({
        where: {
          id: id,
        },
        attributes: ["id", "name", "price", "status", "promotion"],
        include: [
          {
            model: db.product_detail,
          },
        ],
      });
      if (productDetail) {
        resolve(productDetail);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getSubProductByTypeClassify = async (listTypeClassifyDetail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = listTypeClassifyDetail["id"];
      delete listTypeClassifyDetail["id"];
      let listArray = Object.values(listTypeClassifyDetail);
      let list = listArray.map((item) => parseInt(item));
      let subProduct;
      let subProducts = await db.sub_product.findAll({
        include: [
          {
            model: db.type_classify_detail,

            // where: {
            //   // [Op.and]: list.map((value) => ({
            //   //   id: { [Op.eq]: value },
            //   // })),
            //     // [Op.and]:[
            //     //     {id:{[Op.eq]:1 } },
            //     //     {id:{[Op.eq]:11 } }
            //     // ]
            //     [Op.and]:{
            //       id:list[0],
            //       id:list[1]
            //     },

            // },
          },
        ],
        where: {
          productDetailId: id,
        },
      });
      subProduct = await handleData(subProducts, list);
      if (subProduct) {
        resolve(subProduct);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getSubProductByProduct = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let subProducts = await db.sub_product.findAll({
        include: [
          {
            model: db.type_classify_detail,
          },
        ],
        where: {
          productDetailId: id,
        },
      });

      if (subProducts) {
        resolve(subProducts);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};
const handleData = async (subProducts, list) => {
  let countTrue = 0;
  let subProduct;
  console.log(subProducts, "iii");

  for (let i = 0; i < subProducts.length; i++) {
    let arr = [];
    for (let j = 0; j < subProducts[i].type_classify_details.length; j++) {
      arr.push(subProducts[i].type_classify_details[j].id);
    }
    if (isEqual(arr, list)) {
      subProduct = subProducts[i];
    }
  }
  return subProduct;
};
const isEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  let sortedArr1 = arr1.slice().sort().toString();
  let sortedArr2 = arr2.slice().sort().toString();
  return sortedArr1 === sortedArr2;
};
const getProductDetailImage = (id) => {
  return new Promise(async (resolve, reject) => {
    console.log(id);
    try {
      const listProductDetailImage = db.product_detail_image.findAll({
        where: {
          [Op.and]: [{ productDetailId: id }],
        },
      });
      if (listProductDetailImage) {
        resolve(listProductDetailImage);
      } else {
        resolve();
      }
    } catch (e) {
      reject("Đã có lỗi xảy ra!");
      console.log(e);
    }
  });
};
const getProductDetailImages = (productDetailId, typeClassifyDetailId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const listProductDetailImage = db.product_detail_image.findAll({
        where: {
          [Op.and]: [
            { productDetailId: productDetailId },
            { typeClassifyDetailId: typeClassifyDetailId },
          ],
        },
      });
      if (listProductDetailImage) {
        resolve(listProductDetailImage);
      } else {
        resolve();
      }
    } catch (e) {
      reject("Đã có lỗi xảy ra!");
      console.log(e);
    }
  });
};
let getProductByCategory = async (page, id) => {
  return new Promise(async (resolve, reject) => {
    console.log(page, id);
    try {
      let categories = await db.product.findAndCountAll({
        where: {
          categoryId: id,
        },
        limit: 8,
        offset: page * 8,
        attributes: [
          "id",
          "name",
          "price",
          "status",
          "subCategoryId",
          "image",
          "promotion",
        ],
      });
      if (categories) {
        resolve(categories);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};
const createProduct = async (data, files) => {
  return new Promise(async (resolve, reject) => {
    console.log(data);

    try {
      const newProduct = await db.product.create({
        name: data.name ? data.name : "New device",
        subCategoryId: data.subCategory,
        price: data.price,
        status: 1,
        promotion: data.promotion,
        image: data.image,
        categoryId: data.category,
      });
      const newProductDetail = await db.product_detail.create({
        productId: newProduct.id,
        stock: data.stock,
        rate: 5,
      });
      await saveImage(files, newProductDetail.id);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
const saveImage = async (files, productDetailId) => {
  for (let i = 0; i < files.length; i++) {
    await db.product_detail_image.create({
      image: files[i].originalname,
      productDetailId: productDetailId,
      typeClassifyDetailId: 1,
    });
  }
};
module.exports = {
  getProductBySubCategory,
  getDataProductById,
  getProductDetailById,
  getSubProductByTypeClassify,
  getProductDetailImage,
  getProductByCategory,
  getProductsRandom,
  getSubProductByProduct,
  getProductDetailImages,
  createProduct,
};
