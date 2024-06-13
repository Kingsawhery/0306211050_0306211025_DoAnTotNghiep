import { useEffect, useState,useRef } from "react";
import "./ProductDetailPage.scss";
import { getProductDetailById, getSubProduct, getProductById,getClassifyByProduct,getProductDetailImage,getSubProductImage } from "../../../../services/product";
import { toast } from "react-toastify";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
const ProductDetailPage = () => {
  const {id} = useParams();
  const [productDetail, setProductDetail] = useState([]);
  const [subProduct, setSubProduct] = useState([]);
  const [product, setProduct] = useState([]);
  const [listTypeClassifyDetail, setListTypeClassifyDetail] = useState({});
  const [propertySelected, setPropertySelected] = useState({});
  const [previousPropertySelected, setPreviousPropertySelected] = useState({});
  const [imageList,setImageList] = useState([]);
  const [imageSelected,setImageSelected] = useState("");

  useEffect(() => {
    getProduct();
    getProductDetail();
    setSubProduct();
    setPropertySelected({});
    getImages();
  setListTypeClassifyDetail({});
  window.scrollTo({top:"0",behavior:"instant"})
  }, []);


  useEffect(() => {
    if (
      productDetail.type_classifies &&
      Object.keys(listTypeClassifyDetail).length -
        productDetail.type_classifies.length ===
        1
    ) {
      getSubProductFunction(listTypeClassifyDetail);
      getProductByPropety();
    }
  }, [listTypeClassifyDetail]);
  const getProductByPropety = async () =>{
    const result = await getSubProductImage(id, listTypeClassifyDetail.mausac);
    console.log(result);
    if(result && result.length > 0){
      setImageList(result);
    }
  }
  const getImages = async () =>{
      const results = await getProductDetailImage(id);
      if(results && results.length > 0){
        setImageList(results)
        setImageSelected(results[0].image)
      }
  }
  const getProductDetail = async () => {
    try {
      const result = await getProductDetailById(id);
      if (result) {
        setProductDetail(result);
      }
    } catch (e) {
      toast.error("Đã có lỗi xảy ra!");
    }
  };

  const getProduct = async () => {
    try {
      let results = await getProductById(id);
      if (results) {
        setProduct(results);
      }
    } catch (e) {
      toast.error("Đã có lỗi xảy ra!");
    }
  };
  const getSubProductFunction = async (list) => {
    const result = await getSubProduct(list, productDetail.id);
    if (result) {
      setSubProduct(result);
      
    }else{
      setSubProduct(product);
    }
  };
  const handleListProerty = async (e, property,index) => {
    const name = e.target.getAttribute("name");
    setListTypeClassifyDetail({
      ...listTypeClassifyDetail,
      [name]: property,
      id: productDetail.id,
    });
    setPropertySelected({ ...propertySelected, [name]: index });
  };
  return (
    product  && (
      <div className="row">
        <div className="col-12 col-md-6">
          <div style={{ position: "sticky", top: 0 }}>
            <div className="picture">
              <img
                style={{
                  width: "80%",
                  backgroundColor: "#F5F5F7",
                  border: "none",
                  textAlign: "center",
                  paddingBottom: 10,
                }}
                src={imageSelected === "" ? `${process.env.REACT_APP_LOCALHOST_SERVER}/productImage/default.webp`: `${process.env.REACT_APP_LOCALHOST_SERVER}/productImage/${product.name}/${imageSelected}`}
                className="img-thumbnail"
                alt="..."
              />
            </div>
            <div className="slick pt-2 pb-5">
            {imageList.map((item,index)=>{
              return(
              <div className="card-slick " onClick={()=>{
                setImageSelected(item.image)
              }}>
                <div className="bg">
                  <img
                    style={{
                      position: "absolute",
                      width: 95,
                      height: 95,
                      right: 6,
                      backgroundColor: "#F5F5F7",
                    }}
                    src={`${process.env.REACT_APP_LOCALHOST_SERVER}/productImage/${product.name}/${item.image}`}
                    alt="mota-ip"
                  />
                </div>
              </div>
        
              )
            })}
            </div>

          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="assess">
            <div className="title"> {subProduct && subProduct.length !== 0
                  ? subProduct.name : product.name}</div>
            <div>
              <i id="fas-1" className="fas fa-star" />
              <i id="fas-1" className="fas fa-star" />
              <i id="fas-1" className="fas fa-star" />
              <i id="fas-1" className="fas fa-star" />
              <i id="fas-1" className="fas fa-star" />
              {productDetail.rate}
            </div>
          </div>
          {/*crossbar*/}
          <div className="crossbar" />
          {/*Price*/}
          <div className="price d-flex">
            <div>
              <span className="no-promotion">
                {subProduct && subProduct.length !== 0
                  ? `${(
                      subProduct.price -
                      subProduct.price * (product.promotion / 100)
                    ).toLocaleString("VN-vi")}
                VNĐ`
                  : `${(
                      product.price -
                      product.price * (product.promotion / 100)
                    ).toLocaleString("VN-vi")}
                VNĐ`}
              </span>
            </div>
            <div>
              <span className="promotion">
                {product.price ? `${product.price.toLocaleString("VN-vi")}VNĐ`:0}
              </span>
            </div>
            <div>
              <span className="promotion-percent">-{product.promotion}%</span>
            </div>
          </div>
          {/*-Property color*/}
          <div className="property">
            {productDetail.type_classifies &&
              productDetail.type_classifies.length > 0 &&
              productDetail.type_classifies.map((item, index) => {
                return item.name === "Màu sắc" ? (
                  <div className="color mb-4">
                    <div className="ms">
                      <span>{item.name}</span>
                    </div>
                    <div className="icon d-flex">
                      {item.type_classify_details &&
                        item.type_classify_details.length > 0 &&
                        item.type_classify_details.map((property, index) => {
                          return (
                            <div
                              className={
                                propertySelected[
                                  `${item.name
                                    .normalize("NFD")
                                    .replace(/[\u0300-\u036f]/g, "")
                                    .toLowerCase()
                                    .split(" ")
                                    .join("")}`
                                ] === index ? "circle-color circle-color-selected" : "circle-color"
                              }
                              
                              name={`${item.name
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "")
                                .toLowerCase()
                                .split(" ")
                                .join("")}`}
                              style={{
                                color: `${property.color_code}`,
                                backgroundColor: `${property.color_code}`,
                              }}
                              onClick={(e) => {
                                handleListProerty(e, property.id,index);
                              }}
                            >
                              .
                            </div>
                          );
                        })}
                      
                    </div>
                  </div>
                ) : (
                  <div className="dl">
                    {/* {productDetail} */}
                    <h6>{item.name}</h6>
                    <div className="div-dl" style={{ padding: 0 }}>
                      {item.type_classify_details &&
                        item.type_classify_details.length > 0 &&
                        item.type_classify_details.map((property, index) => {
                          return (
                            <div
                              className={
                                propertySelected[
                                  `${item.name
                                    .normalize("NFD")
                                    .replace(/[\u0300-\u036f]/g, "")
                                    .toLowerCase()
                                    .split(" ")
                                    .join("")}`
                                ] === index ? "card-dl 1 border px-3 pt-2 pb-2 card-dl-selected" : "card-dl 1 border px-3 pt-2 pb-2 "
                              }
                              style={{ cursor: "pointer" }}
                              name={`${item.name
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "")
                                .toLowerCase()
                                .split(" ")
                                .join("")}`}
                              onClick={(e) => {
                                handleListProerty(e, property.id,index);
                              }}
                            >
                              {/* {item} */}
                              {property.name}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    )
  );
};
export default ProductDetailPage;
