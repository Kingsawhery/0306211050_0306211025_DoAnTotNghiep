import moment from "moment";
import nodemailer from "nodemailer";
import db from "../models";
import userService from "../services/userService";
import forgotPasswordTokenService from "../services/forgotPasswordTokenService";

const transporter = nodemailer.createTransport({
  // host: "smtp.gmail.com",
  service: "gmail",
  port: 587,
  secure: false,
  secureConnection: false,
  // debug: true,
  // logger: truexpiresAt, data);
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: true,
  },
});
const handleForgetPasswordWithToken = async (req, res) => {
  try {
    const {token, password} = req.body;

    if (!password || !token) {
      return res.status(200).json({
        status: "fail",
        message: "Thiếu thông tin bắt buộc",
      });
    }
    const check = await forgotPasswordTokenService.checkToken(token);
    console.log(check);

    if (!check) {
      
      return res.status(200).json({
        status: "fail",
        message: "Không tìm thấy thông tin!",
      });
    }
    let timeExpire = new Date(check.expires_at);
    let timeCurrent = new Date();
    console.log(check.timeExpire + " . " + timeCurrent);
    
    const diffInSeconds = Math.abs((timeCurrent - timeExpire) / 1000);
    console.log(diffInSeconds);
    
    if (diffInSeconds > 60) {
      console.log("hết");
      
      return res.status(200).json({
        status: "fail",
        message: "Token đã hết hạn vui lòng thử lại",
      });
    } else {
      console.log("còn");                                                                                                                                                                                                                                                                                   
      await db.User.update(
        {
          password: await userService.hashUserPassword(password),
        },
        {
          where: {
            email: check.email,
          },
        }
      );
      check.destroy();
      return res.status(200).json({
        status: "success",
        message: "Update mật khẩu thành công!",
      });
    }
 
  } catch (error) {    
    return res.status(200).json({
      status: "error",
      message: "Đã xảy ra lỗi!",
    });
  }
};
const handleResetPasswordWithToken = async (req, res) => {
  try {
    const { token, password, passwordConfirm } = req.body;
    if (password !== passwordConfirm) {
      return res
        .status(400)
        .json({ error: "Mật khẩu và mật khẩu xác nhận không khớp." });
    }
    const check = await forgotPasswordTokenService.checkToken(token);
    if (!check) {
      return res.status(400).json({ error: "token kh tìm thấy." });
    }
    console.log(check);
    await db.User.update(
      {
        password: userService.hashUserPassword(password),
      },
      {
        where: {
          email: check.email,
        },
      }
    );

    return res.status(200).json({
      status: "Success",
      message: "Update mật khẩu thành công!",
    });
  } catch (error) {
    return res.status(200).json({
      status: "error",
      message: "Đã xảy ra lỗi!",
    });
  }
};

const handleSendTokenToMail = async (req, res) => {
  const token = userService.random(200);
  const email = req.body.email;
  const checkUser = await db.User.findOne({ where: { email: email } });
  if (!checkUser)
    return res
      .status(200)
      .json({ EM: "không tìm thấy email trong hệ thống", status: "fail", DT: "" });
  let currentTimeUtc = moment.utc().format();
  let currentTimeVietnam = moment(currentTimeUtc)
    .utcOffset("+0700")
    .format("YYYY-MM-DD HH:mm:ss");
  try {
    const check =
      await forgotPasswordTokenService.updateOrCreateForgotPasswordData(
        email,
        token,
        currentTimeVietnam
      );
    console.log(currentTimeVietnam);

    const info = await transporter.sendMail({
      from: '"HL Shop Support" <support@hlshop.com>',
      to: `${email}`,
      subject: "🔐 Yêu cầu thay đổi mật khẩu tài khoản HL Shop",
      text: "Vui lòng sử dụng liên kết để thay đổi mật khẩu tài khoản của bạn.",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; padding: 30px;">
          <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); overflow: hidden;   border:1px solid gray; border-radius:12px">
            <div style="padding: 20px; text-align: center; background-color: #6f42c1; color: white;">
              <h2 style="margin: 0;">HL Shop</h2>
              <p style="margin: 5px 0; font-size: 16px;">Thay đổi mật khẩu của bạn</p>
            </div>
            <div style="padding: 30px;">
              <p style="font-size: 16px; color: #333;">Xin chào,</p>
              <p style="font-size: 15px; color: #555;">
                Bạn vừa yêu cầu thay đổi mật khẩu cho tài khoản của mình.
              </p>
              <p style="font-size: 15px; color: #555;">
                Vui lòng nhấn nút bên dưới để tiếp tục. 
                <strong style="color: #dc3545;">Liên kết sẽ hết hạn sau 60 giây kể từ lúc gửi.</strong>
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="http://localhost:3000/reset-password?token=${token}" 
                  style="background: linear-gradient(90deg, #6f42c1, #9b59b6); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: bold;">
                  Thay đổi mật khẩu
                </a>
              </div>
              <p style="font-size: 14px; color: #777; text-align: center;">
                Nếu bạn không yêu cầu, vui lòng bỏ qua email này.
              </p>
              <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;" />
              <p style="font-size: 13px; color: #bbb; text-align: center;">
                © ${new Date().getFullYear()} HL Shop. Mọi quyền được bảo lưu.
              </p>
            </div>
          </div>
        </div>
      `,
    });
    

    return res.status(200).json({
      EC: 0,
      DT: "",
      status: "success",
      message: "Kiểm tra email của bạn",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ EM: "err from server", EC: "-1", DT: "" });
  }
};

module.exports = {
  handleResetPasswordWithToken,
  handleSendTokenToMail,
  handleForgetPasswordWithToken
};
