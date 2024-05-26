import jwt from "jsonwebtoken";
require("dotenv").config();
async function createToken(payload) {
  console.log(process.env.JWT_SECRET);
  let token = await jwt.sign(payload, process.env.JWT_SECRET);
  return token;
}
async function CheckUserRole(req, res, next) {
  const token = await req.headers.authorization?.split(" ")[1]; // Trích xuất token từ header Authorization
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(process.env.JWT_SECRET);
      return res.status(403).send({ message: "Invalid token" });
    }
    console.log(token);

    // Kiểm tra role
    if (!CheckRole(decoded)) {
      console.log(decoded);

      return res
        .status(403)
        .send({ message: "You don't have permission to access this resource" });
    }

    // Tiếp tục xử lý request nếu role hợp lệ
    next();
  });
}

// Hàm để kiểm tra role
function CheckRole(users) {
  return users.role === "admin";
}
module.exports = {
  createToken,
  CheckUserRole,
};
