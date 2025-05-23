import db from "../models";
import { postCart, getCart, deleteCart, changeStatusCart} from "../services/cartService";
const handleGetCart = async (req, res) => {
  const id = req.query.userId;
  const data = await getCart(req.query.userId);
  if (data) {
    res.status(200).json(data);
  }
};
const handleChangeStatus = async (req,res)=>{
  try{
    
  const idSubProduct = req.body.currentSubProduct;
  const idUser = req.body.userId;
  if(idSubProduct && idUser){
    const changeStatus = changeStatusCart(idSubProduct,idUser);
    if(changeStatus){
      res.status(200).json(changeStatus);
    }else{
      res.status(200).json({
        EM:"Not found!"
      });

    }
  }
}catch(e){
  console.log(e);
  
}
}
const handleDestroyCart = async (req, res) => {
  
  const idSubProduct = req.query.currentSubProduct;
  const idUser = req.query.userId;
  if (!idSubProduct && !idUser) {
    res.status(200).json({
      EC: 1,
      EM: "Missing data!",
    });
  } else {
    const rs = await deleteCart(idSubProduct, idUser);
    if (rs) {
      res.status(200).json({
        EC: 0,
        EM: "Delete Cart successfully!",
      });
    }
  }
};
const handleAddCart = async (req, res) => {
  const idSubProduct = req.body.currentSubProduct;
  const idUser = req.body.userId;
  const quantity = req.body.quantity;
  if (!idSubProduct && !idUser && !quantity) {
    res.status(200).json({
      EC: 1,
      EM: "Missing data!",
    });
  } else {
    const rs = await postCart(idSubProduct, idUser, quantity);
    if (rs) {
      res.status(200).json({
        total:rs.total,
        EC: 0,
        EM: "Add product to cart successfully!",
      });
    }
  }
};

module.exports = {
  handleGetCart,
  handleAddCart,
  handleDestroyCart,
  handleChangeStatus
};
