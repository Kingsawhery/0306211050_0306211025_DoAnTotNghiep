import axios from "axios";
import instance from "./customAxios"
export const createInvoice = (data) =>{
    return axios.post(`${process.env.REACT_APP_API_SERVER}/create-invoice?token=${data.token}&userId=${data.id}`,
    data);
}
export const getInvoiceStatus = () =>{
    return axios.get(`${process.env.REACT_APP_API_SERVER}/get-invoice-status`);
}
export const getInvoiceByStatus = (id,page) =>{
    return axios.get(`${process.env.REACT_APP_API_SERVER}/get-invoice-by-status?id=${id}&page=${page}`);
}