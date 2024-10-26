import instance from "./customAxios"
export const getAllBanners = () =>{
    return axios.get(process.env.REACT_APP_API_SERVER + "/banners");
}
