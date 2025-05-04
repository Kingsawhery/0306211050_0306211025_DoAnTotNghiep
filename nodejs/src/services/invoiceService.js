import { generateRandomString } from "../function/randomString";
import db from "../models";
import product from "../models/product";
import sub_product from "../models/sub_product";
let createInvoice = async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const code = await findCodeInvoiceFunction();
        let total = 0;
        let totalNotIncludePro = 0
        if(data.promotion.status){
          if(data.data && data.data.length > 0){
            const findPromotion = await db.promotion.findOne({
                where:{
                    code:data.promotion.name
                },
                include:{
                    model: db.product,
                    include:{
                        model: db.product_detail,
                        include:{
                        model:db.sub_product
                    }
                        
                    }

                }
            })
            if(findPromotion){
                if(findPromotion.products.length > 0) {
                        for(let x = 0; x < data.data.length;x++){
                            for(let i = 0; i < findPromotion.products.length; i++ ){
                        
                                if(findPromotion.products[i].product_detail.sub_products.length > 0){
        
                                            if(findPromotion.products[i].product_detail.sub_products.find(i=>i.id === data.data[x].sub_productId)){
                                                const subProduct = await db.sub_product.findOne({where:{id:data.data[x].sub_productId}})
                                                total = total + ((subProduct.price * data.data[x].quantity) * ((100 - findPromotion.percent ) / 100))
                                                totalNotIncludePro = totalNotIncludePro + (subProduct.price * data.data[x].quantity);

                                                
        
                                                
                                            }else{
                                                const subProduct = await db.sub_product.findOne({where:{id:data.data[x].sub_productId}})
                                                total = total + (subProduct.price * data.data[x].quantity);
                                                totalNotIncludePro = totalNotIncludePro + (subProduct.price * data.data[x].quantity);

                                            }
        
                                        }
                                    
                                }
                        }

                }
            }
          }else{resolve({
            EC:0,
            EM:"Không có sản phẩm được tìm thấy!"
          })}
        }
        else{
          
          if(data.data && data.data.length > 0){
            
            for(let i = 0; i< data.data.length ; i++){
                const subProduct = await db.sub_product.findOne({where:{id:data.data[i].sub_productId}})
                if(!subProduct){
                  continue;
                }else{
                total = total + subProduct.price * data.data[i].quantity
                totalNotIncludePro = totalNotIncludePro + subProduct.price * data.data[i].quantity
                }
            }}
            else{              
              resolve({
                EC:0,
                EM:"Không có sản phẩm được tìm thấy!"
              })
            }
        }
        const option = await db.paymentMethod.findOne({
          where:{
            id:data.option
          }
        })       

        if(option){
          if(data.promotion.status){
            const promotionId = await db.promotion.findOne({
              where:{
                code:data.promotion.name
              }
            })
            if(promotionId){
              const invoice = await db.Invoice.create({
               name: "Hóa đơn cho khách hàng " + data.name + " mã hóa đơn " + code,
               phone:data.phone,
               email:data.email ? data.email : null,
               total:total,
               totalNotIncludePro: totalNotIncludePro,
               statusInvoiceId: 1,
               promotionId: promotionId.id,
               invoiceCode: code,
               address: data.address,
               paymentMethodId: option.id
           })
           for(let i = 0; i < data.data.length; i++){
            const subProduct = await db.sub_product.findOne({where:{id:data.data[i].sub_productId}})
            const invoiceSubProd = await db.sub_product_invoices.create({
              subProductId:data.data[i].sub_productId,
              invoiceId:invoice.id,
              quantity:data.data[i].quantity,
              total:subProduct.price
            })
           }
           resolve(invoice);
             }
             
              // const invoice = await db.invoice.create({
          //     name:data.name,
          //     phone:data.phone,
          //     email:data.email,
          //     name:data.name,
          //     name:data.name,
          //     name:data.name,
          //     name:data.name,
          //     name:data.name,
          //     name:data.name,
          // })
          }
          else{
            console.log("ccccs");
            
            const invoice = await db.Invoice.create({
              name: "Hóa đơn cho khách hàng " + data.name + " mã hóa đơn " + code,
              phone:data.phone,
              email:data.email ? data.email : null,
              total:total,
              totalNotIncludePro: totalNotIncludePro,
              statusInvoiceId: 1,
              promotionId: null,
              invoiceCode: code,
              address: data.address,
              paymentMethodId: option.id
          })
          for(let i = 0; i < data.data.length; i++){
            const subProduct = await db.sub_product.findOne({where:{id:data.data[i].sub_productId}})
            console.log(data.data[i].sub_productId);
            console.log(invoice.id);

            
            const invoiceSubProd = await db.sub_product_invoices.create({
              subProductId:data.data[i].sub_productId,
              invoiceId:invoice.id,
              quantity:data.data[i].quantity,
              total:subProduct.price
            })
           }
           console.log("cc");
           
           resolve(invoice);
          }
        }
    else{
      
      resolve();
    }
        
        // const invoice = await db.invoice.create({
        //     name:data.name,
        //     phone:data.phone,
        //     email:data.email,
        //     name:data.name,
        //     name:data.name,
        //     name:data.name,
        //     name:data.name,
        //     name:data.name,
        //     name:data.name,
        // })
        
      } catch (e) {
        reject(e);
        console.log(e);
        
      }
    });
  };
  let getAllInvoiceStatus = async ()=>{
    return new Promise(async (resolve, reject) => {
      try{
        const rs = await db.statusInvoice.findAll({
          attributes:["id","name"]
        });
        resolve(rs)
      }
      catch(e){
        reject(e);
      }
    })
  }
  let getAllInvoiceByStatus = async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let invoices = await db.Invoice.findAndCountAll(
          {
            where:{
              statusInvoiceId:data.id,
            },
            include:[
              {
                model:db.paymentMethod
              },
              {
                model:db.statusInvoice
              },
            ],
            limit:10,
            offset:(data.page - 1) * 10,
          }
        );
        if (invoices) {
          resolve(invoices);
        } else {
          resolve();
        }
      } catch (e) {
        reject(e);
      }
    });
  }
  let changeInvoiceStatus = async (data)=>{
    return new Promise(async (resolve, reject) => {
      try{
        const rs = await db.Invoice.findOne({
          where:{
            name:data.invoiceCode
          }
        });
        resolve(rs)
      }
      catch(e){
        reject(e);
      }
    })
  }
  module.exports = {
    createInvoice,
    getAllInvoiceStatus,
    getAllInvoiceByStatus,
    changeInvoiceStatus
  }
  const findCodeInvoiceFunction = async () => {
    const string = generateRandomString("I");
  
    const findCodeInvoice = await db.Invoice.findOne({
      where: {
        invoiceCode: string
      }
    });
    if (!findCodeInvoice) {
      return string; 
    } else {
      return findCodeInvoiceFunction();
    }
  };