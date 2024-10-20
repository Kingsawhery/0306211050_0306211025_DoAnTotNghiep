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
  module.exports = {
    getPromotionByCode,
  }