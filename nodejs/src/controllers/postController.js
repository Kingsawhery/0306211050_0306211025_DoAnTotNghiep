import {getPosts,getPost} from "../services/postService"
const getAllPosts = async(req,res) =>{

    try{
        const results = await getPosts();
        if(results){
            return res.status(200).json({
                message:"Get all posts successfully!",
                data:results
            })
        }
    }
    catch(e){
        console.log(e);
        return res.status(200).json({
            message:"Something wrong!"
        })
    }
}
const getPostPage = async(req,res) =>{
    try{
        let id = await req.params.id;
        console.log(id);
        const results = await getPost(id);
        if(results){
            return res.status(200).json({
                message:"Get post successfully!",
                data:results
            })
        }
        else{
            return res.status(200).json({
                message:"Not found post!",
            })
        }
    }
    catch(e){
        console.log(e);
        return res.status(400).json({
            message:"Something wrong!"
        })
    }
}
module.exports = {
    getAllPosts, 
    getPostPage
}