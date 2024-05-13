import instance from "./customAxios"
export const getAllCategoriesHomepage = () =>{
    return instance.get(process.env.REACT_APP_API_SERVER + "/categories-homepage");
}
export const getCategories = (page) =>{
    return instance.get(process.env.REACT_APP_API_SERVER + `/categories/page=${page}`);
}