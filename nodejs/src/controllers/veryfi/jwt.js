const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = "Hào nè";

function sign(email, expiresIn = "30m") {
  return jwt.sign({ email }, process.env.JWT_SECRET || JWT_SECRET, {
    expiresIn,
  });
}
const veryfi = (token) => {
  try {
    jwt.veryfi(token, process.env.JWT_SECRET || JWT_SECRET);
    return true;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  sign,
  veryfi,
};
