import { useEffect,useState } from "react";
import { Container } from "react-bootstrap";
import { getAllPosts } from "../../services/postService";
import PostCard from "./PostCard";
import "./PostRow.scss"
const PostRow = () =>{
    useEffect(()=>{
        getPosts();
    },[])
    const [posts,setPosts] = useState([]);
    const getPosts = async() =>{
        try{
            const results = await getAllPosts();
            if(results){
                setPosts(results);
            }
        }catch(e){
            console.log(e);
        }
    }
    return(
        <div className="post-row mt-4 mb-4">
        <div className="banner-post">
        
            <img src={`${process.env.REACT_APP_LOCALHOST_SERVER}/bannerImage/banner-post.jpeg`}/>
        </div>
        <h1 className="title-post">Tin tức mới</h1>
            <div className="container post-row-container">
            {posts && posts.length > 0 && posts.map((post,index)=>{
                return(
                    <PostCard post={post}/>
                )
            })}
            </div>
        </div>
    )
}
export default PostRow;