import db from "../models/index";
import password_reset_tokens from "../models/password_reset_tokens";

async function addForgotPasswordData(email, token, expiresAt) {
  try {
    const forgotPassword = await password_reset_tokens.create({
      email: email,
      token: token,
      expiresAt: expiresAt,
    });
    console.log("Forgot password data added:", forgotPassword.toJSON());
  } catch (error) {
    console.error("Error adding forgot password data:", error);
  }
}
async function updateOrCreateForgotPasswordData(email, token, expiresAt) {
  // tìm user bằng email
  const check = await db.password_reset_tokens.findOne({
    where: {
      email: email,
    },
  });

  if (!check) {
    // Không tìm thấy thì tạo mới
    const data = await db.password_reset_tokens.create({
      email: email,
      token: token,
      expires_at: expiresAt,
    });

    return data.dataValues;
  } else {
    await db.password_reset_tokens.update(
      {
        email: email,
        token: token,
        expires_at: expiresAt,
      },
      {
        where: {
          email: email,
        },
      }
    );
    const dataUpdate = await db.password_reset_tokens.findOne({
      where: {
        email: email,
      },
    });
    return dataUpdate.dataValues;
  }
}

async function checkToken(token) {
  const check = await db.password_reset_tokens.findOne({
    where: {
      token: token,
    },
  });
  if (!check) return false;
  console.log(check);
  return check.dataValues;
}

module.exports = {
  addForgotPasswordData,
  updateOrCreateForgotPasswordData,
  checkToken,
};
