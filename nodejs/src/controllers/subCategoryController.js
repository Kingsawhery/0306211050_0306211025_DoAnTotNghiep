import db from "../models/index"
import {getSubCategories,
    getSubCategoryByCateogry,
    postSubCategory,
    putSubCategory,
    destroySubCategory,
    findSubCategories,
    getSubCategoryByCateogryId} from "../services/subCategoryService"
// Xem tất cả danh mục
let getAllSubCategories = async (req,res)=>{
    let sub_categories = await getSubCategories();
    return res.status(200).json({
        data:sub_categories
    });
}
let getSubCategory = async (req,res)=>{
    let page = await req.query.page;
    const id = await req.query.id;
    console.log(id);
    let { count, rows } = await getSubCategoryByCateogry(page,id);
    return res.status(200).json({
      data: {
        total: count,
        totalPages: Math.ceil(count / 10),
        currentPage: page,
        data: rows,
      },
    });
}
//Tìm kiếm danh mục
let searchSubCategories = async(req,res) =>{
    try{
        const data = await req.body.name;
        if(data != ""){
            let sub_categories = await findSubCategories(data);
            return res.status(200).json({
                data:sub_categories
            })
        }
    }catch(e){
        console.log(e);
    }
}
// Thêm mới danh mục
let postNewSubCategory = async (req,res)=>{
    try{
        const data = await req.body;
        if(req.body.name == undefined || req.body.categoryId == undefined){
            return res.status(400).json({
                message:"Add new sub category failed",
                status:400
            }); 
        }
        else{
            await postSubCategory(data);
            return res.status(201).json({
                message:"Add new sub category success",
                status:200
            });
        }
    }catch(e){
        return res.status(400).json({
            message:"An error occurred, please try again",
            status:400
        }); 
    }
    
    
}

//Sửa danh mục
let editSubCategory = async (req,res)=>{
    try{
        let data = await req.body;
        let message = await putSubCategory(data);
        if(message){
            return res.status(200).json({
                message:message
            })
        }else{
            return res.status(400).json({
                message:"Edit sub category failed"
            })
        }
        
    }catch(e){
        console.log(e);
        return res.status(400).json({
            message:"Đã có lỗi xảy ra"
        })
    }
}

//Xóa danh mục
let deleteSubCategory = async(req,res) =>{
    try{
        let id = await req.params.id;
        let message = await destroySubCategory(id);
        return res.status(204).json({
            message:message,
            status: 204,    
      });
    }
   catch(e){
    console.log(e);
   }
}
let getSubCategoryNameById = async(req,res)=>{
    let id = await req.query.id;
    const subCategory = await getSubCategoryByCateogryId(id);
    return res.status(200).json({
        data:subCategory
      });
}
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
    // return res.status(200).json({
    //     data:products
    // });

module.exports = {
    getAllSubCategories,
    getSubCategory,
    postNewSubCategory,
    editSubCategory,
    deleteSubCategory,
    searchSubCategories,
    getSubCategoryNameById
}