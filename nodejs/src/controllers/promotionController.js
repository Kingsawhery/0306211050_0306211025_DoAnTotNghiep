getPromotionByCode
import {getPromotionByCode, getPromotions, createNewPromotion} from "../services/promotion"
const handleCreatePromotions = async(req,res) => {
    try{
        const data = await req.body;
        
        if(data.code && data.description && data.number){
            const promotion = await createNewPromotion(data);
        if(promotion){
            return res.status(200).json({
                promotion
            })
        }else{
            return res.status(200).json({
                promotion
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
const getAllPromotions = async(req,res) => {
    try{
        let page = req.query.page;
        let keyword = req.query.keyword;
        let { count, rows } = await getPromotions(page || 1 ,keyword);
        return res.status(200).json({
          data: {
            total: count,
            totalPages: Math.ceil(count / 10),
            currentPage: page,
            data: rows,
          },
        });
      }
    catch(e){
        console.log("Lỗi ở Brand controller: ", e);
        
        return res.status(400).json({
            message:"Đã có lỗi xảy ra!"
        })
    }
}
module.exports = {
    getPromotion,
    getAllPromotions,
    handleCreatePromotions
}