import jwt from "jsonwebtoken";
const verify = async (jwtCode) => {
  const result = await jwt.verify(
    jwtCode,
    process.env.JWT_SECRET,
    (err, decoded) => {
      if (err) {
        console.log("fail");
        return err;
      } else {
        return decoded;
      }
    }
  );
  return result;
};
module.exports = {
  verify,
};
