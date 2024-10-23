import { useContext, useEffect, useState } from "react";
import "../Cart/Cart.css";
import axios, { Axios } from "axios";
import {
  apiAddCart,
  apiDeleteCart,
  apiShowCart,
  changeStatus,
} from "../../services/cartService";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProductRowRandom from "../Product/ProductRowRandom/ProductRowRandom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../../App";
import { Form } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Button, FormGroup, TextField, Tooltip } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import _ from "lodash";
import { getPromotion } from "../../services/product";
import { PacmanLoader } from "react-spinners";
import { createInvoice } from "../../services/invoiceService";
const Cart = () => {
  const [listProductInCart, setProductInCart] = useState([]);
  const [promotionInfor, setPromotionInfor] = useState({});
  const [listProductInPromotion, setProductInPromotion] = useState([]);
  const [totalPromotion, setTotalPromotion] = useState(0);
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const [currentSubProduct, setCurrentSubProduct] = useState(true);
  const { setTotalCart } = useContext(Context);
  const [paymentInformation, setPaymentInformation] = useState({
    name: user && JSON.parse(user).name ? JSON.parse(user).name : "",
    phone: user && JSON.parse(user).phone ? JSON.parse(user).phone : "",
    email: user && JSON.parse(user).email ? JSON.parse(user).email : "",
    token:user && JSON.parse(user).token ? JSON.parse(user).token : "",
    id:user && JSON.parse(user).id ? JSON.parse(user).id : "",
    city: "",
    district: "",
    ward: "",
    street: "",
    promotion: {
      name: "",
      status: false,
      percent: 0,
    },
    option: 0,
    data:[]
  });
  const [loadingPage,setLoadingPage] = useState(true);
  const [address, setAddress] = useState({
    city: [],
    district: [],
    ward: [],
  });
  const [addressPayment, setAddressPayment] = useState({
    city: {
      id: null,
      name: "",
    },
    district: {
      id: null,
      name: "",
    },
    ward: {
      id: null,
      name: "",
    },
  });
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
    getDataCity();
  }, [navigate]);

  useEffect(() => {
    handleGetData();
  }, [currentSubProduct]);
  const getDataCity = async () => {
    const dataCity = await axios.get(`https://esgoo.net/api-tinhthanh/1/0.htm`);
    setAddress({ ...address, city: dataCity.data.data });
  };
  const handlePromotion = _.debounce(async (e) => {
    if (
      paymentInformation.promotion &&
      paymentInformation.promotion.name !== ""
    ) {
      const promotion = await getPromotion(paymentInformation.promotion.name);
      if (promotion) {
        setPaymentInformation({
          ...paymentInformation,
          promotion: {
            name: promotion.code,
            status: true,
            percent: promotion.percent,
          },
        });
        setPromotionInfor(promotion);
        if (promotion) {
          let newTotalPromotion = 0;

          listProductInCart.map((item) => {
            if (promotion.products.length > 0) {
              for (let i = 0; i < promotion.products.length; i++) {
                if (item.status) {
                  if (
                    promotion.products.length > 0 &&
                    item.sub_product.product_detail.productId ===
                      promotion.products[i].id
                  ) {
                    newTotalPromotion +=
                      (item.sub_product.price *
                        item.quantity *
                        (100 - promotion.percent)) /
                      100;
                  } else {
                    newTotalPromotion +=
                      (item.sub_product.price *
                        item.quantity)
                  }
                }
              }
            } else {
              newTotalPromotion += item.sub_product.price * item.quantity;
            }

            // Nếu không tìm thấy sản phẩm trong khuyến mãi thì cộng giá gốc

            setTotalPromotion(newTotalPromotion); // Cập nhật giá trị sau khi đã tính xong
          });
        }

        setProductInPromotion(promotion.products);
      } else {
        setPaymentInformation({
          ...paymentInformation,
          promotion: {
            name: e.target.value,
            status: false,
            percent: 0,
          },
        });
      }
    }
  }, 1000);

  const handleGetData = async () => {
    try {
      if (JSON.parse(user).id && JSON.parse(user).token) {
        // setLoadingPage(true);
        const data = {
          userId: JSON.parse(user).id,
          token: JSON.parse(user).token,
        };
        const dataRs = await apiShowCart(data);
        if (dataRs) {
          setProductInCart(dataRs.data.data);
          setTotalCart(dataRs.data.total);
          setPaymentInformation({...paymentInformation,data:dataRs.data.data.filter(item => item.status === true)})
          // setLoadingPage(false);
        }
      }
    } catch (e) {
      localStorage.clear();
      window.location.reload();
    }
  };
  const handleChangeStatus = async (id) => {
    const rs = await changeStatus({
      userId: JSON.parse(user).id,
      token: JSON.parse(user).token,
      currentSubProduct: id,
    });
    if (rs) {
      handleGetData();
      setPaymentInformation({
        ...paymentInformation,
        promotion: {
          name: "",
          status: false,
          percent: 0,
        },
      });
    }
  };
  const handleAddCart = async (id) => {
    const rs = await apiAddCart({
      userId: JSON.parse(user).id,
      token: JSON.parse(user).token,
      currentSubProduct: id,
      quantity: 1,
    });
    if (rs.data) {
      setCurrentSubProduct(!currentSubProduct);
      setPaymentInformation({
        ...paymentInformation,
        promotion: {
          name: "",
          status: false,
          percent: 0,
        },
      });
    }
  };
  const handleCreateInvoice = async () => {
    if(paymentInformation.name !== "" && 
      paymentInformation.phonee !== "" && 
      paymentInformation.email !== "" && 
      paymentInformation.token !== "" && 
      paymentInformation.id !== "" &&
      paymentInformation.city !== "" &&
      paymentInformation.ward !== "" &&
      paymentInformation.district !== "" &&
      paymentInformation.street !== ""
    ) {
      const rs = await createInvoice({
        name: paymentInformation.name,     
        phone: paymentInformation.phone ,
        email: paymentInformation.email,
        token: paymentInformation.token,
        id: paymentInformation.id ,
        address: paymentInformation.street + ", " + paymentInformation.district + ", " + paymentInformation.ward + " ," + paymentInformation.city + ".",
        promotion: paymentInformation.promotion,
        option: paymentInformation.option,
        data:paymentInformation.data
      });
      if (rs) {
        console.log(rs);   
    }
    }else{
      console.log("No");   

    }
  
    
  };
  
  const handleDestroyCart = async (id) => {
    try {
      const rs = await apiDeleteCart({
        userId: JSON.parse(user).id,
        token: JSON.parse(user).token,
        currentSubProduct: id,
      });
      if (rs.data) {
        setCurrentSubProduct(!currentSubProduct);
        setPaymentInformation({
          ...paymentInformation,
          promotion: {
            name: "",
            status: false,
            percent: 0,
          },
        });
      }
    } catch (e) {
      toast.dismiss();
      console.log(e);

      toast.error("Đã có lỗi xảy ra!");
    }
  };
  const hanldeSetValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPaymentInformation({ ...paymentInformation, [name]: value });
  };
  const handleMinusCart = async (id) => {
    try {
      const rs = await apiAddCart({
        userId: JSON.parse(user).id,
        token: JSON.parse(user).token,
        currentSubProduct: id,
        quantity: -1,
      });
      if (rs.data) {
        setCurrentSubProduct(!currentSubProduct);
        setPaymentInformation({
          ...paymentInformation,
          promotion: {
            name: "",
            status: false,
            percent: 0,
          },
        });
      }
    } catch (e) {
      console.log();

      toast.dismiss();
      toast.error("Đã có lỗi xảy ra!");
    }
  };

  const totalAmount = listProductInCart.reduce(
    (total, item) => (item.status ? total + item.price : total),
    0
  );
  return (
    // !loadingPage ? (
    <div className="main">
      <div className="container">
        <div className="row d-flex">
          <div className="col-8 mt-3">
            <div className="div-cart">
              {listProductInCart.length > 0 ? (
                listProductInCart.map((item) => (
                  <div
                    className="card-cart"
                    key={item.sub_productId}
                    onClick={() => {
                      console.log(item);
                    }}
                    style={item.status ? { position: "relative", backgroundColor:"#e0e0e0" } : { position: "relative" }}
                  >
                    <Form.Check
                      checked={item.status}
                      onChange={() => handleChangeStatus(item.sub_productId)}
                      className="cart-check"
                      style={{ position: "absolute", top:"12px" , right:"24px"}}
                    />
                    <img
                      src={
                        item.sub_product.product_detail.product_detail_images
                          .length > 0
                          ? `${process.env.REACT_APP_LOCALHOST_SERVER}/productImage/${item.sub_product.product_detail.product.sub_category.name}/${item.sub_product.image}`
                          : item.sub_product.product_detail
                              .product_detail_images.image &&
                            item.sub_product.product_detail
                              .product_detail_images.length > 0
                          ? `${process.env.REACT_APP_LOCALHOST_SERVER}/productImage/${item.sub_product.product_detail.product.sub_category.name}/${item.sub_product.product_detail.product_detail_images[0]?.image}`
                          : `${process.env.REACT_APP_LOCALHOST_SERVER}/productImage/default.webp`
                        // : `${process.env.REACT_APP_LOCALHOST_SERVER}/productImage/default.webp`
                      }
                      alt={item.sub_product.name}
                    />
                    <div className="information">
                      <h4 className="name">{item.sub_product.name}</h4>
                      <p className="invoide-color m-0">
                        Phân loại:{" "}
                        {item.sub_product.type_classify_details.map(
                          (type) => ` ${type.name}`
                        )}
                      </p>
                      <span className="d-flex align-items-center">
                        {item.sub_product.price
                          .toLocaleString("VN-vi")
                          .replace(/,/g, ".")}{" "}
                        VNĐ
                      </span>

                      <div className="quantity">
                        <i
                          className="fas fa-minus"
                          onClick={() => handleMinusCart(item.sub_productId)}
                        ></i>
                        <strong>{item.quantity}</strong>
                        <i
                          className="fas fa-plus"
                          onClick={() => handleAddCart(item.sub_productId)}
                        ></i>
                        <i
                          className="fas fa-trash"
                          onClick={() => handleDestroyCart(item.sub_productId)}
                        ></i>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-cart">
                  <img src="/assets/Daco_5212497.png" alt="No cart" />
                </div>
              )}
            </div>
            <div className="all-product-detail">
              <h3>Gợi ý phụ kiện đi kèm</h3>
              <ProductRowRandom />
            </div>
          </div>
          {listProductInCart.length > 0 && (
            <div className="col-4">
              <div className="invoice">
                <h2>HÓA ĐƠN</h2>
                <Col style={{ display: "flex", position: "relative" }} xs={12}>
                  <Tooltip title={paymentInformation.promotion.name}>
                    <TextField
                      name="promotion"
                      // disabled={listProductInCart.find(item=>item.status===true)}
                      onChange={(e) => {
                        setPaymentInformation({
                          ...paymentInformation,
                          promotion: {
                            name: e.target.value,
                            status: false,
                            percent: 100,
                          },
                        });
                      }}
                      value={paymentInformation.promotion.name}
                      id="standard-basic-1"
                      label="Mã khuyến mãi"
                      variant="outlined"
                      fullWidth
                    />
                  </Tooltip>
                  <ArrowForwardIosIcon
                    className="button-apply-promotion"
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      right: "8px",
                      top: "15px",
                    }}
                    onClick={handlePromotion}
                  />
                </Col>
                <p>Mã hóa đơn: #12345</p>
                <p>Ngày: {new Date().toLocaleDateString()}</p>
                <div className="invoice-body">
                  <table>
                    <thead>
                      <tr>
                        <th>Sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Tổng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listProductInCart.map(
                        (item) =>
                          item.status && (
                            <tr key={item.sub_productId}>
                              <td>{item.sub_product.name}</td>
                              <td>{item.quantity}</td>
                              <td>
                                <p>
                                  {item.sub_product.price
                                    .toLocaleString("VN-vi")
                                    .replace(/,/g, ".")}{" "}
                                  VNĐ
                                </p>
                                {paymentInformation.promotion.status &&
                                listProductInPromotion.find(
                                  (i) =>
                                    i.id ==
                                    item.sub_product.product_detail.productId
                                ) ? (
                                  <>
                                    <p
                                      style={{
                                        fontSize: "15px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Giá khuyến mãi
                                    </p>
                                    <p>
                                      {paymentInformation.promotion.status &&
                                      paymentInformation.promotion.percent >
                                        0 &&
                                      paymentInformation.promotion.percent <=
                                        100
                                        ? `${(
                                            (item.sub_product.price *
                                              (100 -
                                                paymentInformation.promotion
                                                  .percent)) /
                                            100
                                          )
                                            .toLocaleString("vi-VN")
                                            .replace(/,/g, ".")} VNĐ`
                                        : " "}
                                    </p>
                                  </>
                                ) : (
                                  ""
                                )}
                              </td>

                              <td>
                                {paymentInformation.promotion.status &&
                                listProductInPromotion.find(
                                  (i) =>
                                    i.id ==
                                    item.sub_product.product_detail.productId
                                ) ? (
                                  <>
                                    <p>
                                      {paymentInformation.promotion.percent >
                                        0 &&
                                      paymentInformation.promotion.percent <=
                                        100
                                        ? `${(
                                            (item.sub_product.price *
                                              item.quantity *
                                              (100 -
                                                paymentInformation.promotion
                                                  .percent)) /
                                            100
                                          )
                                            .toLocaleString("vi-VN")
                                            .replace(/,/g, ".")} VNĐ`
                                        : " "}
                                    </p>
                                  </>
                                ) : (
                                  (item.sub_product.price * item.quantity)
                                    .toLocaleString("VN-vi")
                                    .replace(/,/g, ".")
                                )}
                              </td>
                            </tr>
                          )
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="invoice-footer">
                  <h3>
                    Tổng cộng:{" "}
                    {paymentInformation.promotion.status
                      ? `${totalPromotion
                          .toLocaleString("VN-vi")
                          .replace(/,/g, ".")}`
                      : `${totalAmount
                          .toLocaleString("VN-vi")
                          .replace(/,/g, ".")}`}{" "}
                    VNĐ
                  </h3>
                </div>
              </div>
              <div className="invoice payment-information">
                <h2>Thông tin thanh toán</h2>
                <Row className="mb-3">
                  <Row className="mt-3">
                    <Col xs={12}>
                      <Tooltip title={paymentInformation.name}>
                        <TextField
                          name="name"
                          onChange={hanldeSetValue}
                          value={paymentInformation.name}
                          id="standard-basic-1"
                          label="Họ và tên"
                          variant="outlined"
                          fullWidth
                        />
                      </Tooltip>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col xs={6}>
                      <TextField
                        name="phone"
                        onChange={hanldeSetValue}
                        value={paymentInformation.phone}
                        id="standard-basic-1"
                        label="Số điện thoại"
                        variant="outlined"
                        fullWidth
                      />
                    </Col>
                    <Col xs={6}>
                      <Tooltip title={paymentInformation.email}>
                        <TextField
                          name="email"
                          onChange={hanldeSetValue}
                          value={paymentInformation.email}
                          id="standard-basic-1"
                          label="Email"
                          variant="outlined"
                          fullWidth
                        />
                      </Tooltip>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col xs={12}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Thành Phố
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={addressPayment.city.name}
                            label="Thành Phố"
                            onChange={hanldeSetValue}
                            name="city"
                          >
                            {address.city &&
                              address.city.length > 0 &&
                              address.city.map((item, index) => {
                                return (
                                  <MenuItem
                                    key={index}
                                    value={item.name}
                                    onClick={async () => {
                                      setAddressPayment({
                                        ...addressPayment,
                                        city: {
                                          id: item.id,
                                          name: item.name,
                                        },
                                      });
                                      const dataDistrict = await axios.get(
                                        `https://esgoo.net/api-tinhthanh/2/${
                                          item.id ? item.id : 1
                                        }.htm`
                                      );
                                      setAddress({
                                        ...address,
                                        district: dataDistrict.data.data,
                                      });
                                    }}
                                  >
                                    {" "}
                                    {/* Sử dụng item.id hoặc thuộc tính duy nhất khác */}
                                    {item.name}{" "}
                                    {/* Thay thế bằng thuộc tính thích hợp của item */}
                                  </MenuItem>
                                );
                              })}
                          </Select>
                        </FormControl>
                      </Box>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col xs={6}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Quận/Huyện
                          </InputLabel>
                          <Select
                            disabled={
                              addressPayment.city.name == "" ? true : false
                            }
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={addressPayment.district.name}
                            label="Quận Huyện"
                            onChange={hanldeSetValue}
                            name="district"
                          >
                            {address.district &&
                              address.district.length > 0 &&
                              address.district.map((item, index) => {
                                return (
                                  <MenuItem
                                    key={index}
                                    value={item.name}
                                    onClick={async () => {
                                      setAddressPayment({
                                        ...addressPayment,
                                        district: {
                                          id: item.id,
                                          name: item.name,
                                        },
                                      });
                                      const dataWard = await axios.get(
                                        `https://esgoo.net/api-tinhthanh/3/${
                                          item.id ? item.id : 1
                                        }.htm`
                                      );
                                      setAddress({
                                        ...address,
                                        ward: dataWard.data.data,
                                      });
                                    }}
                                  >
                                    {" "}
                                    {/* Sử dụng item.id hoặc thuộc tính duy nhất khác */}
                                    {item.name}{" "}
                                    {/* Thay thế bằng thuộc tính thích hợp của item */}
                                  </MenuItem>
                                );
                              })}
                          </Select>
                        </FormControl>
                      </Box>
                    </Col>
                    <Col xs={6}>
                      <Tooltip
                        title={
                          addressPayment.ward.name
                            ? addressPayment.ward.name
                            : ""
                        }
                      >
                        <Box sx={{ minWidth: 120 }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Phường/Xã
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              disabled={
                                addressPayment.district.name == ""
                                  ? true
                                  : false
                              }
                              value={addressPayment.ward.name}
                              label="Phường/Xã"
                              onChange={hanldeSetValue}
                              name="ward"
                            >
                              {address.ward &&
                                address.ward.length > 0 &&
                                address.ward.map((item, index) => {
                                  return (
                                    <MenuItem
                                      key={index}
                                      value={item.name}
                                      onClick={async () => {
                                        setAddressPayment({
                                          ...addressPayment,
                                          ward: {
                                            id: item.id,
                                            name: item.name,
                                          },
                                        });
                                      }}
                                    >
                                      {" "}
                                      {/* Sử dụng item.id hoặc thuộc tính duy nhất khác */}
                                      {item.name}{" "}
                                      {/* Thay thế bằng thuộc tính thích hợp của item */}
                                    </MenuItem>
                                  );
                                })}
                            </Select>
                          </FormControl>
                        </Box>
                      </Tooltip>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col xs={12}>
                      <Tooltip title={paymentInformation.email}>
                        <TextField
                          disabled={
                            addressPayment.ward.name == "" ? true : false
                          }
                          name="street"
                          onChange={hanldeSetValue}
                          value={paymentInformation.street}
                          id="standard-basic-1"
                          label="Đường"
                          variant="outlined"
                          fullWidth
                        />
                      </Tooltip>
                    </Col>
                  </Row>
                </Row>
                <Row className="mt-3">
                  <Col xs={6}>
                    <Form.Check
                      type="radio"
                      checked={paymentInformation.option === 0}
                      onChange={() =>
                        setPaymentInformation({
                          ...paymentInformation,
                          option: 0,
                        })
                      }
                      value={paymentInformation.option}
                      label={"Thanh Toán Online"}
                    />
                  </Col>
                  <Col xs={6}>
                    <Form.Check
                      type="radio"
                      checked={paymentInformation.option === 1}
                      onChange={() =>
                        setPaymentInformation({
                          ...paymentInformation,
                          option: 1,
                        })
                      }
                      label={"Thanh Toán Tại Cửa Hàng"}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col xs={12} className="d-flex justify-content-end">
                    <Button
                      style={{backgroundColor:"#0d6efe",color:"#fff"}}
                      variant="secondary"
                      onClick={handleCreateInvoice}
                    >
                      Thanh Toán
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ) 
  // : <PacmanLoader/>
  // );
};

export default Cart;
