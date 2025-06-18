import {getPosts,getPost,handleCreatePost,getListPost,handlePutPost} from "../services/postService"
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
const handleGetListPost = async (req, res) => {
    try {
      let page = await req.query.page;
      let { count, rows } = await getListPost(page);
      return res.status(200).json({
        data: {
          total: count,
          totalPages: Math.ceil(count / 10),
          currentPage: page,
          data: rows,
        },
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        message: "Đã có lỗi xảy ra!",
      });
    }
  };
  
  
  const putPost = async(req,res) =>{
    try{
        const data = await req.body;
        if(!data.title
        ||!data.id
            || !data.sum
            || !data.content){
                return res.status(200).json({
                    err:"fail",
                    message:"Edit post fail",
                })
            }
       else{
        const results = await handlePutPost(data);
                if(results){
                    return res.status(200).json({
                        err:"success",
                        message:"Edit post success",
                    })
                }else{
                    return res.status(200).json({
                        err:"fail",
                        message:"Edit post fail",
                    })
                }
        
       }
    }
    catch(e){
        console.log(e);
        return res.status(200).json({
            message:"Something wrong!"
        })
    }
}
const createPost = async(req,res) =>{
    try{
        const data = await req.body;
        if(!data.title
            || !data.sum
            || !data.content
            || !data.image){
                return res.status(200).json({
                    err:"fail",
                    message:"Create post fail",
                })
            }
       else{
        const results = await handleCreatePost(data);
                if(results){
                    return res.status(200).json({
                        err:"success",
                        message:"Create post success",
                    })
                }
        
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
    getPostPage,
    createPost,
    handleGetListPost,
    putPost
}