import getTypeClassify from "../services/classifyService"
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

module.exports = {
    getAllTypeClassify

}