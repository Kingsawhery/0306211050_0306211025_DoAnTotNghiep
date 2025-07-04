const { Op } = require("sequelize");
const db = require("../models");

let getProperties = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let whereCondition = {};

            if (data.property && data.property !== "null") {
                whereCondition.property = data.property;
            }

            if (data.keyword && data.keyword.trim() && data.keyword.trim() !== "null") {
                whereCondition.name = {
                    [Op.like]: `%${data.keyword.trim()}%`
                };
            }

            let limit = data.page ? 10 : null;
            let offset = data.page ? (data.page - 1) * 10 : null;

            let properties = await db.type_classify.findAndCountAll({
                where: whereCondition,
                ...(limit && { limit }),
                ...(offset && { offset }),
            });

            resolve(properties);
        } catch (e) {
            reject(e);
        }
    });
};
let getDetailProperties = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let whereCondition = {};

            if (data.propertyId && data.propertyId !== "null") {
                whereCondition.propertyId = data.propertyId;
            }

            if (data.keyword && data.keyword.trim() && data.keyword.trim() !== "null") {
                whereCondition.name = {
                    [Op.like]: `%${data.keyword.trim()}%`
                };
            }

            let limit = data.page ? 10 : null;
            let offset = data.page ? (data.page - 1) * 10 : null;

            let properties = await db.type_classify.findAndCountAll({
                where: whereCondition,
                ...(limit && { limit }),
                ...(offset && { offset }),
            });

            resolve(properties);
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    getProperties,
    getDetailProperties
}