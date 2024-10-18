import db from "../models/index";
import { Op } from "sequelize";
import product_detail from "../models/product_detail";
let readCategoriesHomepage = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let categories = await db.category.findAll({
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
          attributes:["id","name","slug"]
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
let postCategory = async (data) => {
  return new Promise(async (resolve, reject) => {
    console.log(data);
    try {
      await db.category.create({
        name: data.name,
        slug: data.slug,
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
          (category.slug = data.slug),
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
        attributes:["id","name"],
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
  getAllNameCategory
};

