import db from "../models/index";
import {
  readCategoriesHomepage,
  readCategories,
  postCategory,
  putCategory,
  destroyCategory,
  findCategories,
  getAllNameCategory,
  getProductByCategory,
  getAllNameCategoryAdmin,
  putDisplay
} from "../services/categoryService";
// Xem tất cả danh mục
let handlePutDisplay = async (req, res) => {
  const data = await req.body.id;
  let errCode = await putDisplay(data);
  if(errCode.errCode == 1){
    return res.status(200).json({
      errCode:errCode.errCode,
      message:"change success!"});
  }else{
    return res.status(200).json({
      errCode:errCode.errCode,
      message:"change fail!"    });
  }
};
let getAllCategories = async (req, res) => {
  let categories = await readCategoriesHomepage();
  return res.status(200).json({
    data: categories,
  });
};
let handleGetProductByCategory = async (req, res) => {
  const data = await req.query.slug;
  let categories = await getProductByCategory(data);
  return res.status(200).json({
    data: categories,
  });
}
let getProductByCategoryId = async(req,res) =>{
  let id = await req.query.id;
  console.log(id);
  let data = await getAllProductByCategory(id);
  return res.status(200).json({
    data,
  });
}
let getAllCategoriesInList = async (req, res) => {
  let categories = await getListCategories();
  return res.status(200).json({
    data: categories,
  });
};
let getListNameCategory = async (req, res)=>{
  let categories = await getAllNameCategory();
  return res.status(200).json({
    data:categories
  })
}
let getListNameCategoryAdmin = async (req, res)=>{
  let categories = await getAllNameCategoryAdmin();
  return res.status(200).json({
    data:categories
  })
}

let getCategories = async (req, res) => {
  let page = req.query.page;
  let keyword = req.query.keyword;
  let display = req.query.display;

  let { count, rows } = await readCategories(page,keyword, display);
  return res.status(200).json({
    data: {
      total: count,
      totalPages: Math.ceil(count / 10),
      currentPage: page,
      data: rows,
    },
  });
};
//Tìm kiếm danh mục
let searchCategories = async (req, res) => {
  try {
    const data = await req.body.name;
    if (data != "") {
      let categories = await findCategories(data);
      return res.status(200).json({
        data: categories,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
// Thêm mới danh mục
let postNewCategory = async (req, res) => {
  try {
    const data = await req.body;
    if (req.body.name == undefined ) {
      return res.status(400).json({
        message: "Add new category failed",
        status: 400,
      });
    } else {
      await postCategory(data);
      return res.status(201).json({
        message: "Add new category success",
        status: 200,
      });
    }
  } catch (e) {
    return res.status(400).json({
      message: "An error occurred, please try again",
      status: 400,
    });
  }
};

//Sửa danh mục
let editCategory = async (req, res) => {
  try {
    let data = await req.body;
    if(data.name){
      let message = await putCategory(data);
    if (message) {
      return res.status(200).json({
        message: message,
      });
    } else {
      return res.status(400).json({
        message: "Edit category failed",
      });
    }
    
    }
    else{
      return res.status(200).json({
        message: "Missing required data",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};

//Xóa danh mục
let deleteCategory = async (req, res) => {
  try {
    let id = await req.body.id;
    let message = await destroyCategory(id);
    return res.status(200).json({
      message: message,
      status: 204,
    });
  } catch (e) {
    console.log(e);
  }
};

// let getProducts  = async(req,res)=>{
//     let products = await db.product.findAll({
//         attributes:['name'],
//         // where:{
//         //     id:3
//         // },
//         include:[{
//             model:db.product_detail,

//             attributes:['id'],
//             include:[{
//                 attributes:['name'],

//                 model:db.type_classify,
//                 include:[{
//                     model:db.type_classify_detail,
//                     attributes:['name'],
//                     include:[{
//                         model: db.product_detail,
//                         attributes:['productId'],
//                         where:{
//                            productId:3
//                         }
//                     }],

//                 }]
//             }]

//         }],
//     })
//     return res.status(200).json({
//         data:products
//     });

module.exports = {
  getAllCategories,
  getCategories,
  postNewCategory,
  editCategory,
  deleteCategory,
  searchCategories,
  getAllCategoriesInList,
  getListNameCategory,
  getProductByCategoryId,
  handleGetProductByCategory,
  getListNameCategoryAdmin,
  handlePutDisplay
};
