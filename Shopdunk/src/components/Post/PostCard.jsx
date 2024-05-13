import { useEffect } from "react";
import "./PostCard.scss"
import { useNavigate,Link, useParams } from "react-router-dom";
const PostCard = ({post}) =>{
    
    return(
        <Link to={`post/${post.slug}/${post.id}`}>
        <div className="card-post">
            <div className="card-post-div">
                <img className="card-post-img" src={`${process.env.REACT_APP_LOCALHOST_SERVER}/postImage/${post.image}`}/>
            </div>
            <h3 className="title">{post.title}</h3>
            <p className="summary">{post.summary}</p>
            <p className="created-at">{post.createdAt}</p>
        </div>
        </Link>
       
    )
}
export default PostCard;