import instance from "./customAxios"
export const getAllProperties = (page,keyword) =>{
    return instance.get(process.env.REACT_APP_API_SERVER + `/properties?page=${page}&keyword=${keyword ? keyword : null}`);
}
export const postProperty = (name) =>{
    return instance.post(process.env.REACT_APP_API_SERVER + `/property`, {
        name:name.name
    });
}
export const putProperty = (data) =>{
    return instance.put(process.env.REACT_APP_API_SERVER + `/put-property`, {
        id:data.id,
        name:data.name
    });
}
export const putPropertyDetail = (data) =>{
    return instance.put(process.env.REACT_APP_API_SERVER + `/put-property-detail`, {
        id:data.id,
        name:data.name,
        data: data.color_code
    });
}
export const getAllPropertyDetail = (page,keyword,id) =>{
    return instance.get(process.env.REACT_APP_API_SERVER + `/property-details?page=${page}&keyword=${keyword ? keyword : null}&typeClassifyId=${id}`);
}

export const postPropertyDetail = (data) =>{
    return instance.post(process.env.REACT_APP_API_SERVER + `/property-detail`, data);
}