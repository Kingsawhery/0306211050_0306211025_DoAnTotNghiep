import {getBanners} from "../services/bannerService"
const getAllBanners = async(req,res) => {
    try{
        const banners = await getBanners();
        if(banners){
            return res.status(200).json({
                data:banners
            })
        }
    }   
    catch(e){
        return res.status(400).json({
            message:"Đã có lỗi xảy ra!"
        })
    }
}
module.exports = {
    getAllBanners
}