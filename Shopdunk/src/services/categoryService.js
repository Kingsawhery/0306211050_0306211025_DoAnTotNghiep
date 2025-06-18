import instance from "./customAxios"
export const getAllCategoriesHomepage = () =>{
    return instance.get(process.env.REACT_APP_API_SERVER + "/categories-homepage");
}
export const getCategories = (page) =>{
    return instance.get(process.env.REACT_APP_API_SERVER + `/categories/page=${page}`);
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