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
export const getSubProduct = (list) => {
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
  return instance.get(`${process.env.REACT_APP_API_SERVER}/product/${id}`);
};
export const getProductsRandom = (id) => {
  return instance.get(`${process.env.REACT_APP_API_SERVER}/products-random?id=${id}`);
};
export const getClassifies = () => {
  return instance.get(`${process.env.REACT_APP_API_SERVER}/classifies`);
};
export const postProduct = (data) => {
  const formData = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key) && key !== "fileImage") {
      formData.append(`${key}`, data[key]);
    }
  }
  data.fileImage.forEach((file) => {
    formData.append("fileImage", file); // Gửi từng tệp
  });
  return instance.post(
    `${process.env.REACT_APP_API_SERVER}/create-product`,
    formData
  );
};
export const getSubProductImage = (productDetailId, typeClassifyDetailId) => {
  return instance.get(
    `${process.env.REACT_APP_API_SERVER}/sub-product-image?productDetailId=${productDetailId}&typeClassifyDetailId=${typeClassifyDetailId}`
  );
};
