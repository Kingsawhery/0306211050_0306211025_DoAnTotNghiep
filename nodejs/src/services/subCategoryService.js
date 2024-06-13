import db from "../models/index";
import { Op } from "sequelize";
let getSubCategories = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let subCategory = await db.sub_category.findAll();
      if (subCategory) {
        resolve(subCategory);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getSubCategoryByCateogry = async (page,id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let sub_category = await db.sub_category.findAndCountAll(
        {
          where:{
            categoryId:id,
          },
          limit:10,
          offset:(page - 1) * 10,
        }
      );
      if (sub_category) {
        resolve(sub_category);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};
let findSubCategories = async(data)=>{
  return new Promise(async (resolve, reject) => {
    console.log(data);
    try {
      let sub_categories = await db.sub_category.findAll({
        where:{
          name:{
            [Op.like]: `${data}%`
          }
        }
      });
      if (sub_categories) {
        resolve(sub_categories);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
} 
let postSubCategory = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.sub_category.create({
        name: data.name,
        categoryId:data.categoryId
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
const putSubCategory = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let sub_category = await db.sub_category.findOne({
        where: { id: data.id },
      });
      if (sub_category) {
        (sub_category.name = data.name),
          (sub_category.categoryId = data.categoryId),
          await sub_category.save();
        resolve("Edit sub category successfully");
      }
    } catch (e) {
      reject(e);
    }
  });
};
const destroySubCategory = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let sub_category = await db.sub_category.findOne({
        where: { id: id },
      });
      if (sub_category) {
        await sub_category.destroy();
        resolve("Delete sub category successfully")
      }else{
        resolve("Sub category not found")
      }
    } catch (e) {
      reject();
    }
  });
};
let getSubCategoryByCateogryId = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let sub_category = await db.sub_category.findAll(
        {
          where:{
            categoryId:id,
          },
        }
      );
      if (sub_category) {
        resolve(sub_category);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getSubCategories,
  getSubCategoryByCateogry,
  postSubCategory,
  putSubCategory,
  destroySubCategory,
  findSubCategories,
  getSubCategoryByCateogryId
};
