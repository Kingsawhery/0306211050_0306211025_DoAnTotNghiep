import { where } from "sequelize";
import db from "../models";
let getPromotionByCode = async (code) => {
    return new Promise(async (resolve, reject) => {
      try {
        let promotion = await db.promotion.findOne({
            where:{
                code:code
            },
            include:{
                model:db.product
            }

        });
        if (promotion) {
          resolve(promotion);
        } else {
          resolve();
        }
      } catch (e) {
        reject(e);
      }
    });
  };
  let createNewPromotion = async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let promotion = await db.promotion.findOne({
            where:{
                code:data.code
            },
        });
        if (promotion) {
          resolve({
            err:1,
            message:"Đã tồn tại code!"
          });
        } else {
          await db.promotion.create({
            code: data.code,
            description: data.description,
            percent: data.number
          })
          resolve({
            err:0,
            message:"Success!"
          });
        }
      } catch (e) {
        reject(e);
      }
    });
  };
  let getPromotions = async (page, keyword) => {
    return new Promise(async (resolve, reject) => {
      try {
        let whereCondition = {};
        console.log("hehe");

        // Nếu có keyword, thêm điều kiện lọc theo tên brand (ví dụ dùng LIKE)
        if (keyword && keyword.trim() !== "" && keyword !== "null") {
          
          whereCondition.code = {
            [db.Sequelize.Op.like]: `%${keyword}%`
          };
        }
  
        let promotions = await db.promotion.findAndCountAll({
          where: whereCondition,
          limit: 10,
          offset: (page - 1) * 10,
          order: [["createdAt", "DESC"]]
        });
  
        if (promotions) {
          resolve(promotions);
        } else {
          resolve();
        }
      } catch (e) {
        reject(e);
      }
    });
  };
  
  module.exports = {
    getPromotionByCode,
    getPromotions,
    createNewPromotion
  }