import { useContext, useEffect, useState } from "react";
import "../Cart/Cart.css";
import axios, { Axios } from "axios";
import {
  apiAddCart,
  apiDeleteCart,
  apiShowCart,
} from "../../services/cartService";
import ProductRowRandom from "../Product/ProductRowRandom/ProductRowRandom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../../App";
import { Form } from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import { TextField, Tooltip } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import {FormControl} from "@mui/material";
import {InputLabel} from "@mui/material";
const Cart = () => {
  const [listProductInCart, setProductInCart] = useState([]);
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const [currentSubProduct, setCurrentSubProduct] = useState(true);
  const {setTotalCart} = useContext(Context)
  const [paymentInfomation,setPaymentInformation] = useState({
    name:user && JSON.parse(user).name ? JSON.parse(user).name : "",
    phone:user && JSON.parse(user).phone ? JSON.parse(user).phone : "",
    email:user && JSON.parse(user).email ? JSON.parse(user).email : "",
    city:"",
    district:"",
    ward:"",
    street:""
  })
  const [address,setAddress] = useState({
    city:[],
    district:[],
    ward:[],
  })
  const [addressPayment,setAddressPayment] = useState({
    city:{
      id:null,
      name:""
    },
    district:{
      id:null,
      name:""
    },
    ward:{
      id:null,
      name:""
    },
  })
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
    getDataCity();
  }, [navigate]);

  useEffect(() => {
    handleGetData();
  }, [currentSubProduct]);
  const getDataCity = async () =>{
    const dataCity = await axios.get(`https://esgoo.net/api-tinhthanh/1/0.htm`);
    setAddress({...address,city:dataCity.data.data})
  }
  const handleGetData = async () => {
    if (JSON.parse(user).id && JSON.parse(user).token) {
      const data = {
        userId: JSON.parse(user).id,
        token: JSON.parse(user).token,
      };
      const dataRs = await apiShowCart(data);
      if (dataRs) {
        setProductInCart(dataRs.data.data);
        setTotalCart(dataRs.data.total)
      }
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
      }
    } catch (e) {
      toast.dismiss();
      toast.error("Đã có lỗi xảy ra!");
    }
  };
  const hanldeSetValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPaymentInformation({ ...paymentInfomation, [name]: value });
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
      }
    } catch (e) {
      toast.dismiss();
      toast.error("Đã có lỗi xảy ra!");
    }
  };

  const totalAmount = listProductInCart.reduce(
    (total, item) => total + item.price,
    0
  );

  return (
    <div className="main">
      <div className="container">
        <div className="row d-flex">
          <div className="col-8 mt-3">
            <div className="div-cart">
              {listProductInCart.length > 0 ? (
                listProductInCart.map((item) => (
                  <div className="card-cart" key={item.sub_productId}>
                    <img
                      src={
                        item.sub_product.product_detail.product_detail_images.length > 0 ? `${process.env.REACT_APP_LOCALHOST_SERVER}/productImage/${item.sub_product.product_detail.product.sub_category
.name}/${item.sub_product.image}`
                          : item.sub_product.product_detail.product_detail_images.image &&  item.sub_product.product_detail.product_detail_images.length > 0 ? `${process.env.REACT_APP_LOCALHOST_SERVER}/productImage/${item.sub_product.product_detail.product.sub_category.name}/${item.sub_product.product_detail.product_detail_images[0]?.image}`
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
                      <span className="price">{item.sub_product.price.toLocaleString("VN-vi").replace(/,/g, '.')} VNĐ</span>
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
            <div className="abate">
              <h3>Thông tin thanh toán</h3>
              <p className="text-content-login">
                Đăng nhập ngay để nhận được “điểm thưởng” hấp dẫn khi mua hàng
                thành công.
              </p>
              <button className="btn-login-abate" onClick={()=>{
                console.log({
                  name: paymentInfomation.name ,
    phone: paymentInfomation.phone ,
    email: paymentInfomation.email ,
    address: paymentInfomation.street + ", "  + paymentInfomation.ward + ", " + paymentInfomation.district + ", " + paymentInfomation.city
                })
              }}>Đăng nhập ngay</button>
            </div>
          </div>
          {listProductInCart.length > 0 && <div className="col-4">
            <div className="invoice">
              <h2>HÓA ĐƠN</h2>
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
                    {listProductInCart.map((item) => (
                      <tr key={item.sub_productId}>
                        <td>{item.sub_product.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.sub_product.price.toLocaleString("VN-vi").replace(/,/g, '.')} VNĐ</td>
                        <td>
                          {(item.sub_product.price * item.quantity).toLocaleString("VN-vi").replace(/,/g, '.')}{" "}
                          VNĐ
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="invoice-footer">
                <h3>Tổng cộng: {totalAmount.toLocaleString("VN-vi").replace(/,/g, '.')} VNĐ</h3>
              </div>
            </div>
            <div className="invoice payment-information">
            <h2>Thông tin thanh toán</h2>
            <Row className="mb-3">

  <Row className="mt-3">
    <Col xs={12}> {/* Cột thứ hai không cần margin */}
    <Tooltip title={paymentInfomation.email}>
         <TextField name="name" onChange={hanldeSetValue} value={paymentInfomation.name} id="standard-basic-1" label="Họ và tên" variant="outlined" fullWidth />

    </Tooltip>
    </Col>
  </Row>
  <Row className="mt-3">
  <Col xs={6}> {/* Cột thứ hai không cần margin */}
  <TextField name="phone" onChange={hanldeSetValue} value={paymentInfomation.phone} id="standard-basic-1" label="Số điện thoại" variant="outlined" fullWidth />
  </Col>
    <Col xs={6}> {/* Cột thứ hai không cần margin */}
    <Tooltip title={paymentInfomation.email}>
    <TextField name="email" onChange={hanldeSetValue} value={paymentInfomation.email} id="standard-basic-1" label="Email" variant="outlined" fullWidth />
    </Tooltip>
    </Col>
  </Row>
  <Row className="mt-3">
  <Col xs={12}> {/* Cột thứ hai không cần margin */}
  <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Thành Phố</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={addressPayment.city.name}
          label="Thành Phố"
          onChange={hanldeSetValue}
          name="city"
        >
          {address.city && address.city.length > 0 && address.city.map((item, index) => {
  return (
    <MenuItem key={index} value={item.name} onClick={async()=>{
      setAddressPayment({...addressPayment,city:{
        id:item.id,
        name:item.name
      }})
      const dataDistrict = await axios.get(`https://esgoo.net/api-tinhthanh/2/${item.id ? item.id : 1 }.htm`);
    setAddress({...address,district:dataDistrict.data.data})
    }}> {/* Sử dụng item.id hoặc thuộc tính duy nhất khác */}
      {item.name} {/* Thay thế bằng thuộc tính thích hợp của item */}
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
        <InputLabel id="demo-simple-select-label">Quận/Huyện</InputLabel>
        <Select
                disabled={addressPayment.city.name == "" ? true : false}

          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={addressPayment.district.name}
          label="Quận Huyện"
          onChange={hanldeSetValue}
          name="district"
        
        >
          {address.district && address.district.length > 0 && address.district.map((item, index) => {
  return (
    <MenuItem key={index} value={item.name} onClick={async()=>{
      
      setAddressPayment({...addressPayment,district:{
        id:item.id,
        name:item.name
      }})
      const dataWard = await axios.get(`https://esgoo.net/api-tinhthanh/3/${item.id ? item.id : 1 }.htm`);
    setAddress({...address,ward:dataWard.data.data})
    }}> {/* Sử dụng item.id hoặc thuộc tính duy nhất khác */}
      {item.name} {/* Thay thế bằng thuộc tính thích hợp của item */}
    </MenuItem>
  );
})}
        </Select>
      </FormControl>
    </Box>
    </Col>
  <Col xs={6}> {/* Cột thứ hai không cần margin */}
  <Tooltip title={addressPayment.ward.name ? addressPayment.ward.name : ""}>
  <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Phường/Xã</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          disabled={addressPayment.district.name == "" ? true : false}

          value={addressPayment.ward.name}
          label="Phường/Xã"
          onChange={hanldeSetValue}
          name="ward"
        >
          {address.ward && address.ward.length > 0 && address.ward.map((item, index) => {
  return (
    <MenuItem key={index} value={item.name} onClick={async()=>{
      setAddressPayment({...addressPayment,ward:{
        id:item.id,
        name:item.name
      }})

    }}> {/* Sử dụng item.id hoặc thuộc tính duy nhất khác */}
      {item.name} {/* Thay thế bằng thuộc tính thích hợp của item */}
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
  <Col xs={12} > 
  <Tooltip title={paymentInfomation.email}>
    <TextField           disabled={addressPayment.ward.name == "" ? true : false}
 name="street" onChange={hanldeSetValue} value={paymentInfomation.street} id="standard-basic-1" label="Đường" variant="outlined" fullWidth />
    </Tooltip>
    </Col>
  </Row>
</Row>
            </div>
          </div>}
          
        </div>
      </div>
    </div>
  );
};

export default Cart;
