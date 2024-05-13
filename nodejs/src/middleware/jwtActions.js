import jwt from "jsonwebtoken"
require("dotenv").config();
async function createJWT(payload){
    let token = await jwt.sign(payload ,process.env.JWT_SECRET);
    return token;
}
module.exports = {
    createJWT
}