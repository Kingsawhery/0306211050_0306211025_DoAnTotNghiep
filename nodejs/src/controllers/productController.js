import {
  getSubProductByProduct,
  getProductsRandom,
  getProductBySubCategory,
  getProductDetailById,
  getProductByIdService,
  getDataProductById,
  getSubProductByTypeClassify,
  getProductDetailImage,
  getProductByCategory,
  createProduct,
  getProductDetailImages,
  deleteProductById,
  handleCheckOutStock,
  getSubProd,
  setPriceSubProd,
  setProduct,
  restoreProductById,
  createSubProduct,
  setBrandorPost
} from "../services/productService";
const putBrandOrPost = async (req, res) => {
  try{
    let data = await req.body;
    if(!data.code || data.listProd?.length <= 0 || !data.type){
      return res.status(200).json({
        err:"fail"
      })
    }
    else{
      const rs = await setBrandorPost(data);
      if(rs){
        return res.status(200).json({
          err:"success",
          data:rs
        });
      }
      else{
        return res.status(200).json({
          err:"fail",
          message:"Không thể tạo mới do dữ liệu sai hoặc thiếu thông tin bắt buộc!"
        });
      }
    }
  }catch(e){

  }
}
const handleCreateSubProduct = async (req, res) => {
  try{
    let data = await req.body;
    if(!data.name || data.typeClassifyDetails?.length <=0 || !data.productId){
      return res.status(200).json({
        err:"fail"
      })
    }
    else{
      const rs = await createSubProduct(data);
      if(rs){
        return res.status(200).json({
          err:"success",
          data:rs
        });
      }
      else{
        return res.status(200).json({
          err:"fail",
          message:"Không thể tạo mới do dữ liệu sai hoặc thiếu thông tin bắt buộc!"
        });
      }
    }
  }catch(e){

  }
}
const handleSetProduct = async (req, res) => {
  try{
    let data = await req.body;
    if(!data.name || !data.price || !data.id){
      return res.status(200).json({
        err:"fail"
      })
    }
    else{
      const rs = await setProduct(data);
      if(rs){
        return res.status(200).json({
          err:"success"
        });
      }
      else{
        return res.status(200).json({
          err:"fail"
        });
      }
    }
  }catch(e){

  }
}
const checkOutStock = async (req, res) => {
  try {
    let data = await req.body;
    console.log(data.data.length > 0);
    if (data.data.length > 0) {
      const rs = await handleCheckOutStock(data);


      console.log(rs);

      if (rs) {
        return res.status(200).json({
          data: rs
        });
      }
    }

  } catch (e) {

  }
}

