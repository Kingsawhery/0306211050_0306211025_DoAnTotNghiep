import db from "../models/index";
import { Op, where } from "sequelize";
import product_detail from "../models/product_detail";
let readCategoriesHomepage = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let categories = await db.category.findAll({
        where:{
          status:1
        },
        include: [{
          
          model:db.product,
          limit:8,
          attributes:["id","name","price","status","subCategoryId","image","promotion"],
          include:[{
            model:db.sub_category
          }]
        },]
      });
      if (categories) {
        resolve(categories);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};


let readCategories = async (page) => {
  return new Promise(async (resolve, reject) => {
    try {
      let categories = await db.category.findAndCountAll(
        {
         
          limit:10,
          offset:(page - 1) * 10,
          attributes:["id","name","slug","display","status"],
          order: [["createdAt", "DESC"]]

        }
      );
      if (categories) {
        resolve(categories);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};
let findCategories = async(data)=>{
  return new Promise(async (resolve, reject) => {
    console.log(data);
    try {
      let categories = await db.category.findAll({
        where:{
          name:{
            [Op.like]: `${data}%`
          }
        }
      });
      if (categories) {
        resolve(categories);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
} 
let getProductByCategory = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let categories = await db.category.findOne({
        where:{
          slug:data
        },
        include:{
          model:db.sub_category,
          include:{
            model:db.product,
            include:{
              model:db.sub_category
            }
          }
        }
      });
      console.log(categories);
      
      if (categories) {
        resolve(categories);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};
function toSlug(str) {
  return str
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "") 
  .replace(/đ/g, "d")               
  .replace(/Đ/g, "d")                
  .toLowerCase()
  .trim()
  .replace(/\s+/g, "-")          
  .replace(/[^a-z0-9\-]/g, "");    
}
const putDisplay = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await db.category.count({
        where: { display: 1 }
      });
      let category = await db.category.findOne({
        where: { id: data },
      });
      if(count > 5 || count < 0){
        if(category.display){
          category.display = false;
          await category.save();
        }else{
          resolve({
            errCode:0
          })
        }
          
      }else{
        
        if(category.display){
          category.display = false;
          await category.save();
        }else{
          category.display = true
          await category.save();
        }
        resolve({
          errCode:1
        })
      }
    } catch (e) {
      reject(e);
    }
  });
};
let postCategory = async (data) => {
  return new Promise(async (resolve, reject) => {
    console.log(data);
    try {
      await db.category.create({
        name: data.name,
        slug: toSlug(data.name),
        display:0
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
const putCategory = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let category = await db.category.findOne({
        where: { id: data.id },
      });
      if (category) {
        (category.name = data.name),
          (category.slug = toSlug(data.name)),
          await category.save();
        resolve("Edit category successfully");
      }
    } catch (e) {
      reject(e);
    }
  });
};
const destroyCategory = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let category = await db.category.findOne({
        where: { id: id },
      });
      if (category) {
        await category.destroy();
        resolve("Delete category successfully")
      }else{
        resolve("Category not found")
      }
    } catch (e) {
      reject();
    }
  });
};
let getAllNameCategory = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let categories = await db.category.findAll({
        where:{
          display:1
        },
        attributes:["id","name","slug","display"],
      });
      if (categories) {
        resolve(categories);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllNameCategoryAdmin = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let categories = await db.category.findAll({
        attributes:["id","name","slug"],
      });
      if (categories) {
        resolve(categories);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
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
};

