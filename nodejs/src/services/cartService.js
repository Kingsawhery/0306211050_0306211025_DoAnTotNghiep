import db from "../models/index";
import { Op } from "sequelize";
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
      if (!check) {
        await db.Cart.create({
          userId: idUser,
          sub_productId: idSubProduct,
          quantity: 1,
        });
      } else {
        check.quantity += 1;
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
};
