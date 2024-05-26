import db from "../models";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import { createToken } from "../middleware/jwtActions";
const saltRounds = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  const hashPassword = bcrypt.hashSync(userPassword, saltRounds); // Băm nhỏ password để mã hóa
  return hashPassword;
};

const checkEmailAndPhone = async (userEmail, userPhone) => {
  let user = await db.User.findOne({
    where: {
      [Op.or]: {
        email: { [Op.eq]: userEmail },
        phone: { [Op.eq]: userPhone },
      },
    },
  });
  console.log(user);
  if (user) {
    return true;
  }
  return false;
};
const checkEmail = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  });
  if (user) {
    return true;
  }
  return false;
};

const createRegisterUser = async (rawUser) => {
  try {
    //check email and phone
    console.log(rawUser);
    let isEmailAndPhone = await checkEmailAndPhone(
      rawUser.email,
      rawUser.phone
    );
    if (isEmailAndPhone === true) {
      return {
        EM: "Email and phone is already exist",
        EC: 1,
      };
    } else {
      let isPassword = hashUserPassword(rawUser.password);
      //create user
      await db.User.create({
        email: rawUser.email,
        phone: rawUser.phone,
        username: rawUser.username,
        password: isPassword,
      });
      return {
        EM: "create User Successfuly!",
        EC: 0,
      };
    }
    //hash password
  } catch (e) {
    console.log(e);
    return {
      EM: "Code err",
      EC: 2,
    };
  }
};

const checkPassword = (inputPassword, hashUserPassword) => {
  return bcrypt.compareSync(inputPassword, hashUserPassword);
};

const handleLoginUser = async (rawUser) => {
  try {
    const user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: rawUser.value }, { phone: rawUser.value }],
      },
    });

    if (user) {
      let passwordSuccess = await checkPassword(
        rawUser.password,
        user.password
      );
      if (passwordSuccess === true) {
        const payload = {
          email: user.email,
          role: user.role,
          expiresIn: process.env.JWT_EXPIRES_IN,
        };
        let token = await createToken(payload);
        return {
          EM: "Ok!",
          EC: 0,
          DT: {
            access_token: token,
          },
        };
      }
    }
    return {
      EM: "Your email/phone or paassword is incorrect",
      EC: 1,
      DT: "",
    };
  } catch (err) {
    console.log(err);
    return {
      EM: "Code err",
      EC: 2,
    };
  }
};
const updateUserOTP = async (code, email) => {
  try {
    const user = await db.User.update(
      { code: code },
      {
        where: { email: email.trim(), type: "LOCAL" },
      }
    );
  } catch (err) {
    console.log(err);
  }
};
const resetUserPassword = async (rawData) => {
  try {
    let newPassword = await hashUserPassword(rawData.newPassword);
    console.log("newpassword", newPassword);

    let count = await db.User.update(
      { password: newPassword },
      {
        where: { email: rawData.email, type: "LOCAL", code: rawData.code },
      }
    );
    console.log("read err count", count);

    if (count && count[0] > 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
// const upsertUserGG = async (typeAcc, dataRaw) => {
//   let user = null;
//   if (typeAcc === "GOOGLE") {
//     user = await db.User.findOne({
//       where: { email: dataRaw.email, type: typeAcc },
//       raw: true,
//     });
//     console.log(user);
//   }
//   if (!user) {
//     user = await db.User.create({
//       email: dataRaw.email,
//       username: dataRaw.username,
//       type: typeAcc,
//     });
//     user = user.get({ plain: true });
//   }
// };
module.exports = {
  createRegisterUser,
  handleLoginUser,
  updateUserOTP,
  resetUserPassword,
  // upsertUserGG,
  checkEmail,
};
