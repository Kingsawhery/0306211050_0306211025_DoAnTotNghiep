import instance from "./customAxios";

export const getPromotions = (page, keyword) => {
    return instance.get(`${process.env.REACT_APP_API_SERVER}/promotions?page=${page}&keyword=${keyword ? keyword : null}`);
  };
  
export const createPromotion = (data) => {
    return instance.post(`${process.env.REACT_APP_API_SERVER}/create-promotion`, data);
  }; 