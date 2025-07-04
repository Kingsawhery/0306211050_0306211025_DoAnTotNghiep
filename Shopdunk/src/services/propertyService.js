import instance from "./customAxios"
export const getAllProperties = (page,keyword) =>{
    return instance.get(process.env.REACT_APP_API_SERVER + `/properties?page=${page}&&keyword=${keyword ? keyword : null}`);
}