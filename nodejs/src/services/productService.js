import db, { Sequelize, sequelize } from "../models";
import category from "../models/category";
import product from "../models/product";
import product_detail from "../models/product_detail";
import { Op, where } from "sequelize";
let getProductsRandom = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = await db.product.findAll({
        // order: Sequelize.literal("rand()"),
        include: [{
          model: db.sub_category
        }],
        where: [
          {
            status:true,
            subCategoryId: id
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
let handleCheckOutStock = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let array = [];
      let dataProd = data.data;

      if (dataProd.length > 0) {
        console.log("có");

        for (let i = 0; i < dataProd.length; i++) {
          const subProd = await db.sub_product.findOne({
            where: {
              id: dataProd[i].sub_productId
            }
          })


          if (subProd.stock < dataProd[i].quantity) {
            console.log(subProd.stock + " " + dataProd[i].quantity);

            array.push(subProd)
          } else {
            continue;
          }
        }
        resolve(array);
      } else {
        resolve(array);
      }
    } catch (e) {

    }
  })
}
let getProductBySubCategory = async (page, id,sort) => {
  return new Promise(async (resolve, reject) => {
    try {
      let orderOption = [];

      if (sort == 0) {
        
        orderOption.push(['status', 'ASC']);
      } else {
        
        orderOption.push(['status', 'DESC']);
      }
      console.log(orderOption);
      
      let products = await db.product.findAndCountAll({
        where: {
          subCategoryId: id,
        },
        include: [
          {
            model: db.product_detail,
          },
          {
            model:db.brand
          }
        ],
        limit: 10,
        offset: (page - 1) * 10,
        order: orderOption,
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
          {
            model: db.product,
            include: [
              {
                model: db.post
              },
              {
                model: db.sub_category
              }]
          }
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
let getDataProductById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let productDetail = await db.product.findOne({
        where: {
          id: id,
        },
        attributes: ["id", "name", "price", "status", "promotion", "subCategoryId"],
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
      if (typeClassifies && typeClassifies.length > 0) {
        for (let i = 0; i < typeClassifies.length; i++) {


          const checkTypeClassifiesExist = await db.type_classify.findOne({
            where: {
              id: typeClassifies[i]
            }

          })
          const checkTypeClassifyDetailExist = await db.type_classify_detail.findOne({
            where: {
              typeClassifyId: typeClassifies[i]
            }

          })
          nameTypeClassify += checkTypeClassifyDetailExist.name + " ";
          if (checkTypeClassifiesExist) {

            const createProductDetailTypeClassify = await db.product_detail_type_classify.create({
              productDetailId: newProductDetail.id,
              typeClassifyId: Number(typeClassifies[i])
            })


          }


        }
      }
      if (typeClassifyDetail && typeClassifyDetail.length > 0) {
        for (let i = 0; i < typeClassifyDetail.length; i++) {

          const checkTypeClassifyDetailExist = await db.type_classify_detail.findOne({
            where: {
              id: typeClassifyDetail[i]
            }
          })
          if (checkTypeClassifyDetailExist) {
            const checkProductDetailExistClassify = await db.product_detail_type_classify.findOne({
              where: {
                [Op.and]: {
                  productDetailId: newProductDetail.id,
                  typeClassifyId: checkTypeClassifyDetailExist.typeClassifyId
                }
              }
            })
            if (checkProductDetailExistClassify) {
              const createProductDetailTypeClassify = await db.product_detail_type_classify_detail.create({
                productDetailId: newProductDetail.id,
                typeClassifyDetailId: typeClassifyDetail[i]
              })
            }

            if (createProduct) {
              resolve();
            }
            else {

            }
          }
        }



      }
      handleDataDetail(typeClassifies, typeClassifyDetail, data, newProductDetail.id)
      // }

      await saveImage(files, newProductDetail.id);
      resolve(newProduct);
    } catch (e) {
      reject(e);
    }
  });
};
const handleDataDetail = async (type, typeDetail, data, detail) => {
  try {
    let arr = [];
    for (let i = 0; i < typeDetail.length; i++) {
      const check = await db.type_classify_detail.findOne({
        where: {
          id: typeDetail[i]
        }
      })
      arr.push({ id: check.typeClassifyId, data: typeDetail[i] })
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
    for (let i = 0; i < dataSubProduct.length; i++) {


      const creatSubProduct = await db.sub_product.create({
        name: data.name,
        price: data.price,
        productDetailId: detail,
        sold: 0,
        stock: 0,
        image: data.image
      })
      for (let y = 0; y < dataSubProduct[i].length; y++) {
        const subProduct = await db.sub_product.findOne({
          where: {
            id: creatSubProduct.id
          }
        })
        const typeName = await db.type_classify_detail.findOne({
          where: {
            id: dataSubProduct[i][y]
          }
        })
        if (subProduct) {
          subProduct.name = subProduct.name + " " + typeName.name;
          await subProduct.save();
        }
        const creatSubProductDetail = await db.sub_product_type_classify_detail.create({
          subProductId: creatSubProduct.id,
          typeClassifyDetailId: dataSubProduct[i][y]
        })
      }
    }



  } catch (e) {
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
let restoreProductById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await db.product.findOne({
        where: {
          id: id,
        },

      });

      if (product) {
        let productDetail = await db.product_detail.findOne({
          where: {
            productId: id,
          }
        })
        if (productDetail) {
          // console.log(productDetail.id);

          let subProduct = await db.sub_product.findAll(
            {
              where: {
                productDetailId: productDetail.id
              }
            });

          if (subProduct && subProduct.length > 0) {
            for (let i = 0; i < subProduct.length; i++) {
              const sub_product_type_classify_detail = await db.sub_product_type_classify_detail.findAll({
                where: {
                  subProductId: subProduct[i].id
                }
              })
              if (sub_product_type_classify_detail && sub_product_type_classify_detail.length > 0) {
                for (let y = 0; y < sub_product_type_classify_detail.length; y++) {
                  sub_product_type_classify_detail[y].status = true;
                  await sub_product_type_classify_detail[y].save();
                }
                const cart = await db.Cart.findAll({
                  where: {
                    sub_productId: subProduct[i].id
                  }
                })
                if (cart && cart.length > 0) {
                  for (let k = 0; k < cart.length; k++) {
                    await cart[k].destroy();
                  }
                }
              }

              subProduct[i].status = true;
              await subProduct[i].save();

            }
            const productDetailTypeClassifyDetails = await db.product_detail_type_classify_detail.findAll({
              where: {
                productDetailId: productDetail.id
              } 
            })
            if (productDetailTypeClassifyDetails && productDetailTypeClassifyDetails.length > 0) {
              for (let x = 0; x < productDetailTypeClassifyDetails.length; x++) {
                productDetailTypeClassifyDetails[x].status = true;
                await productDetailTypeClassifyDetails[x].save();
              }
            }
            const productDetailTypeClassify = await db.product_detail_type_classify.findAll({
              where: {
                productDetailId: productDetail.id
              }
            })
            if (productDetailTypeClassify && productDetailTypeClassify.length > 0) {
              for (let z = 0; z < productDetailTypeClassify.length; z++) {
                productDetailTypeClassify[z].status = true;
                await productDetailTypeClassify[z].save();
              }
            }
            const productDetailImage = await db.product_detail_image.findAll({
              where: {
                productDetailId: productDetail.id
              }
            })
            if (productDetailImage && productDetailImage.length > 0) {
              for (let o = 0; o < productDetailImage.length; o++) {
                productDetailImage[o].status = true;
                await productDetailImage[o].save();
              }
            }
            productDetail.status = true;
            product.status = true;
          

            await productDetail.save();
            await product.save();
          }
        }
        resolve({
          EC: 0
        })

      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteProductById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await db.product.findOne({
        where: {
          id: id,
        },

      });

      if (product) {
        let productDetail = await db.product_detail.findOne({
          where: {
            productId: id,
          }
        })
        if (productDetail) {
          // console.log(productDetail.id);

          let subProduct = await db.sub_product.findAll(
            {
              where: {
                productDetailId: productDetail.id
              }
            });

          if (subProduct && subProduct.length > 0) {
            for (let i = 0; i < subProduct.length; i++) {
              const sub_product_type_classify_detail = await db.sub_product_type_classify_detail.findAll({
                where: {
                  subProductId: subProduct[i].id
                }
              })
              if (sub_product_type_classify_detail && sub_product_type_classify_detail.length > 0) {
                for (let y = 0; y < sub_product_type_classify_detail.length; y++) {
                  sub_product_type_classify_detail[y].status = false;
                  await sub_product_type_classify_detail[y].save();
                }
                const cart = await db.Cart.findAll({
                  where: {
                    sub_productId: subProduct[i].id
                  }
                })
                if (cart && cart.length > 0) {
                  for (let k = 0; k < cart.length; k++) {
                    await cart[k].destroy();
                  }
                }
              }

              subProduct[i].status = false;
              await subProduct[i].save();

            }
            const productDetailTypeClassifyDetails = await db.product_detail_type_classify_detail.findAll({
              where: {
                productDetailId: productDetail.id
              }
            })
            if (productDetailTypeClassifyDetails && productDetailTypeClassifyDetails.length > 0) {
              for (let x = 0; x < productDetailTypeClassifyDetails.length; x++) {
                productDetailTypeClassifyDetails[x].status = false;
                await productDetailTypeClassifyDetails[x].save();
              }
            }
            const productDetailTypeClassify = await db.product_detail_type_classify.findAll({
              where: {
                productDetailId: productDetail.id
              }
            })
            if (productDetailTypeClassify && productDetailTypeClassify.length > 0) {
              for (let z = 0; z < productDetailTypeClassify.length; z++) {
                productDetailTypeClassify[z].status = false;
                await productDetailTypeClassify[z].save();
              }
            }
            const productDetailImage = await db.product_detail_image.findAll({
              where: {
                productDetailId: productDetail.id
              }
            })
            if (productDetailImage && productDetailImage.length > 0) {
              for (let o = 0; o < productDetailImage.length; o++) {
                productDetailImage[o].status = false;
                await productDetailImage[o].save();
              }
            }
            productDetail.status = false;
            product.status = false;
          

            await productDetail.save();
            await product.save();
          }
        }
        resolve({
          EC: 0
        })

      }
    } catch (e) {
      reject(e);
    }
  });
};
let setPriceSubProd = async (list, type, number) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (type === "price") {
        for (let i = 0; i < list.length; i++) {
          let subProd = await db.sub_product.findOne({
            where: { id: list[i] }
          })
          subProd.price = number;
          await subProd.save();
        }
      } else if (type === "stock") {
        for (let i = 0; i < list.length; i++) {
          let subProd = await db.sub_product.findOne({
            where: { id: list[i] }
          })
          subProd.stock = number;
          await subProd.save();
        }
      }
      resolve("success")
    } catch (e) {

    }
  })
};
let getSubProd = async (page, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let subProd = await db.sub_product.findAndCountAll(
        {
          where: {
            productDetailId: id,
          },
          limit: 10,
          offset: (page - 1) * 10,
          order: [["createdAt", "DESC"]]
        }
      );
      if (subProd) {
        resolve(subProd);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};
function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}
let setProduct = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(isNumeric(data.price)){
         const rs = await db.product.findOne({
          where:{
            id:data.id
          }
         })
         if(rs){
          rs.name = data.name;
          rs.price = data.price;
          await rs.save();
          resolve("Ok")
         }else{
          resolve()
         }
      }
     else{
      console.error(data.price);

     }


    } catch (e) {
      console.error("Lỗi trong setProduct:", e);
      reject(e); // Trả lỗi về Promise
    }
  });
};
let createSubProduct = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let subProducts = await db.sub_product.findAll({
        include: [
          {
            model: db.type_classify_detail,
          },
        ],
        where: {
          productDetailId: data.productId,
        },
      });
     const product = await db.sub_product.findAll({
      where:{
        productDetailId:data.productId,
      },
      include:[{
          model:db.type_classify_detail
      }]
     })
     let arr = [];
     for(let i = 0; i < data.typeClassifyDetails.length; i++){
      
      
      let dataRs = await db.type_classify_detail.findOne({
        where:{
          id:data.typeClassifyDetails[i].data[0]
        },
        include:{
          model:db.type_classify
        }
      
      })
      
      if(dataRs && (dataRs?.type_classify.id == data.typeClassifyDetails[i].id)){
        
        arr.push(data.typeClassifyDetails[i].data[0])
      }else{
        resolve();
      }
      
     }
     const result = hasNoMatchingSubProduct(subProducts,arr);
     
     if(result){
      const newSubProd = await db.sub_product.create({
        name:data.name,
        price:0,
        productDetailId:data.productId,
        sold:0,
        stock:0,
        status:1,
        image: subProducts[0].image ? subProducts[0].image : null
      })
      arr.map(async(item,index)=>{
        const rs = await db.product_detail_type_classify_detail.findOne({
          where: {
            productDetailId: data.productId,
            typeClassifyDetailId: item
          }
        });
        console.log(rs);
        
        if(!rs){
          db.product_detail_type_classify_detail.create({
            productDetailId: data.productId,
            typeClassifyDetailId:item
          })
        }
        db.sub_product_type_classify_detail.create({
          subProductId:newSubProd.id,
          typeClassifyDetailId:item
        })
      })

      resolve("newSubProd")
     }
     resolve();


     
    } catch (e) {
      console.log(e);
      
    }
  });
};
function hasNoMatchingSubProduct(data, typeClassifyDetails) {
  if (!data || data.length === 0) return false;

  return !data.some(subProduct => {
    const detailIds = (subProduct.type_classify_details || []).map(detail => detail.id);
    return (
      detailIds.length === typeClassifyDetails.length &&
      typeClassifyDetails.every(id => detailIds.includes(id))
    );
  });
}
let setBrandorPost = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(data.type == "brand"){
         const rs = await db.brand.findOne({
          where:{
            brandCode:data.code
          }
         }) 
         if(rs){
          for(let i = 0; i < data.listProd.length; i++){
            console.log(prod);
            
            let prod = await db.product.findOne({
              where:{
                id:data.listProd[i]
              }
            })
            prod.brandId = rs.id;
            await prod.save();
          }
          await rs.save();
          resolve("Ok")
         }else{
          resolve()
         }
      }
     else{
      const rs = await db.post.findOne({
        where:{
          id:data.code
        }
       })
       if(rs){
        for(let i = 0; i < data.listProd.length; i++){
          let prod = await db.product.findOne({
            where:{
              id:data.listProd[i]
            }
          })
          prod.postId = rs.id;
          await prod.save();
        }
        await rs.save();
        resolve("Ok")
       }else{
        resolve()
       }

     }


    } catch (e) {
      resolve();
    }
  });
};

module.exports = {
  setBrandorPost,
  getSubProd,
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
  deleteProductById,
  handleCheckOutStock,
  setPriceSubProd,
  setProduct,
  restoreProductById,
  createSubProduct
};