const handleSetPriceSubProd = async (req, res) => {
  try {
    let list = req.body.list
    let type = req.body.type
    let number = req.body.number

    let respon = await setPriceSubProd(list,type,number);
    if (respon) {
      return res.status(200).json({
        message: "success"
      });

    } else {
      return res.status(200).json({
        message: "fail"
      });
    }

  } catch (e) {
    console.log(e);
    return res.status(400).json({
      message: "Đã có lỗi xảy ra!",
    });
  }
};
const handleGetSubProd = async (req, res) => {
  try {
    let page = await req.query.page;
    let id = await req.query.id;
    let { count, rows } = await getSubProd(page, id);
    return res.status(200).json({
      data: {
        total: count,
        totalPages: Math.ceil(count / 10),
        currentPage: page,
        data: rows,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      message: "Đã có lỗi xảy ra!",
    });
  }
};

const getProduct = async (req, res) => {
  try {
    let page = await req.query.page;
    let sort = await req.query.sort;

    let id = await req.query.id;
    console.log(sort);
    
    let { count, rows } = await getProductBySubCategory(page, id,sort);
    return res.status(200).json({
      data: {
        total: count,
        totalPages: Math.ceil(count / 10),
        currentPage: page,
        data: rows,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      message: "Đã có lỗi xảy ra!",
    });
  }
};
const getTypeClassifySubProduct = async (req, res) => {
  try {
    let id = await req.query.id;
    let product_detail = await getSubProductByProduct(id);
    return res.status(200).json({
      data: product_detail,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      message: "Đã có lỗi xảy ra!",
    });
  }
};
const getProductDetail = async (req, res) => {
  try {
    let id = await req.query.id;
    let product_detail = await getProductDetailById(id);
    return res.status(200).json({
      data: product_detail,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      message: "Đã có lỗi xảy ra!",
    });
  }
};
const getSubProduct = async (req, res) => {
  try {
    let listTypeClassifyDetail = await req.query;
    let subProduct = await getSubProductByTypeClassify(listTypeClassifyDetail);
    if (subProduct) {
      return res.status(200).json({
        data: subProduct,
      });
    } else {
      return res.status(200).json({
        message: "No results was found",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      message: "Đã có lỗi xảy ra!",
    });
  }
};
const getProductsImage = async (req, res) => {
  try {
    let id = await req.query.id;
    let productDetailImage = await getProductDetailImage(id);
    if (productDetailImage) {
      return res.status(200).json({
        data: productDetailImage,
      });
    } else {
      return res.status(200).json({
        message: "No results was found",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      message: "Đã có lỗi xảy ra!",
    });
  }
};
let getListProductRandom = async (req, res) => {
  const id = await req.query.id;
  let results = await getProductsRandom(id ? id : 1);
  if (results) {
    return res.status(200).json({
      message: "Show suggestion products list successfully!",
      data: results,
    });
  } else {
    return res.status(200).json({
      message: "Not found suggestion products list!",
    });
  }
};
let getProductById = async (req, res) => {
  let id = req.params.id;
  let data = await getDataProductById(id);
  if (data) {
    return res.status(200).json({
      data: data,
    });
  }
  else {
    return res.status(200).json({
      data: null,
    });
  }
};

let getProducts = async (req, res) => {
  let page = req.query.page;
  let id = req.query.id;
  let { count, rows } = await getProductByCategory(page, id);
  return res.status(200).json({
    data: {
      total: count,
      totalPages: Math.ceil(count / 10),
      currentPage: page,
      data: rows,
    },
  });
};

let restoreProduct = async (req, res) => {
  let id = req.query.id;
  if (id) {
    let productDelete = await restoreProductById(id);
    if (productDelete.EC === 0) {
      return res.status(200).json({
        EC: 0,
        EM: "Đã khôi phục thành công!"
      });
    } else {
      return res.status(200).json({
        EC: 1,
        EM: "Không tìm thấy sản phẩm!"
      });
    }

    ;
  } else {
    return res.status(200).json({
      EM: "Không có tham số cần thiết!"
    });
  }
};
let deleteProduct = async (req, res) => {
  let id = req.query.id;
  if (id) {
    let productDelete = await deleteProductById(id);
    console.log(productDelete);

    if (productDelete.EC === 0) {
      return res.status(200).json({
        EC: 0,
        EM: "Đã xóa thành công!"
      });
    } else {
      return res.status(200).json({
        EC: 1,
        EM: "Không tìm thấy sản phẩm!"
      });
    }

    ;
  } else {
    return res.status(200).json({
      EM: "Không có tham số cần thiết!"
    });
  }
};
const getSubProductImage = async (req, res) => {
  try {
    console.log(req.query);
    let productDetailId = await req.query.productDetailId;
    let typeClassifyDetailId = await req.query.typeClassifyDetailId;
    let productDetailImage = await getProductDetailImages(
      productDetailId,
      typeClassifyDetailId
    );
    if (productDetailImage) {
      return res.status(200).json({
        data: productDetailImage,
      });
    } else {
      return res.status(200).json({
        message: "No results was found",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      message: "Đã có lỗi xảy ra!",
    });
  }
};
const createNewProduct = async (req, res) => {
  try {
    const data = await req.body;
    if (!req.body.name || !req.body.category || !req.body.subCategory) {
      return res.status(400).json({
        message: "Missing requirment field!",
      });
    } else if (
      req.body.category == 0 ||
      req.body.category == "" ||
      req.body.subCategory == 0 ||
      req.body.subCategory == ""
    ) {
      return res.status(400).json({
        message: "Value is not valid!",
      });
    } else {
      await createProduct(data, req.files);
      return res.status(200).json({
        message: "Create new product successful!",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      message: "Đã có lỗi xảy ra!",
    });
  }
};
module.exports = {
  getProduct,
  getProductDetail,
  getSubProduct,
  getProductsImage,
  getProducts,
  getListProductRandom,
  getProductById,
  getTypeClassifySubProduct,
  getSubProductImage,
  createNewProduct,
  deleteProduct,
  checkOutStock,
  handleGetSubProd,
  handleSetPriceSubProd,
  handleSetProduct,
  restoreProduct,
  handleCreateSubProduct,
  putBrandOrPost
};
