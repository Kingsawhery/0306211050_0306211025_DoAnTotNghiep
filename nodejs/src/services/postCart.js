import { Message } from "node-mailjet";
import db from "../models/index";
import { Op } from "sequelize";
import sub_product from "../models/sub_product";
const addProductInCart = async (user, sub_productId) => {
  try {
    let cart = await db.Cart.findOne({ where: { userId: user } });
    console.log(cart);

    if (!cart) {
      //đã tồn tại cho người dùng
      cart = await db.Cart.create({ userId: user });
    } // Kiểm tra xem sản phẩm đã có trong giỏ hàng hay chưa
    let product = await db.sub_product.findOne({
      where: { sub_productId: sub_productId, cartId: cart.id },
    });

    if (product) {
      // Nếu sản phẩm đã có, tăng số lượng
      sub_product.quantity += quantity;
      console.log(sub_product.quantity);

      await sub_product.save();
    } else {
      // Nếu không, thêm sản phẩm mới vào giỏ hàng
      await cart.addProduct({
        sub_productId: sub_productId,
        quantity: quantity,
      });
    }

    res.status(201).json({ message: "Thêm sản phẩm vào giỏ hàng thành công." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Lỗi khi thêm sản phẩm vào giỏ hàng.",
      error: error.message,
    });
  }
};
module.exports = { addProductInCart };
