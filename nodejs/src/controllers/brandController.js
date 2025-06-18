import {getBrands, createNewBrand, putBrandName, putDisplay, getBrandDisplay,
    getProductBrands
} from "../services/brandService"
let handlePutDisplay = async (req, res) => {
    const data = await req.body.id;
    let errCode = await putDisplay(data);
    if(errCode.errCode == 1){
      return res.status(200).json({
        errCode:errCode.errCode,
        message:"change success!"});
    }else{
      return res.status(200).json({
        errCode:errCode.errCode,
        message:"change fail!"    });
    }
  };
  const getAllProductBrands = async(req,res) => {
    try{
        let data = req.query;
        let { count, rows } = await getProductBrands(data);
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
  const getAllBrandDisplay = async(req,res) => {
    try{
        let brands = await getBrandDisplay();
        return res.status(200).json({
          data: brands
        });
      }
    catch(e){        
        return res.status(400).json({
            message:"Đã có lỗi xảy ra!"
        })
    }
}
const getAllBrands = async(req,res) => {
    try{
        let page = req.query.page;
        let { count, rows } = await getBrands(page || 1);
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
let putNewBrand = async (req, res) => {
    try {
      const data = await req.body;
      if (req.body.name == undefined || req.body.name == "" || req.body.id == null ) {
        
        return res.status(200).json({
          message: "Edit brand failed",
          status: 400,
        });
      } else {
        await putBrandName(data);
        return res.status(201).json({
          message: "Edit brand success",
          status: 200,
        });
      }
    } catch (e) {
        console.log("Lỗi ở: ", e);

      return res.status(200).json({
        
        message: "An error occurred, please try again",
        status: 400,
      });
    }
  };
let postNewBrand = async (req, res) => {
    try {
      const data = await req.body.name;
      if (req.body.name == undefined ) {
        console.log("1");
        
        return res.status(200).json({
          message: "Add new brand failed",
          status: 400,
        });
      } else {
        await createNewBrand(data);
        return res.status(201).json({
          message: "Add new brand success",
          status: 200,
        });
      }
    } catch (e) {
      return res.status(200).json({
        message: "An error occurred, please try again",
        status: 400,
      });
    }
  };
  
module.exports = {
    getAllBrands,
    postNewBrand,
    putNewBrand,
    handlePutDisplay,
    getAllBrandDisplay,
    getAllProductBrands
}