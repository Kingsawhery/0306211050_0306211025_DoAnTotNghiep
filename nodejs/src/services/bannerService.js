import db from "../models";
let getBanners = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        let categories = await db.banner.findAll({
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
    getBanners,
  }