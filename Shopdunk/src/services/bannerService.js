import instance from "./customAxios"
export const getAllBanners = () =>{
    return instance.get(process.env.REACT_APP_API_SERVER + "/banners");
}
