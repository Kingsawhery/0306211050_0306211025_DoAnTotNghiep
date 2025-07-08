const { getProperties, getDetailProperties, postProperty, putProperty, postPropertyDetail, putPropertyDetail} = require("../services/propertyService");
const handleGetProperties = async(req,res) => {
    try{
        let data = req.query;
        let { count, rows } = await getProperties(data);
        return res.status(200).json({
          data: {
            total: count,
            totalPages: Math.ceil(count / 10),
            currentPage: data.page,
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
const handleGetDetailProperties = async(req,res) => {
  try{
      let data = req.query;
      let { count, rows } = await getDetailProperties(data);
      return res.status(200).json({
        data: {
          total: count,
          totalPages: Math.ceil(count / 10),
          currentPage: data.page,
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
const handlePostProperties = async(req,res) => {
  try{
      let data = req.body.name;
      let rs = await postProperty(data);
        return res.status(200).json({
          code:rs.code,
          ms: rs.message
        });
      
    }
  catch(e){
      return res.status(400).json({
          message:"Đã có lỗi xảy ra!"
      })
  }
}
const handlePostPropertiesDetail = async(req,res) => {
  try{
      let data = req.body;
      if(data.typeClassifyId){
        let rs = await postPropertyDetail(data);
        return res.status(200).json({
          code:rs.code,
          ms: rs.message
        });
      }
      return res.status(200).json({
        code:0,
        ms: "fail"
      });
    }
  catch(e){
    console.log(e);
    
      return res.status(400).json({
          message:"Đã có lỗi xảy ra!"
      })
  }
}
const handlePutProperties = async(req,res) => {
  try{
      let data =await req.body;
      let rs = await putProperty(data);      
        return res.status(200).json({
          code:rs.code,
          ms: rs.message
        });
      
    }
  catch(e){
      return res.status(400).json({
          message:"Đã có lỗi xảy ra!"
      })
  }
}
const handlePutPropertiesDetail = async(req,res) => {
  try{
      let data =await req.body;
      let rs = await putPropertyDetail(data);      
        return res.status(200).json({
          code:rs.code,
          ms: rs.message
        });
      
    }
  catch(e){
      return res.status(400).json({
          message:"Đã có lỗi xảy ra!"
      })
  }
}
module.exports = {
    handleGetProperties,
    handleGetDetailProperties,
    handlePostProperties,
    handlePutProperties,
    handlePostPropertiesDetail,
    handlePutPropertiesDetail
}