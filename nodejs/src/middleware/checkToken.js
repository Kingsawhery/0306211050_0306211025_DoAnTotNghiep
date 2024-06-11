const db = require("../models");
const cookieParser = require("cookie-parser");
async function checkToken(req, res, next) {
  const cookies = req.cookies;
  //   console.log(cookies.token, cookies);
  try {
    const user = await db.User.findOne({
      where: {
        token: cookies.token,
      },
    });
    if (!user) {
      return res.status(401).json({
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
