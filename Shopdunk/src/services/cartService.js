import instance from "./customAxios";
export const apiAddCart = (data) => {
  return instance.post(`${process.env.REACT_APP_API_SERVER}/cart-add`, data);
};
