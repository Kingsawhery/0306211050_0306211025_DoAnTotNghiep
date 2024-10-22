import { raw } from "mysql2";
import db from "../models/index";
import { Op, where } from "sequelize";
import sub_product from "../models/sub_product";
let getCart = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const listProductCart = await db.Cart.findAll({
        where: [
          {
            userId: id,
          },
        ],
        include: [
          {
            model: db.sub_product,
            attributes:["id","name","price","image"],
            include: [
              {
                model: db.product_detail,
                include: [
                  {
                    model: db.product_detail_image,
                    limit: 1,
                  },
                  {
                    model: db.product,
                    include: [
                      {
                        model: db.sub_category,
                      },
                    ],
                  },
                ],
              },
              {
                model: db.type_classify_detail,
              },
            ],
          },
        ],
      });
      if(listProductCart){
        const totalQuantity = listProductCart.reduce((sum, item) => sum + item.quantity, 0);
        resolve(
          {
            total: totalQuantity,
            data:listProductCart
          })
      }else{
        resolve();

      }
    } catch (e) {
      console.log(e);
      
    }
  });
};
let deleteCart = async (idSubProduct, idUser) => {
  return new Promise(async (resolve, reject) => {
    const check = await db.Cart.findOne({
      where: {
        userId: idUser,
        sub_productId: idSubProduct,
      },
    });
    if (check && check.quantity > 0) {
      await check.destroy();
      resolve({
        EC: 0,
        EM: "Đã xóa sản phẩm thành công!",
      });
    } else {
      resolve({
        EC: 1,
        EM: "Giỏ hàng không tồn tại!",
      });
    }
  });
};
let postCart = async (idSubProduct, idUser, quantity) => {
  return new Promise(async (resolve, reject) => {
    try {
      const check = await db.Cart.findOne({
        where: {
          userId: idUser,
          sub_productId: idSubProduct,
        },
      });
      const subProduct = await db.sub_product.findOne({
        where: {
          id: idSubProduct,
        },
        raw,
      });

      if (!check) {
        await db.Cart.create({
          userId: idUser,
          sub_productId: idSubProduct,
          price: subProduct.price,
          quantity: 1,
        });
      }
      else {
        if (quantity > 0) {
          if (check.quantity > 0) {
            check.quantity += quantity;
            check.price = subProduct.price * check.quantity;
            await check.save();
          }
        } else {
          if (check.quantity < 2) {
            await check.destroy();
          } else {
            check.quantity += quantity;
            check.price = subProduct.price * check.quantity;
            await check.save();
          }
        }
      }
      const listProductCart = await db.Cart.findAll({
        where: [
          {
            userId: idUser,
          },
        ]})
      const totalQuantity = listProductCart.reduce((sum, item) => sum + item.quantity, 0);
      resolve({
        total:totalQuantity,
        EC: 0,
        EM: "Đã thêm sản phẩm vào giỏ hàng",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let changeStatusCart = async (idSubProduct, idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const check = await db.Cart.findOne({
        where: {
          [Op.and]:{
            sub_productId:idSubProduct,
            userId:idUser
          }
        },

      });
      if (check) {
        check.status = !check.status;
        await check.save();
        resolve({
          data:check
          
        });
      } else {
        resolve({
          data:check

        });
      }
    } catch (e) {
      console.log(e);
      
      reject(e);
    }
  });
};
module.exports = {
  postCart,
  getCart,
  deleteCart,
  changeStatusCart
};
