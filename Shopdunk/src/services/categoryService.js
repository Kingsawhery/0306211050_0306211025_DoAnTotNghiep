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
    return instance.get(process.env.REACT_APP_API_SERVER + `/categories-name`);
}
export const getDataCategory = (name) =>{
    return instance.get(process.env.REACT_APP_API_SERVER + `/categories-page?slug=${name}`);
}