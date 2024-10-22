import instance from "./customAxios"
export const createInvoice = (data) =>{
    return instance.post(`${process.env.REACT_APP_API_SERVER}/create-invoice?token=${data.token}&userId=${data.userId}`,
    data);
}
