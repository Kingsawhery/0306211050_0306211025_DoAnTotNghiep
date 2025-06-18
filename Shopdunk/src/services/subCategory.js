import instance from "./customAxios"

export const getSubCategoryByCategory = (page,id) =>{
    return instance.get(`${process.env.REACT_APP_API_SERVER}/sub-category?page=${page}&id=${id}`);
}
export const getSubCategoryByCategoryId = (id) =>{
    return instance.get(`${process.env.REACT_APP_API_SERVER}/sub-categories-name?id=${id}`);
}
export const postSubCategory = (data) =>{
    return instance.post(process.env.REACT_APP_API_SERVER + `/sub-categories`, data);
}
export const editSubCategory = (data) =>{
    return instance.put(process.env.REACT_APP_API_SERVER + `/sub-categories`, data);
}
