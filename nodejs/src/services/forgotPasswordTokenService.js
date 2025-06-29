import db from "../models/index";
import forgot_password_tokens from "../models/password_reset_tokens";

async function addForgotPasswordData(email, token, expiresAt) {
  try {
    const forgotPassword = await forgot_password_tokens.create({
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
  const check = await db.forgot_password_tokens.findOne({
    where: {
      email: email,
    },
  });

  if (!check) {
    const data = await db.forgot_password_tokens.create({
      email: email,
      token: token,
      expires_at: expiresAt,
    });

    return data.dataValues;
  } else {
    await db.forgot_password_tokens.update(
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
    const dataUpdate = await db.forgot_password_tokens.findOne({
      where: {
        email: email,
      },
    });
    return dataUpdate.dataValues;
  }
}

async function checkToken(token) {
  const check = await db.forgot_password_tokens.findOne({
    where: {
      token: token,
    },
  });
  if (!check) return false;
  return check;
}

module.exports = {
  addForgotPasswordData,
  updateOrCreateForgotPasswordData,
  checkToken,
};
