import { paymentMoMo } from "../function/payment";
const ngrok = require("ngrok")
import {createInvoice,getSubAllInvoice,getAllInvoiceStatus,getAllInvoiceByStatus,handleConfirmPayment,changeInvoiceStatus,getAllInvoiceByStatusUser} from "../services/invoiceService"
const handleCreateInvoice = async(req,res) => {
    try{
       const data = await req.body;       
        if(data.data && data.data.length > 0 && data.phone && data.phone !== "" && data.address && data.address !== ""){
           
            const rs = await createInvoice(data);            
            if(rs){
                if(rs.paymentMethodId === 1){
                    const paymentUrl = await paymentMoMo(rs);

                    res.status(200).json({
                        message:"Tạo hóa đơn thành công!",
                        data:rs,
                        payment:{
                            id:1,
                            url:paymentUrl
                        }
                    })
                }else{
                    res.status(200).json({
                        message:"Tạo hóa đơn thành công!",
                        data:rs,
                        payment:{
                            id:2,
                            url:"http://localhost:3000/"
                        }
                    })
                }
               
            }else{
                res.status(200).json({
                    message:"Tạo hóa đơn thất bại!"
                })
            }
        }
        else{
            res.status(200).json({
                message:"Missing required data!"
            })
        }
    }   
    catch(e){
        console.log(e);
        
        return res.status(400).json({
            message:"Đã có lỗi xảy ra!"
        })
    }
}

const handleGetInvoiceStatus = async(req,res) => {
    try{
        const rs = await getAllInvoiceStatus();
        if(rs){
            return res.status(200).json({
                data:rs
            })
        }
        else{
            return res.status(200).json({
                message:"Đã có lỗi xảy ra!"
            })
        }
    }   
    catch(e){
        console.log(e);
        
        return res.status(200).json({
            message:"Đã có lỗi xảy ra!"
        })
    }
}

const handleGetInvoiceByStatusUser = async(req,res) => {
    try{
        const data = req.query;
        const rs = await getAllInvoiceByStatusUser(data);
        
        if(rs){
            return res.status(200).json({
                data:rs
            })
        }
        else{
            return res.status(200).json({
                message:"Đã có lỗi xảy ra!"
            })
        }
    }   
    catch(e){
        console.log(e);
        
        return res.status(200).json({
            message:"Đã có lỗi xảy ra!"
        })
    }
}
const handleGetSubInvoice = async(req,res)=>{
    try{
        const data = req.query;
        const rs = await getSubAllInvoice(data);
        
        if(rs){
            return res.status(200).json({
                data:rs
            })
        }
        else{
            return res.status(200).json({
                message:"Đã có lỗi xảy ra!"
            })
        }
    }   
    catch(e){
        console.log(e);
        
        return res.status(200).json({
            message:"Đã có lỗi xảy ra!"
        })
    }
}
const handleGetInvoiceByStatus = async(req,res) => {
    try{
        const data = req.query;
        const rs = await getAllInvoiceByStatus(data);
        
        if(rs){
            return res.status(200).json({
                data:rs
            })
        }
        else{
            return res.status(200).json({
                message:"Đã có lỗi xảy ra!"
            })
        }
    }   
    catch(e){
        console.log(e);
        
        return res.status(200).json({
            message:"Đã có lỗi xảy ra!"
        })
    }
}
const handleChangeStatus = async(req,res) => {
    try{
        const data = req.body;
        const rs = await changeInvoiceStatus(data);
        if(rs){
            return res.status(200).json({
                data:rs
            })
        }
        else{
            return res.status(200).json({
                message:"Đã có lỗi xảy ra!"
            })
        }
    }   
    catch(e){
        console.log(e);
        
        return res.status(200).json({
            message:"Đã có lỗi xảy ra!"
        })
    }
}
const handlePaymentStatus = async(req,res) => {
    try{
        const data = req.body;
        const rs = await handleConfirmPayment(data);
        if(rs){
            await ngrok.disconnect();
    await ngrok.kill();
            return res.status(200).json({
                data:rs
            })
        }
        else{
            return res.status(200).json({
                message:"Đã có lỗi xảy ra!"
            })
        }
    }   
    catch(e){
        console.log(e);
        
        return res.status(200).json({
            message:"Đã có lỗi xảy ra!"
        })
    }
}

module.exports = {
    handleCreateInvoice,
    handleGetInvoiceStatus,
    handleGetInvoiceByStatus,
    handleChangeStatus,
    handlePaymentStatus,
    handleGetInvoiceByStatusUser,
    handleGetSubInvoice
}