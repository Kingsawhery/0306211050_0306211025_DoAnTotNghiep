import db from "../models";
const handleGetCart = async (req, res) => {
  const id = req.user.id;

  const carts = await db.User.findByPk(id, {
    include: [
      {
        model: db.Cart,
        as: "carts", // Tên alias cho mối quan hệ, nếu có
      },
    ],
  });
  console.log(carts.carts);
};

const handleAddCart = async (req, res) => {
  const id = req.body.subProductID;
  const user = req.user;

  try {
    const check = await db.Cart.findOne({
      where: {
        userId: user.id,
        sub_productId: id,
      },
    });
    if (!check) {
      await db.Cart.create({
        userId: user.id,
        sub_productId: id,
        quantity: 1,
      });
    } else {
      check.quantity += 1;
      await check.save();
    }

    return res.status(200).json({
      EC: 0,
      EM: "Đã thêm sản phẩm vào giỏ hàng",
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EC: 500,
      EM: "Đã xảy ra lỗi khi thêm vào giỏ hàng",
    });
  }
};

module.exports = {
  handleGetCart,
  handleAddCart,
};
