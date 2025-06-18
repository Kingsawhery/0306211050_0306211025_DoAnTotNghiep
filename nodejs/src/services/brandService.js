import { generateRandomString } from "../function/randomString";
import db from "../models";
const putDisplay = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let brand = await db.brand.findOne({
                where: { id: data },
            });

            if (brand.display) {
                brand.display = false;
                await brand.save();
            } else {
                brand.display = true
                await brand.save();
            }
            resolve({
                errCode: 1
            })

        } catch (e) {
            reject(e);
        }
    });
};

let getBrandDisplay = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let brands = await db.brand.findAll({
                where: {
                    display: 1
                }
            });
            if (brands) {
                resolve(brands);
            } else {
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    });
};
let getProductBrands = async (data) => {
    return new Promise(async (resolve, reject) => {
        console.log(data);
        
        try {
            let whereCondition = {};

            if (data.categoryId !== "null") {
                whereCondition = {
                    categoryId: data.categoryId,
                    brandId: data.brandId,
                };
            } else {
                whereCondition = {
                    brandId: data.brandId,
                };
            }

            let products = await db.product.findAndCountAll({
                where: whereCondition,
                include:{
                    model:db.sub_category
                },
                limit: 10,
                offset: (data.page - 1) * 10,
            });

            if (products) {
                resolve(products);
            } else {
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    });
};
let getBrands = async (page) => {
    return new Promise(async (resolve, reject) => {
        try {
            let brands = await db.brand.findAndCountAll({
                limit: 10,
                offset: (page - 1) * 10,
                order: [["createdAt", "DESC"]]

            });
            if (brands) {
                resolve(brands);
            } else {
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    });
};
const findCodeBrandFunction = async () => {
    const string = generateRandomString("B");

    const findCodeInvoice = await db.brand.findOne({
        where: {
            brandCode: string
        }
    });
    if (!findCodeInvoice) {
        return string;
    } else {
        return findCodeInvoiceFunction();
    }
};
let createNewBrand = async (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let brands = await db.brand.findOne({
                where: {
                    name: name
                }
            });
            let brandCode = await findCodeBrandFunction();
            if (brands) {
                resolve();
            } else {
                let newBrand = await db.brand.create({
                    name: name,
                    brandCode: brandCode,
                    display: 0,
                })
                resolve(newBrand)
            }
        } catch (e) {
            reject(e);
        }
    });
};
let putBrandName = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let brands = await db.brand.findOne({
                where: {
                    id: data.id
                }
            });
            if (brands) {
                brands.name = data.name;
                await brands.save();
                resolve(brands);
            } else {
                resolve()
            }
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    getBrands,
    createNewBrand,
    putBrandName,
    putDisplay,
    getBrandDisplay,
    getProductBrands
}