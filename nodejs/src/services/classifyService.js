import { where } from "sequelize";
import db from "../models";
let getTypeClassify = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        let type_classifies = await db.type_classify.findAll({
        });
        if (type_classifies) {
          resolve(type_classifies);
        } else {
          resolve();
        }
      } catch (e) {
        reject(e);
      }
    });
  };
  let getTypeClassifyDetailByProduct = async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let type_classifies = await db.product.findOne({
            where:{
                id: id,
                
            },include:{
              model:db.product_detail,
              include:{model:db.type_classify,
                include:{model:db.type_classify_detail}
              }
            }
        });
        console.log(type_classifies.product_detail.type_classifies);
        
        if (type_classifies) {
          resolve(type_classifies.product_detail.type_classifies);
        } else {
          resolve();
        }
      } catch (e) {
        reject(e);
      }
    });
  };
  let getTypeClassifyDetail = async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let type_classifies = await db.type_classify_detail.findAll({
            where:{
                typeClassifyId: id
            }
        });
        if (type_classifies) {
          resolve(type_classifies);
        } else {
          resolve();
        }
      } catch (e) {
        reject(e);
      }
    });
  };
  module.exports = {
    getTypeClassify,
    getTypeClassifyDetail,
    getTypeClassifyDetailByProduct
}