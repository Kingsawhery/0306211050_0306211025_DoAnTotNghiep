const { Op } = require("sequelize");
const db = require("../models");
const cookieParser = require("cookie-parser");
async function checkToken(req, res, next) {
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

module.exports = { checkToken };
