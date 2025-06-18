import instance from "./customAxios"
export const getAllPosts = () =>{
    return instance.get(process.env.REACT_APP_API_SERVER + "/posts");
}
export const getPostPage = (id) =>{
    return instance.get(process.env.REACT_APP_API_SERVER + `/post/${id}`);
}
export const getListPost = (page) =>{
  return instance.get(process.env.REACT_APP_API_SERVER + `/list-posts?page=${page}`);
}

export const pustPost = (data,content) =>{
  const formData = new FormData();
for (const key in data) {
  if (data.hasOwnProperty(key) && key !== "fileUpload") {
    formData.append(`${key}`, data[key]);
  }
}
formData.append("content", content);
formData.append("fileUpload", data.fileUpload);
return instance.post(process.env.REACT_APP_API_SERVER + `/put-post`, formData);
}
export const createPost = (data) =>{
    const formData = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key) && key !== "fileUpload") {
      formData.append(`${key}`, data[key]);
    }
  }
  formData.append("fileUpload", data.fileUpload);
  return instance.post(process.env.REACT_APP_API_SERVER + `/create-post`, formData);
}