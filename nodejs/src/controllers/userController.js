import { log } from "console";
import db from "../models/index"
import {getUserById, getDataUser, lockUser} from "../services/userService"
let getUser = async (req,res)=>{
    const id = await req.body.id;
    let sub_categories = await getUserById();
    return res.status(200).json({
        data:sub_categories
    });
}
let handleGetDataUser = async (req,res)=>{
    const user = await req.query;
    log(user);
    let data = await getDataUser(user);
    return res.status(200).json({
        data
    })
}
let handleLockUser = async (req,res)=>{
    const id = await req.body.id;
    let data = await lockUser(id);
    if(data.errCode === 0){
        return res.status(200).json({
            errCode: 0,
            message:"success"
        })
    }else{
        return res.status(200).json({
            errCode: 1,
            message:"fail"
        })
    }
    
}

module.exports = {
    handleGetDataUser,
    handleLockUser
}