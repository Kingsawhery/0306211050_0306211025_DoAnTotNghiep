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
      status: "success",
      message: "update mật khẩu thành công!",
    });
  } catch (error) {
    return res.status(200).json({
      status: "error",
      message: "Đã xảy ra lỗi!",
    });
  }
};

const handleSendTokenToMail = async (req, res) => {
  console.log(req.body);
  const token = userService.random(200);
  const email = req.body.email;
  const checkUser = await db.User.findOne({ where: { email: email } });
  if (!checkUser)
    return res
      .status(401)
      .json({ EM: "không tìm thấy email trong hệ thống", EC: "-1", DT: "" });
  let currentTimeUtc = moment.utc().format();
  let currentTimeVietnam = moment(currentTimeUtc)
    .utcOffset("+0700")
    .add(30, "minutes")
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
      from: "Nguyen Nhat Hao", // sender address
      to: `${email}`, // list of receivers
      subject: "Liên kết đổi mật khẩu", // Subject line
      text: "ShopDunk", // plain text body
      html: `
      <div style="font-family: Arial, sans-serif; background-color: #f0f0f0; padding: 20px;">
        <p style="color: #333;">Xin chào,</p>
        <p style="color: #666;">Đây là liên kết để thay đổi mật khẩu của bạn:</p>
        <div style="background-color: #fff; padding: 20px; border-radius: 5px; margin-top: 20px;">
          <a href="http://localhost:3000/reset-password?token=${token}" style="display: inline-block; background-color: #007bff; color: white; text-decoration: none; padding: 15px 30px; border-radius: 5px; font-size: 16px;">Thay đổi mật khẩu</a>
        </div>
        <p style="margin-top: 20px;">Nếu bạn không yêu cầu thay đổi mật khẩu, vui lòng bỏ qua email này.</p>
        <p>Cảm ơn bạn!</p>
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
};
