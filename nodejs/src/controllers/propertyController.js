const { getProperties } = require("../services/propertyService");

const handleGetProperties = async(req,res) => {
    try{
        let page = req.query.page;
        let { count, rows } = await getProperties(page || 1);
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
    handleGetProperties
}