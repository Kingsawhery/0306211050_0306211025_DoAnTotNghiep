import { useEffect, useState } from "react";
import "./ProductDetail.scss";
import { getProductDetailById, getSubProduct } from "../../../services/product";
import { toast } from "react-toastify";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ProductDetail = (props) => {
  const { id, data } = props;
  const [productDetail, setProductDetail] = useState([]);
  const [subProduct, setSubProduct] = useState([]);
  const localDetail = JSON.parse(localStorage.getItem("detail"));
  const [listTypeClassifyDetail, setListTypeClassifyDetail] = useState({});
  const [propertySelected, setPropertySelected] = useState({});
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    getProductDetail();
    setSubProduct();
    setPropertySelected({});
  setListTypeClassifyDetail({})
  }, [localDetail.id]);
  useEffect(() => {
    if (
      productDetail.type_classifies &&
      Object.keys(listTypeClassifyDetail).length -
        productDetail.type_classifies.length ===
        1
    ) {
      getSubProductFunction(listTypeClassifyDetail);
    }
    console.log(productDetail);

  }, [listTypeClassifyDetail]);
  const getProductDetail = async () => {
    try {
      const result = await getProductDetailById(localDetail.id);
      if (result) {
        setProductDetail(result);
      }
    } catch (e) {
      toast.error("Đã có lỗi xảy ra!");
    }
  };
  const getSubProductFunction = async (list) => {
    const result = await getSubProduct(list, productDetail.id);
    if (result) {
      setSubProduct(result);
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
    console.log(propertySelected);
  };
  return (
    productDetail && (
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
                src="https://shopdunk.com/images/thumbs/0000567_alpine-green_550.png"
                className="img-thumbnail"
                alt="..."
              />
            </div>
            <div className="slick pt-2 pb-5">
              <div className="card-slick ">
                <div className="bg">
                  <img
                    style={{
                      position: "absolute",
                      width: 95,
                      height: 95,
                      right: 6,
                      backgroundColor: "#F5F5F7",
                    }}
                    src="https://shopdunk.com/images/thumbs/0000567_alpine-green_550.png"
                    alt="mota-ip"
                  />
                </div>
              </div>
              <div className="card-slick ">
                <div className="bg">
                  <img
                    style={{
                      position: "absolute",
                      width: 95,
                      height: 95,
                      right: 6,
                    }}
                    src="https://shopdunk.com/images/thumbs/0000568_alpine-green_550.webp"
                    alt="mota-ip"
                  />
                </div>
              </div>
              <div className="card-slick ">
                <div className="bg">
                  <img
                    style={{
                      position: "absolute",
                      width: 95,
                      height: 95,
                      right: 6,
                    }}
                    src="https://shopdunk.com/images/thumbs/0000569_alpine-green_550.webp"
                    alt="mota-ip"
                  />
                </div>
              </div>
              <div className="card-slick ">
                <div className="bg">
                  <img
                    style={{
                      position: "absolute",
                      width: 95,
                      height: 95,
                      right: 6,
                    }}
                    src="https://shopdunk.com/images/thumbs/0000570_alpine-green_550.webp"
                    alt="mota-ip"
                  />
                </div>
              </div>
              <div className="card-slick ">
                <div className="bg">
                  <img
                    style={{
                      position: "absolute",
                      width: 95,
                      height: 95,
                      right: 6,
                    }}
                    src="https://shopdunk.com/images/thumbs/0000571_alpine-green_550.webp"
                    alt="mota-ip"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="assess">
            <div className="title"> {subProduct && subProduct.length !== 0
                  ? subProduct.name : data.name}</div>
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
                      subProduct.price * (data.promotion / 100)
                    ).toLocaleString("VN-vi")}
                VNĐ`
                  : `${(
                      data.price -
                      data.price * (data.promotion / 100)
                    ).toLocaleString("VN-vi")}
                VNĐ`}
              </span>
            </div>
            <div>
              <span className="promotion">
                {data.price.toLocaleString("VN-vi")}VNĐ
              </span>
            </div>
            <div>
              <span className="promotion-percent">-{data.promotion}%</span>
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
                      <div className="circle-color-plus circle-color d-flex">
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ color: "white" }}
                        />
                      </div>
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
export default ProductDetail;
