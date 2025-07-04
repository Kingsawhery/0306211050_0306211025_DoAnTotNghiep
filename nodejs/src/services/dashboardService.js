import { col, fn, literal } from "sequelize";
import db from "../models";
import { Op } from "sequelize";


  export let dashboardTop10SubProd = async (year, month) => {
    return new Promise(async (resolve, reject) => {

      try {
        let monthConfig = null;
        if(month !== "null"){
         monthConfig = String(month).padStart(2, '0');
         console.log(monthConfig !== null);
         
        }
        let result = await db.sub_product_invoices.findAll({
            attributes: [
              "subProductid",
              [fn("SUM", col("quantity")), "total_sold"],
            ],
            include: [
              {
                model: db.sub_product,
                attributes: ["name"],
                include: [
                    {
                        model: db.product_detail,
                        attributes: ["id"],
                        include: [
                          {
                            model: db.product,
                            attributes: ["name"],
                          },
                        ],
                      },
                ],
              },
              {
                model: db.invoice,
                where: {
                    paymentStatus:"Đã thanh toán",
                  createdAt: {
                    [Op.between]: [
                      new Date(`${year}-${monthConfig !== null ? monthConfig : "01"}-01T00:00:00+07:00`),
                      new Date(`${year}-${monthConfig !== null  ? monthConfig : "12"}-31T23:59:59+07:00`),
                    ],
                  },
                },
                attributes: [],
              },
            ],
            group: [
                'subProductId',
                'sub_product.id',
                'sub_product.productDetailId',
                'sub_product->product_detail.productId'
              ],
            order: [[literal("total_sold"), "DESC"]],
            limit: 10,
          });
          console.log(`${year}-${monthConfig}-01T00:00:00+07:00`);
          
          resolve(result)
      }
      catch (e) {
        reject(e);
      }
    })
  }
  export let dashboardTop10Product = async (year, month) => {
    return new Promise(async (resolve, reject) => {
      try {
        let monthConfig = null;
        if(month !== "null"){
         monthConfig = String(month).padStart(2, '0');
         console.log(monthConfig !== null);
         
        }
  
        let result = await db.sub_product_invoices.findAll({
          attributes: [
            [col("sub_product->product_detail->product.id"), "productId"],
            [col("sub_product->product_detail->product.name"), "name"],
            [fn("SUM", col("quantity")), "total_sold"],
          ],
          include: [
            {
              model: db.sub_product,
              attributes: [],
              include: [
                {
                  model: db.product_detail,
                  attributes: [],
                  include: [
                    {
                      model: db.product,
                      attributes: [],
                    },
                  ],
                },
              ],
            },
            {
              model: db.invoice,
              where: {
                paymentStatus: "Đã thanh toán",
                createdAt: {
                  [Op.between]: [
                    new Date(`${year}-${monthConfig !== null ? monthConfig : "01"}-01T00:00:00+07:00`),
                    new Date(`${year}-${monthConfig !== null  ? monthConfig : "12"}-31T23:59:59+07:00`),
                  ],
                },
              },
              attributes: [],
            },
          ],
          group: [
            "sub_product->product_detail->product.id",
            "sub_product->product_detail->product.name",
          ],
          order: [[literal("total_sold"), "DESC"]],
          limit: 10,
          raw: true,
        });
  
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  };
  export const sumInvoiceByUser = async (year, month) => {
    return new Promise(async (resolve, reject) => {
      try {
        let monthConfig = null;
        if(month !== "null"){
         monthConfig = String(month).padStart(2, '0');
         console.log(monthConfig !== null);
         
        }
  
    const result = await db.invoice.findAll({
      attributes: [
        "userId",
        [fn("SUM", col("total")), "total_spent"],
      ],
      where: {
        paymentStatus: "Đã thanh toán",
        createdAt: {
          [Op.between]: [
            new Date(`${year}-${monthConfig !== null ? monthConfig : "01"}-01T00:00:00+07:00`),
            new Date(`${year}-${monthConfig !== null  ? monthConfig : "12"}-31T23:59:59+07:00`),
          ]
        },
      },
      group: ["userId"],
      limit:10,
      include: [
        {
          model: db.User,
          attributes: ["id", "username", "email"],
        },
      ],
      order: [[fn("SUM", col("total")), "DESC"]],
    });
  
    resolve(result);
  } catch (e) {
    reject(e);
  }
});
  };

  export let dashboardTop10SubCate = async (year, month) => {
    return new Promise(async (resolve, reject) => {
      try {
        let monthConfig = null;
        if(month !== "null"){
         monthConfig = String(month).padStart(2, '0');
         
        }
  
        const result = await db.sub_product_invoices.findAll({
          attributes: [
  [col("sub_product->product_detail->product.subCategoryId"), "subCategoryId"],
  [fn("SUM", col("quantity")), "total_sold"],
  [col("sub_product->product_detail->product->sub_category.name"), "subCategoryName"]
],
          include: [
            {
              model: db.sub_product,
              attributes: [],
              include: [
                {
                  model: db.product_detail,
                  attributes: [],
                  include: [
                    {
                      model: db.product,
                      attributes: [],
                      include: [
                        {
                          model: db.sub_category,
                          attributes: ["name"],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              model: db.invoice,
              where: {
                paymentStatus: "Đã thanh toán",
                createdAt: {
                  [Op.between]: [
                    new Date(`${year}-${monthConfig !== null ? monthConfig : "01"}-01T00:00:00+07:00`),
                    new Date(`${year}-${monthConfig !== null  ? monthConfig : "12"}-31T23:59:59+07:00`),
                  ]
                },
              },
              attributes: [],
            },
          ],
          group: [
            "sub_product->product_detail->product.subCategoryId",
          ],
          order: [[literal("total_sold"), "DESC"]],
          limit: 10,
        });
  
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  };

  export let dashboardTop10Brand = async (year, month) => {
    return new Promise(async (resolve, reject) => {
      try {
        let monthConfig = null;
        if(month !== "null"){
         monthConfig = String(month).padStart(2, '0');
         
        }
  
        const result = await db.sub_product_invoices.findAll({
          attributes: [
  [col("sub_product->product_detail->product.brandId"), "brandId"],
  [fn("SUM", col("quantity")), "total_sold"],
  [col("sub_product->product_detail->product->brand.name"), "brand"]
],
          include: [
            {
              model: db.sub_product,
              attributes: [],
              include: [
                {
                  model: db.product_detail,
                  attributes: [],
                  include: [
                    {
                      model: db.product,
                      attributes: [],
                      include: [
                        {
                          model: db.brand,
                          attributes: ["name"],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              model: db.invoice,
              where: {
                paymentStatus: "Đã thanh toán",
                createdAt: {
                  [Op.between]: [
                    new Date(`${year}-${monthConfig !== null ? monthConfig : "01"}-01T00:00:00+07:00`),
                    new Date(`${year}-${monthConfig !== null  ? monthConfig : "12"}-31T23:59:59+07:00`),
                  ]
                },
              },
              attributes: [],
            },
          ],
          group: [
            "sub_product->product_detail->product.brandId",
          ],
          order: [[literal("total_sold"), "DESC"]],
          limit: 10,
        });
  
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  };
  
  export let dashboardTop10Invoices = async (year, month) => {
    return new Promise(async (resolve, reject) => {
      try {
        let monthConfig = null;
        if (month !== "null") {
          monthConfig = String(month).padStart(2, "0");
        }
  
        const result = await db.invoice.findAll({
          attributes: [
            "id",
            "userId",
            "total",
            "invoiceCode",
            "createdAt"
          ],
          include: [
            {
              model: db.User,
              attributes: ["username", "email"]
            }
          ],
          where: {
            paymentStatus: "Đã thanh toán",
            createdAt: {
              [Op.between]: [
                new Date(`${year}-${monthConfig !== null ? monthConfig : "01"}-01T00:00:00+07:00`),
                new Date(`${year}-${monthConfig !== null ? monthConfig : "12"}-31T23:59:59+07:00`)
              ]
            }
          },
          order: [["total", "DESC"]],
          limit: 10
        });
  
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  };