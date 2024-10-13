import {getTypeClassify, getTypeClassifyDetail} from "../services/classifyService.js"
const getAllTypeClassify = async(req,res) =>{
    try{
        const results = await getTypeClassify();
        if(results){
            return res.status(200).json({
                message:"Get all classifies successfully!",
                data:results
            })
        }else{
            return res.status(200).json({
                message:"No data found!",
            })
        }
    }
    catch(e){
        console.log(e);
        return res.status(200).json({
            message:"Something wrong!"
        })
    }
}
const getAllTypeClassifyDetailById = async(req,res) =>{
    try{
        const id = await req.query.id;
        if(id){
            const results = await getTypeClassifyDetail(id);
            if(results){
                return res.status(200).json({
                    message:"Get all classifies successfully!",
                    data:results
                })
            }else{
                return res.status(200).json({
                    message:"No data found!",

                })
            }
        }else{
            return res.status(200).json({
                message:"Missing data!",

            })
        }
        
    }
    catch(e){
        console.log(e);
        return res.status(200).json({
            message:"Something wrong!"
        })
    }
}
module.exports = {
    getAllTypeClassify,
    getAllTypeClassifyDetailById

}