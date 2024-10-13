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
    getTypeClassifyDetail
}