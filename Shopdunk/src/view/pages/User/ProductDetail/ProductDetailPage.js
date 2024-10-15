import { useEffect, useState, useRef } from "react";
import "./ProductDetailPage.scss";
import {
  getProductDetailById,
  getSubProduct,
  getProductById,
  getClassifyByProduct,
  getProductDetailImage,
  getSubProductImage,
} from "../../../../services/product";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import { toast } from "react-toastify";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Button as buttonBootstrap } from "react-bootstrap";
import { apiAddCart } from "../../../../services/cartService";
import { useNavigate, useParams } from "react-router-dom";
import ProductRowRandom from "../../../../components/Product/ProductRowRandom/ProductRowRandom";
import ClassifyDetailDiv from "./ClassifyDetailDiv";
const ProductDetailPage = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState({});
  const [subProduct, setSubProduct] = useState([]);
  const [product, setProduct] = useState({});
  const [listTypeClassifyDetail, setListTypeClassifyDetail] = useState({});
  const [propertySelected, setPropertySelected] = useState({});
  const [posts, setPosts] = useState({});
  const [previousPropertySelected, setPreviousPropertySelected] = useState({});
  const [imageList, setImageList] = useState([]);
  const [imageSelected, setImageSelected] = useState("");
  const postPageRef = useRef();
  const [subCategoryId,setSubCategoryId] = useState(null);
  const [outOfStock, setOutOfStock] = useState(false);
  const [dataAddCart, setDataAddCart] = useState({
    userId:
      localStorage.getItem("user") &&
      JSON.parse(localStorage.getItem("user")).id
        ? JSON.parse(localStorage.getItem("user")).id
        : null,
    token:
      localStorage.getItem("user") &&
      JSON.parse(localStorage.getItem("user")).token
        ? JSON.parse(localStorage.getItem("user")).token
        : null,
    currentSubProduct: 1,
    quantity: 1,
  });
  const navigate = useNavigate();
  // useEffect(() => {
  //   getProductDetail();
  //   getProduct();
  //   setSubProduct();
  //   getImages();
  //   setPropertySelected({});
  //   setListTypeClassifyDetail({});
  //   window.scrollTo({ top: "0", behavior: "instant" });
  // }, []);
  useEffect(() => {
    getProduct();
    getProductDetail();
    setSubProduct();
    setPropertySelected({});
    setListTypeClassifyDetail({});
    window.scrollTo({ top: "0", behavior: "instant" });
  }, [id]);
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
  useEffect(() => {
    if (posts) {
      postPageRef.current.innerHTML = posts.content;
    }
  });
  const getProductByPropety = async () => {
    const result = await getSubProductImage(id, listTypeClassifyDetail.mausac);
    console.log(result);
    if (result && result.length > 0) {
      setImageList(result);
    }
  };
  const getImages = async (productDetailId) => {
    const results = await getProductDetailImage(productDetailId);    
    if (results?.length > 0) {
      setImageList(results);
      setImageSelected(results[0].image);
    } else {
      setImageList([]);
      setImageSelected("");
    }
  };
  const getProductDetail = async () => {
    try {
      const result = await getProductDetailById(id);
      if (result) {
        setProductDetail(result);
        getImages(result.id);
        setPosts(result.post);
      }
    } catch (e) {
      toast.error("Đã có lỗi xảy ra!");
      console.log(e);
    }
  };

  const getProduct = async () => {
    try {
      let results = await getProductById(id);
      if (results) {
        setProduct(results);
        setSubCategoryId(results.subCategoryId)
        
      }else{
        navigate("/");
      }
    } catch (e) {
      toast.error("Đã có lỗi xảy ra!");
    }
  };
  const getSubProductFunction = async (list) => {
    const result = await getSubProduct(list, productDetail.id);
    if (result) {
      setSubProduct(result);
      setDataAddCart({ ...dataAddCart, currentSubProduct: result.id });
      setOutOfStock(false);
    } else {
      setOutOfStock(true);
      setSubProduct(product);
    }
  };
  const handleAddCart = async () => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    } else {
      if (dataAddCart.currentSubProduct && dataAddCart.currentSubProduct > 0) {
        const cart = await apiAddCart(dataAddCart);
        if (cart.data.EC === 0) {
          toast("Đã thêm sản phẩm vào giỏ hàng!");
        } else {
          toast("Đã hết hàng!");
        }
      }
    }
  };
  const handleListProerty = async (e, property, index) => {
    const name = e.target.getAttribute("name");
    setListTypeClassifyDetail({
      ...listTypeClassifyDetail,
      [name]: property,
      id: productDetail.id,
    });
    setPropertySelected({ ...propertySelected, [name]: index });
  };


  return (
    product && productDetail && (
      <>
        <div className="row product-detail">
          <div className="col-12 col-md-6">
            <div style={{ position: "sticky", top: 0, padding:"40px" }}>
              <div className="picture">
                <div
                  className="out-of-stock"
                  style={
                    outOfStock ? { display: "block" } : { display: "none" }
                  }
                >
                  <p>Hết hàng</p>
                </div>
                <img
                  style={{
                    width: "80%",
                    backgroundColor: "#F5F5F7",
                    border: "none",
                    textAlign: "center",
                    paddingBottom: 10,
                  }}
                  src={
                    imageSelected === ""
                      ? `${process.env.REACT_APP_LOCALHOST_SERVER}/productImage/default.webp`
                      : productDetail && productDetail.product.sub_category  ? `${process.env.REACT_APP_LOCALHOST_SERVER}/productImage/${productDetail.product.sub_category.name}/${imageSelected}` : ""
                  }
                  className="img-thumbnail"
                  alt="..."
                />
              </div>
              <div className="slick pt-2 pb-5">
                {imageList.map((item, index) => {
                  return (
                    <div
                      className="card-slick "
                      style={imageSelected == item.image ? {border:"3px solid gray"} : {}}
                      onClick={() => {
                        setImageSelected(item.image);
                      }}
                      key={index}
                    >
                      <div className="div-image" >
                        <img
                        className="list-image"
                          style={{
                            position: "absolute",
                            width: 95,
                            height: 95,
                            right: 6,
                            backgroundColor: "#F5F5F7",
                          }}
                          src={
                    productDetail && product && productDetail.product.sub_category
                      ? `${process.env.REACT_APP_LOCALHOST_SERVER}/productImage/${productDetail.product.sub_category.name}/${item.image}`
                      : `${process.env.REACT_APP_LOCALHOST_SERVER}/productImage/default.webp`
                  }
                          alt="mota-ip"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="assess">
              <div className="title">
                {" "}
                {subProduct && subProduct.length !== 0
                  ? subProduct.name
                  : product.name}
              </div>
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
                      ).toLocaleString("VN-vi").replace(/,/g, '.')}
                VNĐ`
                    : `${(
                        product.price -
                        product.price * (product.promotion / 100)
                      ).toLocaleString("VN-vi").replace(/,/g, '.')}
                VNĐ`}
                </span>
              </div>
              <div>
                <span className="promotion">
                  {subProduct && subProduct.price
                    ? `${subProduct.price.toLocaleString("VN-vi").replace(/,/g, '.')}VNĐ`
                    : product.price
                    ? `${product.price.toLocaleString("VN-vi").replace(/,/g, '.')}VNĐ`
                    : 0}
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
                                  ] === index
                                    ? "circle-color circle-color-selected"
                                    : "circle-color"
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
                                  handleListProerty(e, property.id, index);
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
                                  ] === index
                                    ? "card-dl 1 border px-3 pt-2 pb-2 card-dl-selected"
                                    : "card-dl 1 border px-3 pt-2 pb-2 "
                                }
                                style={{ cursor: "pointer" }}
                                name={`${item.name
                                  .normalize("NFD")
                                  .replace(/[\u0300-\u036f]/g, "")
                                  .toLowerCase()
                                  .split(" ")
                                  .join("")}`}
                                onClick={(e) => {
                                  handleListProerty(e, property.id, index);
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
            <Stack marginTop={4} direction="row" spacing={1}>
              <Button
                onClick={handleAddCart}
                variant="contained"
                endIcon={<AddIcon color="success" />}
                disabled={
                  !outOfStock && Object.keys(listTypeClassifyDetail).length > 2
                    ? false
                    : true
                }
              >
                Add
              </Button>
            </Stack>
          </div>
        </div>
        {productDetail.classify && JSON.parse(productDetail.classify) && <ClassifyDetailDiv data = {JSON.parse(productDetail.classify)}/>}
        
        {posts && (
          <>
            <div className="post-page container">
              <div className="content" ref={postPageRef} />
            </div>
          </>
        )}
        {subCategoryId && <ProductRowRandom id={subCategoryId}/>
      
      }
      </>
    )
  );
};
export default ProductDetailPage;
