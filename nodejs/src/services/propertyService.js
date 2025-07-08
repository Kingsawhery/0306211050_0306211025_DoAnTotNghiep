const { Op } = require("sequelize");
const db = require("../models");
const { log } = require("console");

let putProperty = async (data) => {
  return new Promise(async (resolve, reject) => {
      try {        
          let checkExist = await db.type_classify.findOne({where:{id: data.id}})
          if(checkExist){
            
            checkExist.name = data.name;
            await checkExist.save();
            resolve({
              code:1,
              ms:"Success!"
              });
          }else{
            resolve({
              code:0,
              ms:"Property not ready exist!"
              });
          }
          
      } catch (e) {
          reject(e);
      }
  });
};
let postPropertyDetail = async (data) => {
  return new Promise(async (resolve, reject) => {
      try {
        console.log(data);
        
          let checkExist = await db.type_classify.findOne({where:{id:data.typeClassifyId}})
          if(!checkExist){
            resolve({
              code:1,
              ms:"Property do not exist!"
              });
          }else{
            const newProperty = await db.type_classify_detail.create({
              typeClassifyId:data.typeClassifyId,
              name:data.name,
              color_code: null
            })
            resolve({
              code:1,
              ms:"Success!"
              });
          }
          
      } catch (e) {
          reject(e);
      }
  });
};
let putPropertyDetail = async (data) => {
  return new Promise(async (resolve, reject) => {
      try {
        console.log(data);
        
          let checkExist = await db.type_classify_detail.findOne({where:{id:data.id}})
          if(!checkExist){
            resolve({
              code:1,
              ms:"Property do not exist!"
              });
          }else{
            checkExist.name = data.name;
            checkExist.color_code = data.data;
            await checkExist.save();
            resolve({
              code:1,
              ms:"Success!"
              });
          }
          
      } catch (e) {
          reject(e);
      }
  });
};
let postProperty = async (name) => {
  return new Promise(async (resolve, reject) => {
      try {
          let checkExist = await db.type_classify.findOne({where:{name}})
          if(!checkExist){
            const newProperty = await db.type_classify.create({
              name
            })
            resolve({
              code:1,
              ms:"Success!"
              });
          }else{
            resolve({
              code:0,
              ms:"Property ready exist!"
              });
          }
          
      } catch (e) {
          reject(e);
      }
  });
};
let getProperties = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let whereCondition = {};
            if (data.keyword && data.keyword.trim() && data.keyword.trim() !== "null") {
                whereCondition.name = {
                    [Op.like]: `%${data.keyword.trim()}%`
                };
            }
      
            let properties = await db.type_classify.findAndCountAll({
                where: whereCondition,
                limit: 10,
        offset: (data.page - 1) * 10,
            });
            resolve(properties);
        } catch (e) {
            reject(e);
        }
    });
};
let getDetailProperties = async (data) => {
  try {
    // const checkExist = await db.type_classify.findOne({
    //     where:{
    //         id:data.id
    //     }
    // })
    // if(!checkExist){
    //     return null;
    // }
    console.log(data);
    
    let whereCondition = {};
    if (data.typeClassifyId && data.typeClassifyId !== "null") {
      whereCondition.typeClassifyId = data.typeClassifyId;
    }
    if (data.keyword && data.keyword.trim() && data.keyword.trim() !== "null") {
      whereCondition.name = {
        [Op.like]: `%${data.keyword.trim()}%`,
      };
    }
    const limit = data.page ? 10 : null;
    const offset = data.page ? (data.page - 1) * 10 : null;
    const properties = await db.type_classify_detail.findAndCountAll({
      where: whereCondition,
      ...(limit && { limit }),
      ...(offset && { offset }),
    });
    return properties;
  } catch (e) {
    throw e;
  }
};
module.exports = {
    getProperties,postProperty,
    getDetailProperties, putProperty,postPropertyDetail, putPropertyDetail
}