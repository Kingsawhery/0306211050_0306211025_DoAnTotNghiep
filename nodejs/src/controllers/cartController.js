import db from "../models";
import { postCart, getCart } from "../services/cartService";
const handleGetCart = async (req, res) => {
  const id = req.query.userId;
  const data = await getCart(req.query.userId);
  if (data) {
    res.status(200).json(data);
  }
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
