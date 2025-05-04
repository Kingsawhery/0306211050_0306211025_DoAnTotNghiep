import db from "../models/index"
import {getUserById} from "../services/userService"
let getUser = async (req,res)=>{
    const id = await req.body.id;
    let sub_categories = await getUserById();
    return res.status(200).json({
        data:sub_categories
    });
}