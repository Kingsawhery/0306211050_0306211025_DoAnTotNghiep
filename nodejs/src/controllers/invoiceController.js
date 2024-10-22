import {createInvoice} from "../services/invoiceService"
const handleCreateInvoice = async(req,res) => {
    try{
       const data = await req.body;
       console.log(data.option);
       
        if(data.data && data.data.length > 0 && data.phone && data.phone !== "" && data.address && data.address !== "" && (data.option === 0 || data.option === 1)){
           
            const rs = await createInvoice(data);
            if(rs){
                res.status(200).json({
                    message:"Tạo hóa đơn thành công!"
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
module.exports = {
    handleCreateInvoice
}