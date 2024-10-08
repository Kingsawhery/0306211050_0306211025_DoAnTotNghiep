import db from "../models";
import { postCart } from "../services/cartService";
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
  carts.carts.map((i) => console.log(i.dataValues.sub_productId));
};

const handleAddCart = async (req, res) => {
  const idSubProduct = req.body.currentSubProduct;
  const idUser = req.body.userId;
  if (!idSubProduct && !idUser) {
    res.status(200).json({
      EC: 1,
      EM: "Missing data!",
    });
  } else {
    const rs = await postCart(idSubProduct, idUser);
    if (rs) {
      res.status(200).json({
        EC: 0,
        EM: "Add product to cart successfully!",
      });
    }
  }
};

module.exports = {
  handleGetCart,
  handleAddCart,
};
