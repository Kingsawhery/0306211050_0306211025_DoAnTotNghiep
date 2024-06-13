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
  getProductDetailImages
} from "../services/productService";
const getProduct = async (req, res) => {
  try {
    let page = await req.query.page;
    let id = await req.query.id;
    let { count, rows } = await getProductBySubCategory(page, id);
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
  console.log("hehe");
  let results = await getProductsRandom();
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
const getSubProductImage = async(req, res)=>{
  try{
    console.log(req.query);
      let productDetailId = await req.query.productDetailId;
      let typeClassifyDetailId = await req.query.typeClassifyDetailId;
      let productDetailImage = await getProductDetailImages(productDetailId, typeClassifyDetailId);
      if(productDetailImage){
          return res.status(200).json({   
              data: productDetailImage,
            });
      }else{
          return res.status(200).json({   
              message:"No results was found"
            }); 
      }
  }catch(e){
      console.log(e);
      return res.status(400).json({
          message:"Đã có lỗi xảy ra!"
      })
  }
}
const createNewProduct = async(req,res)=>{
  try{
      const data = await req.body;
      if(!req.body.name || !req.body.category || !req.body.subCategory){

          return res.status(400).json({
              message:"Missing requirment field!"
                  })
      }else if(req.body.category == 0 || req.body.category == "" || req.body.subCategory == 0 || req.body.subCategory == "" ){
          return res.status(400).json({
              message:"Value is not valid!"
              })
      }
      else{
          await createProduct(data);
          return res.status(200).json({
              message:"Create new product successful!"
          })
      }
  }catch(e){
      console.log(e);
      return res.status(200).json({
          message:"Đã có lỗi xảy ra!"
              })
  
}}
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
  createNewProduct
};
