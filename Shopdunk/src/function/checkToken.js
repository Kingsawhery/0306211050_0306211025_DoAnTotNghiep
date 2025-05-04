import axios from "axios"

export const checkToken = () =>{
    try{
        
        const user = localStorage.getItem("user");
        const token = JSON.parse(user).token;
        const userId = JSON.parse(user).userId;
     return axios.get(`${process.env.REACT_APP_API_SERVER}/check?token=${token}&userId=${userId}`)
    }
    catch(e){
        return {
            EC: 1,
            EM: "Xác thực thất bại",
          }
    }
}
export const checkAdminRole = () =>{
    try{
        
        const user = localStorage.getItem("user");
        let token = JSON.parse(user).token;
        let userId = JSON.parse(user).id;
     return axios.get(`${process.env.REACT_APP_API_SERVER}/check-admin-role?token=${token}&userId=${userId}`)
    }
    catch(e){
        return {
            EC: 1,
            EM: "Xác thực thất bại",
          }
    }
}