import { response } from "express";
import db from "../models";
import loginRegisterService from "../services/loginRegisterService";
import nodemailer from "nodemailer";
import userService from "../services/userService";
import JWT from "jsonwebtoken";
import { log } from "console";
require("dotenv").config();
const path = require("path");

const handleRegister = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.email || !req.body.phone || !req.body.password) {
      return res.status(200).json({
        EM: "Missing required parameter",
        EC: "1",
        DT: "",
      });
    } else if (req.body.password && req.body.password.lenght < 6) {
      return res.status(200).json({
        EM: "Your password must more than 6 letter",
        EC: "1",
        DT: "",
      });
    }
    let data = await loginRegisterService.createRegisterUser(req.body);
    return res.status(200).json({
      data: {
        EM: data.EM,
        EC: data.EC,
        DT: data.dataValues,
      },
    });
  } catch (e) {
    return res.status(200).json({ EM: "err from services", EC: "-1", DT: "" });
  }
  console.log("<<<check call me", req.body);
};

const handleLogin = async (req, res) => {
  try {
    let a = await req.body;    
    let data = await loginRegisterService.handleLoginUser(a);
    if (data.EC == "1") {
      return res.status(200).json({
        EM: "Account is not define",
        EC: "400",
      });
    }
    const token = userService.random(200);
    
    await db.User.update(
      {
        token: token,
      },
      {
        where: {
          email: data.DT.user.email,
        },
      }
    );
    let dataUser = data.DT.user;
    // HttpOnly: user không thể lấy ra bằng script hoặc trình duyệt, chỉ sever lấy ra được
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 30000000,
        domain: ".localhost",
      })
      .status(200)
      .json({
        // EM: data.EM,
        // EC: data.EC,
        // DT: data.DT.user.dataValues,
        user: {
          id: dataUser.id,
          email: dataUser.email,
          type: dataUser.type,
          username: dataUser.username,
          phone: dataUser.phone,
          token: token,
          roleId: dataUser.roleId,
          image: dataUser.image
        },
        EM: "Login success",
        EC: 0,
      });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ EM: "err from services", EC: "-1", DT: "" });
  }
};
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

const handleSendEmail = async (req, res) => {
  const checkemail = await loginRegisterService.checkEmail(req.body.email);
  console.log(checkemail);

  if (!checkemail) {
    return res.status(200).json({
      status: "error",
      EM: "Email is not define! ",
      EC: 1,
    });
  } else {
    const transporter = nodemailer.createTransport({
      // host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      secure: false,
      secureConnection: false,
      // debug: true,
      // logger: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });
    try {
      console.log(req.body.email);
      const OTP = Math.floor(1000 + Math.random() * 9000);
      const info = await transporter.sendMail({
        from: "Nguyen Nhat Hao", // sender address
        to: `${req.body.email}`, // list of receivers
        subject: "Lấy mã OTP", // Subject line
        text: "Hello world?", // plain text body
        html: `<b>Hello Bạn</b>,
      <div>Your OTP: ${OTP} </div>`,
        attachments: [
          {
            filename: "295494384_3170009529918207_2475107303070177_n.jpg",
            path: path.join(
              "C://DACC/nodejs/nodejs/public",
              "/295494384_3170009529918207_2475107303070177_n.jpg"
            ),
            cid: "295494384_3170009529918207_2475107303070177_n.jpg",
          },
        ],
      });
      await loginRegisterService.updateUserOTP(OTP, req.body.email);

      let date = new Date();
      return res.status(200).json({
        status: "success",
        EM: "Bạn đã gửi mã thành công ",
        EC: 0,
        DT: {
          email: req.body.email,
          timeExpired: date.getTime() + 180000,
        },
      });
    } catch (error) {
      console.error("Error sending email:", error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  }
};

const handleResetPassword = async (req, res) => {
  try {
    let result = await loginRegisterService.resetUserPassword(req.body);
    if (result === true) {
      return res.status(200).json({
        EC: 0,
      });
    } else {
      return res.status(500).json({
        EC: -1,
        EM: "Dont Update reset password",
        DT: "",
      });
    }
  } catch (error) {
    return res.status(500).json({
      EC: -2,
      EM: "Internal ERR",
      DT: "",
    });
  }
};

const handleLoginGG = async (req, res) => {
  const token = req.body.access_token;
  const str = token.split(".");
  const infor_email = JSON.parse(atob(str[1]));

  // Sẽ lưu token trong db của user vào trình duyệt user.
  // Sẽ lưu token trong db của user vào trình duyệt user.
  console.log(infor_email.name);
  const email = infor_email.email;
  const checkUser = await db.User.findOne({
    where: {
      email: email,
    },
  });
  let userNew;
  if (!checkUser) {
    let user = await userService.createUser(
      infor_email.email,
      "",
      infor_email.name,
      "GOOGLE"
    ); // (email, password, username, type)
  userNew = user;

  }
  const tk = await userService.random(200);
  await db.User.update(
    {
      token: tk,
    },
    {
      where: {
        email: email,
      },
    }
  );

  res.cookie("token", tk, {
    httpOnly: true,
    secure: false,
    maxAge: 3600 * 60 * 24,
  });

  return res.status(200).json({
    data: {...(checkUser ? checkUser : userNew).dataValues, token:tk},
    status: 200,
    message: "Login gg success",
  });
};
const handleOTP = (req, res) => {
  return res.status(200).json({
    message: "Send otp success!",
  });
};

const handleVerify = (req, res) => {
  console.log("verify otp: " + req.body);
  return req.body;
  // Xac minh usẻr gui len là ai

  // Kiem tra otp cua user đó có đúng kh, còn hạn khong6
};

// const handleAddCart = async (req, res) => {
//   const { sub_productId, userId } = req.body;
//   console.log(req.body);

//   // Sửa đổi từ req.params sang req.body
//   const id = req.body.id; // Giả sử req.user.id chứa ID của người dùng hiện tại

//   try {
//     // Tìm kiếm user dựa trên ID
//     const user = await db.User.findByPk(userId);
//     console.log(user);

//     if (!user) {
//       return res.status(404).json({
//         message: "Không tìm thấy người dùng",
//       });
//     }

//     // Gọi hàm addProductInCart với user
//     let cart = await postCart.addProductInCart(user, sub_productId); // Giả sử hàm này nhận user và sub_productId
//     if (cart) {
//       return res.status(200).json({
//         message: "Thêm thành công",
//       });
//     } else {
//       return res.status(400).json({
//         message: "Thêm thất bại",
//       });
//     }
//   } catch (e) {
//     console.error(e);
//     return res.status(500).json({
//       message: "Lỗi hệ thống",
//     });
//   }
// };
const handleTestCookies = (req, res) => {
  return res
    .cookie("token", "fuck", {
      httpOnly: true,
      secure: false,
      maxAge: 300000000000,
    })
    .status(200)
    .json({
      EM: "ajah",
      EC: "ajah",
      DT: "a",
    });
};

module.exports = {
  handleTestCookies,
  handleRegister,
  handleLogin,
  handleSendEmail,
  handleLoginGG,
  handleResetPassword,
  handleOTP,
  handleVerify,
};
