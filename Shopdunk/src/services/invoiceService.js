import axios from "axios";
import instance from "./customAxios"
export const createInvoice = (data) =>{
    console.log(data);
    
    return axios.post(`${process.env.REACT_APP_API_SERVER}/create-invoice?token=${data.token}&userId=${data.id}`,
    data);
}
