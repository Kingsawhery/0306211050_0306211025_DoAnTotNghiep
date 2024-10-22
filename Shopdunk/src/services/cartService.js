import axios from "axios";
import instance from "./customAxios";
export const apiAddCart = (data) => {
  return axios.post(`${process.env.REACT_APP_API_SERVER}/cart-add`, data);
};
export const apiDeleteCart = (data) => {
  return axios.delete(
    `${process.env.REACT_APP_API_SERVER}/cart-delete?token=${data.token}&userId=${data.userId}&currentSubProduct=${data.currentSubProduct}`,
    data
  );
};
export const apiShowCart = (data) => {
  return axios.get(
    `${process.env.REACT_APP_API_SERVER}/cart?token=${data.token}&userId=${data.userId}`,
    data
  );
};

export const changeStatus = (data) => {
  return axios.patch(
    `${process.env.REACT_APP_API_SERVER}/cart-change-status?token=${data.token}&userId=${data.userId}`,
    data
  );
};
