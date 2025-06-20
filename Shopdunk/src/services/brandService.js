import instance from "./customAxios"
export const getAllBrands = () =>{
    return instance.get(process.env.REACT_APP_API_SERVER + "/brands");
}
export const getAllBrandsDisplay = () =>{
    return instance.get(process.env.REACT_APP_API_SERVER + "/brand-display");
}

export const postBrand = (data) =>{
    return instance.post(process.env.REACT_APP_API_SERVER + "/create-brand",data);
}
export const editBrand = (data) =>{
    return instance.put(process.env.REACT_APP_API_SERVER + "/put-brand",data);
}

export const putDisplay = (data) =>{
    return instance.put(process.env.REACT_APP_API_SERVER + `/put-display-brand`, data);
}
export const getAllProductByBrand = (page, id,categoryId,keyword) =>{
    return instance.get(process.env.REACT_APP_API_SERVER + `/product-by-brand?page=${page}&brandId=${id ? id : null}&categoryId=${categoryId ? categoryId : null}&keyword=${keyword ? keyword : null}`);
}