import axios from "axios";
import instance from "./customAxios"
export const createInvoice = (data) =>{
    return axios.post(`${process.env.REACT_APP_API_SERVER}/create-invoice?token=${data.token}&userId=${data.id}`,
    data);
}
export const getInvoiceStatus = () =>{
    return axios.get(`${process.env.REACT_APP_API_SERVER}/get-invoice-status`);
}
export const getInvoiceByStatus = (data) =>{
  
    return axios.get(`${process.env.REACT_APP_API_SERVER}/get-invoice-by-status?id=${data.currentTab ? data.currentTab : data.id}&page=${data.page}&userId=${data.userId}&token=${data.token}`);
}
export const getInvoiceByStatusUser = (data) =>{

  return axios.get(`${process.env.REACT_APP_API_SERVER}/get-invoice-by-status-user?id=${data.currentTab}&page=${data.page}&userId=${data.userId}&token=${data.token}`);
}
export const uploadChangeStatus = (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key) && key !== "fileUpload") {
        formData.append(`${key}`, data[key]);
      }
    }
    data.fileUpload.forEach((file) => {
      formData.append("fileImage", file);
    });
    return instance.post(
      `${process.env.REACT_APP_API_SERVER}/change-status-ivoice`,
      formData
    );
  };
  export const cancelInvoice = (data) =>{
    return axios.put(`${process.env.REACT_APP_API_SERVER}/cancel-invoice`, {invoiceCode:data});
  }
  export const getSubProd = (id) =>{
    return axios.get(`${process.env.REACT_APP_API_SERVER}/get-sub-invoice?id=${id}`);
}