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
      resolve(listProductCart);
    } catch (e) {}
  });
};
let postCart = async (idSubProduct, idUser) => {
  return new Promise(async (resolve, reject) => {
    // try {
    //   const check = await db.Cart.findOne({
    //     where: {
    //       userId: idUser,
    //       sub_productId: idSubProduct,
    //     },
    //   });
    //   if (!check) {
    //     await db.Cart.create({
    //       userId: user.id,
    //       sub_productId: id,
    //       quantity: 1,
    //     });
    //   } else {
    //     check.quantity += 1;
    //     await check.save();
    //   }

    //   resolve({
    //     EC: 0,
    //     EM: "Đã thêm sản phẩm vào giỏ hàng",
    //   });
    // } catch (error) {
    //   reject({
    //     EC: 500,
    //     EM: "Đã xảy ra lỗi khi thêm vào giỏ hàng",
    //   });
    // }
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
      });
      if (!check) {
        await db.Cart.create({
          userId: idUser,
          sub_productId: idSubProduct,
          price: subProduct.price,
          quantity: 1,
        });
      } else {
        check.quantity += 1;
        check.price = subProduct.price * check.quantity;
        console.log(subProduct.price, " ", check.quantity);
        await check.save();
      }
      resolve({
        EC: 0,
        EM: "Đã thêm sản phẩm vào giỏ hàng",
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  postCart,
  getCart,
};
