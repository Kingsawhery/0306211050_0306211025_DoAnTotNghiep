import instance from "./customAxios"
export const getAllPosts = () =>{
    return instance.get(process.env.REACT_APP_API_SERVER + "/posts");
}
export const getPostPage = (id) =>{
    return instance.get(process.env.REACT_APP_API_SERVER + `/post/${id}`);
}