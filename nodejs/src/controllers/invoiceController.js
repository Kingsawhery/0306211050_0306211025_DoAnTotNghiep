import {createInvoice,getAllInvoiceStatus,getAllInvoiceByStatus} from "../services/invoiceService"
const handleCreateInvoice = async(req,res) => {
    try{
       const data = await req.body;       
        if(data.data && data.data.length > 0 && data.phone && data.phone !== "" && data.address && data.address !== ""){
           
            const rs = await createInvoice(data);            
            if(rs){
                res.status(200).json({
                    message:"Tạo hóa đơn thành công!",
                    data:rs
                })
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

module.exports = {
    handleCreateInvoice,
    handleGetInvoiceStatus,
    handleGetInvoiceByStatus,
    handleChangeStatus
}