import instance from "./customAxios";

export const getProductBySubCategory = (page, id) => {
  return instance.get(
    `${process.env.REACT_APP_API_SERVER}/product?page=${page}&id=${id}`
  );
};
export const getProductDetailById = (id) => {
  return instance.get(
    `${process.env.REACT_APP_API_SERVER}/product-detail?id=${id}`
  );
};
export const getSubProduct = (list, id) => {
  return instance.get(`${process.env.REACT_APP_API_SERVER}/sub-product`, {
    params: list,
  });
};
export const getProductDetailImage = (id) => {
  return instance.get(
    `${process.env.REACT_APP_API_SERVER}/product-detail-image?id=${id}`
  );
};
export const getProductByCategory = (page, id) => {
  return instance.get(
    `${process.env.REACT_APP_API_SERVER}/products?page=${page}&id=${id}`
  );
};
export const getClassifyByProduct = (id) => {
  return instance.get(
    `${process.env.REACT_APP_API_SERVER}/type-classify-sub-product?id=${id}`
  );
};
export const getProductById = (id) => {
  return instance.get(
    `${process.env.REACT_APP_API_SERVER}/product/${id}`
  );
};
export const getProductsRandom = () => {
  return instance.get(
    `${process.env.REACT_APP_API_SERVER}/products-random`
  );
};