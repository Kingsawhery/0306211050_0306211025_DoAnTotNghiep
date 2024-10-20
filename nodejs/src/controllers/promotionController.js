getPromotionByCode
import {getPromotionByCode} from "../services/promotion"
const getPromotion = async(req,res) => {
    try{
        const code = req.query.code;
        console.log(code);
        
        if(code || code !== ""){
            const promotion = await getPromotionByCode(code);
        if(promotion){
            return res.status(200).json({
                data:promotion
            })
        }else{
            return res.status(200).json({
                EM:"Không tìm thấy mã khuyến mãi!"
            })
        }
        }
        else{
            return res.status(200).json({
                EM:"Thiếu mã khuyến mãi!"
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
    getPromotion
}