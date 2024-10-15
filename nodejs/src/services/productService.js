import db, { Sequelize, sequelize } from "../models";
import category from "../models/category";
import product from "../models/product";
import product_detail from "../models/product_detail";
import { Op, where } from "sequelize";
let getProductsRandom = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = await db.product.findAll({
        order: Sequelize.literal("rand()"),
        where:[
        {
        subCategoryId:id
        }],
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
            model:db.post
          },
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
          {
            model:db.product,
            include:{
              model:db.sub_category
            }
          }
        ],
        attributes: ["id", "rate", "productId", "stock", "classify"],

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
        attributes: ["id", "name", "price", "status", "promotion","subCategoryId"],
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
        classify: data.detailData

      });
      const typeClassifies = data.typeClassifies.split(",");
      const typeClassifyDetail = data.typeClassifyDetail.split(",");

      let nameTypeClassify = "";
      if(typeClassifies && typeClassifies.length > 0){
        for(let i = 0; i < typeClassifies.length; i++){
          
          
          const checkTypeClassifiesExist = await db.type_classify.findOne({
            where:{
              id:typeClassifies[i]
            }
            
          })
          const checkTypeClassifyDetailExist = await db.type_classify_detail.findOne({
            where:{
              typeClassifyId:typeClassifies[i]
            }
            
          })
          nameTypeClassify += checkTypeClassifyDetailExist.name + " ";
          if(checkTypeClassifiesExist){
            
            const createProductDetailTypeClassify = await db.product_detail_type_classify.create({
              productDetailId: newProductDetail.id,
              typeClassifyId: Number(typeClassifies[i])
            })
            
            
          }
          

        }
    }
    if(typeClassifyDetail && typeClassifyDetail.length > 0){
      for(let i = 0; i < typeClassifyDetail.length; i++){
        
        const checkTypeClassifyDetailExist = await db.type_classify_detail.findOne({
          where:{
            id:typeClassifyDetail[i]
          }
        })
        if(checkTypeClassifyDetailExist){
          const checkProductDetailExistClassify = await db.product_detail_type_classify.findOne({
            where:{
              [Op.and]:{
                productDetailId: newProductDetail.id,
                typeClassifyId: checkTypeClassifyDetailExist.typeClassifyId
              }
            }
          })
          if(checkProductDetailExistClassify){
            const createProductDetailTypeClassify = await db.product_detail_type_classify_detail.create({
              productDetailId: newProductDetail.id,
              typeClassifyDetailId: typeClassifyDetail[i]
            })
          }
     
          if(createProduct){
            resolve();
          }
          else{
            
          }
          }
        }
       
        

    }
    handleDataDetail(typeClassifies, typeClassifyDetail, data, nameTypeClassify, newProductDetail.id)
  // }
    
      await saveImage(files, newProductDetail.id);
      resolve(newProduct);
    } catch (e) {
      reject(e);
    }
  });
};
const handleDataDetail = async (type, typeDetail,data ,nameTypeClassify, detail) =>{
  try{
    console.log(detail.id);
    
    let arr = [];
    for(let i = 0; i < typeDetail.length; i++){
      const check = await db.type_classify_detail.findOne({
        where:{
          id:typeDetail[i]
        }
      })
      arr.push({id:check.typeClassifyId, data:typeDetail[i]})
    }

  const grouped = arr.reduce((acc, current) => {
    // Kiểm tra xem id đã tồn tại trong accumulator hay chưa
    const existingGroup = acc.find(group => group.id === current.id);
  
    if (existingGroup) {
      // Nếu tồn tại, thêm type vào mảng types
      existingGroup.types.push(current.data);
    } else {
      // Nếu chưa tồn tại, tạo nhóm mới
      acc.push({
        id: current.id,
        types: [current.data]
      });
    }
  
    return acc;
  }, []);
  const result = grouped.map(item => item.types);
  function createNumber(arr, index = 0, number = [], result = []) {
    if (index === arr.length) {
        result.push([...number]); // Đẩy bản sao của mảng vào kết quả
        return;
    }
    
    for (let i = 0; i < arr[index].length; i++) {
        if (!number.includes(arr[index][i])) { // Kiểm tra nếu phần tử chưa tồn tại trong mảng `number`
            number.push(arr[index][i]); // Thêm phần tử vào mảng `number`
            createNumber(arr, index + 1, number, result); // Đệ quy với mảng mới
            number.pop(); // Xóa phần tử cuối cùng để thử giá trị khác
        }
    }
    return result; // Trả về mảng kết quả
}
const dataSubProduct = createNumber(result);
for(let i = 0; i < dataSubProduct.length; i++){
  console.log(detail.id)
  console.log(detail.name)

  
  const creatSubProduct = await db.sub_product.create({
    name:  data.name + " " + nameTypeClassify,
    price: data.price,
    productDetailId: detail,
    sold:0,
    stock:0,
    image: data.image
})
  for(let y = 0; y < dataSubProduct[i].length; y++){
    console.log(dataSubProduct[i][y]);
    
    const creatSubProductDetail = await db.sub_product_type_classify_detail.create({
      subProductId:creatSubProduct.id,
      typeClassifyDetailId:dataSubProduct[i][y]
    })
  }
}
  
      
    
  }catch(e){
    console.log(e);
    
  }
  
}
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
