const { Op } = require("sequelize");
const db = require("../models");
const cookieParser = require("cookie-parser");
async function checkToken(req, res, next) {
  console.log(req.query);
  const token = req.body.token ? req.body.token : req.query.token;
  const id = req.body.userId ? req.body.userId : req.query.userId;
  try {
    const user = await db.User.findOne({
      where: {
        [Op.and]: {
          token: token,
          id: id,
        },
      },
    });
    if (!user) {
      return res.status(200).json({
        EC: 1,
        EM: "Xác thực thất bại",
      });
    }
    req.user = user.dataValues;
    next();

   
  } catch (error) {
    

    return res.status(200).json({
      EM: "Bạn chưa đăng nhập",
      EC: 1,
      status: "403",
    });
    
  }
}
async function checkUser(req, res, next) {
  console.log(req.query);
  const token = req.body.token ? req.body.token : req.query.token;
  const id = req.body.userId ? req.body.userId : req.query.userId;
  try {
    const user = await db.User.findOne({
      where: {
        [Op.and]: {
          token: token,
          id: id,
        },
      },
    });
    if (!user) {
      return res.status(200).json({
        EC: 1,
        EM: "Xác thực thất bại",
      });
    }
    else if(user.status == 0){
      return res.status(200).json({
        EC: 1,
        EM: "Tài khoản đã bị khóa",
      });
    }
    req.user = user.dataValues;
    return res.status(200).json({
      EC: 2,
      EM: "Xác thực thành công",
    });
  } catch (error) {
    

    return res.status(200).json({
      EM: "Bạn chưa đăng nhập",
      EC: 1,
      status: "403",
    });
    
  }
}
async function checkAdmin(req, res, next) {
  const token = req.body.token ? req.body.token : req.query.token;
  const id = req.body.userId ? req.body.userId : req.query.userId;
  try {
    const user = await db.User.findOne({
      where: {
        [Op.and]: {
          token: token,
          id: id,
        },
      },
    });
    if (!user) {
      return res.status(200).json({
        EC: -1,
        EM: "Xác thực thất bại",
      });
    }
    else if( user.roleId === 1){
      return res.status(200).json({
        EC: 1,
        EM: "admin",
      });
    }else{
      return res.status(200).json({
        EC: 2,
        EM: "user",
      });
    }
    next();
  } catch (error) {

    return res.status(200).json({
      EM: "Bạn chưa đăng nhập",
      EC: 1,
      status: "403",
    });
    
  }
}
async function checkAdminData(req, res, next) {
  const token = req.body.token ? req.body.token : req.query.token;
  const id = req.body.userId ? req.body.userId : req.query.userId;
  try {
    const user = await db.User.findOne({
      where: {
        [Op.and]: {
          token: token,
          id: id,
        },
      },
    });
    if (!user) {
      return res.status(200).json({
        EC: -1,
        EM: "Xác thực thất bại",
      });
    }
    else if( user.roleId === 1){
      next();
    }else{
      return res.status(200).json({
        EC: 2,
        EM: "user",
      });
    }
  } catch (error) {

    return res.status(200).json({
      EM: "Bạn chưa đăng nhập",
      EC: 1,
      status: "403",
    });
    
  }
}

module.exports = { checkToken, checkAdmin, checkUser, checkAdminData};
