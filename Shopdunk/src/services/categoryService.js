import instance from "./customAxios"
export const getAllCategoriesHomepage = () =>{
    return instance.get(process.env.REACT_APP_API_SERVER + "/categories-homepage");
}
export const getCategories = (page,keyword,display) =>{
    return instance.get(process.env.REACT_APP_API_SERVER + `/categories-admin?page=${page}&keyword=${keyword || null}&display=${display ? 1 : 0}`);
}
export const getAllCategories = (page) =>{
    return instance.get(process.env.REACT_APP_API_SERVER + `/categories`);
}
export const getAllCategoryNames = () =>{
    return instance.get(process.env.REACT_APP_API_SERVER + `/categories-name-admin`);
}
export const getDataCategory = (name) =>{
    return instance.get(process.env.REACT_APP_API_SERVER + `/categories-page?slug=${name}`);
}
export const postCategory = (data) =>{
    return instance.post(process.env.REACT_APP_API_SERVER + `/categories`, data);
}
export const editCategory = (data) =>{
    return instance.put(process.env.REACT_APP_API_SERVER + `/categories`, data);
}
export const putDisplay = (data) =>{
    return instance.put(process.env.REACT_APP_API_SERVER + `/put-display-categories`, data);
}
export const changeStatus = (data) =>{
    return instance.put(process.env.REACT_APP_API_SERVER + `/change-categories`, data);
}