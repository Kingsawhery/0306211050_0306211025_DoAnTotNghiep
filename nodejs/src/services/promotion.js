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
          include:{
            model:db.product
          },
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
  let createPromotionProduct = async (code, list) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(code, " ", list);
        
        let promotion = await db.promotion.findOne({
            where:{
                code:code
            },
        });
        if (!promotion) {
          resolve({
            err:1,
            message:"Mã khuyến mãi không tồn tại!"
          });
        } else {
            for(let i = 0; i < list.length; i++){
              let prodproduct = await db.promotionProduct.findOne({
                where:{
                  productId: list[i],
                  promotionId: promotion.id,

                }
              })
              if(!prodproduct){
                let createNew = await db.promotionProduct.create({
                  productId: list[i],
                  promotionId: promotion.id,
                })
              }
            }
            resolve({
              err:0,
              message:"Thêm mới khuyến mãi thành công!"
            });
        }
      } catch (e) {
        reject(e);
      }
    });
  };
  let editNewPromotion = async (data) => {
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
          let promotionId = await db.promotion.findOne({
            where:{
                id:data.id
            }
        });
        if(promotionId){
          promotionId.code = data.code;
          promotionId.description = data.description;
          promotionId.percent = data.number;
          await promotionId.save();
          resolve({
            err:0,
            message:"Success!"
          });
        }else{
          resolve({
            err:1,
            message:"Không tồn tại khuyến mãi!"
          });
        }
        }
      } catch (e) {
        reject(e);
      }
    });
  };
  

  module.exports = {
    getPromotionByCode,
    getPromotions,
    createNewPromotion,
    createPromotionProduct,
    editNewPromotion
  }