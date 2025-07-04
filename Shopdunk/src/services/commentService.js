import instance from "./customAxios"
export const getComment = (id) =>{
    return instance.get(process.env.REACT_APP_API_SERVER + `/comment-product?productDetailId=${id}`);
}
