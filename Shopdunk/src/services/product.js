import instance from "./customAxios";
export const getProductBySubCategory = (page, id,sort) => {
  return instance.get(
    `${process.env.REACT_APP_API_SERVER}/product?page=${page}&id=${id}&sort=${sort}`
  );
};

export const putPrice = (data) => {
  return instance.put(
    `${process.env.REACT_APP_API_SERVER}/set-price-sub-product`,data
  );
};
export const getSubProdById = (page, id) => {
  return instance.get(
    `${process.env.REACT_APP_API_SERVER}/subprod-by-product?page=${page}&id=${id}`
  );
};
export const getProductDetailById = (id) => {
  return instance.get(
    `${process.env.REACT_APP_API_SERVER}/product-detail?id=${id}`
  );
};
export const getAllTypeClassify = () => {
  return instance.get(
    `${process.env.REACT_APP_API_SERVER}/type-classifies`
  );
};
export const getTypeClassifyDetail = (id) => {
  return instance.get(
    `${process.env.REACT_APP_API_SERVER}/type-classifies-detail?id=${id}`
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
export const getPromotion = (code) => {
  return instance.get(
    `${process.env.REACT_APP_API_SERVER}/promotion?code=${code}`
  );
};
export const deleteProductById = (id,token,userId) => {
  return instance.delete(
    `${process.env.REACT_APP_API_SERVER}/product?id=${id}&token=${token}&userId=${userId}`
  );
};

export const checkStockData = (data) => {
  return instance.post(
    `${process.env.REACT_APP_API_SERVER}/check-out-stock`,{data}
  );
};
export const editProduct = (data) => {
  return instance.put(
    `${process.env.REACT_APP_API_SERVER}/products`,data
  );
};
export const handleRestoreProduct = (id,token,userId) => {
  return instance.put(
    `${process.env.REACT_APP_API_SERVER}/product-status?id=${id}&token=${token}&userId=${userId}`
  );
};
export const handleGetClassify = (id,token,userId) => {
  return instance.get(
    `${process.env.REACT_APP_API_SERVER}/type-classifies-detail-sub-prod?id=${id}`
  );
};
export const createSubProd = (data) => {
  return instance.post(
    `${process.env.REACT_APP_API_SERVER}/create-sub-prod`,data
  );
};
