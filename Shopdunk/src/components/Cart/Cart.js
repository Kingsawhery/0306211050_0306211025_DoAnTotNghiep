import { useEffect, useState } from "react";
import "../Cart/Cart.css";
import axios from "axios";
import { apiShowCart } from "../../services/cartService";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const [listProductInCart, setProductInCart] = useState([]);
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  });
  useEffect(() => {
    handleGetData();
  }, []);
  const handleGetData = async () => {
    if (JSON.parse(user).id && JSON.parse(user).token) {
      const data = {
        userId: JSON.parse(user).id,
        token: JSON.parse(user).token,
      };
      const dataRs = await apiShowCart(data);
      console.log(dataRs);
      if (dataRs) {
        setProductInCart(dataRs.data);
      }
    }
  };
  return (
    <>
      <div className="main">
        <div className="container">
          <div className="row d-flex">
            <div className="col-8 mt-3 ">
              <div className="invoide">
                <div className="invoide-card">
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th>Hình ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá bán</th>
                        <th>Số lượng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listProductInCart &&
                        listProductInCart.length > 0 &&
                        listProductInCart.map((item, index) => {
                          return (
                            <tr>
                              <td>
                                <img
                                  // `${process.env.REACT_APP_LOCALHOST_SERVER}/productImage/default.webp`
                                  src={
                                    item.sub_product.product_detail
                                      .product_detail_images[0].image
                                      ? `${process.env.REACT_APP_LOCALHOST_SERVER}/productImage/${item.sub_product.product_detail.product.sub_category.name}/${item.sub_product.product_detail.product_detail_images[0].image}`
                                      : `${process.env.REACT_APP_LOCALHOST_SERVER}/productImage/default.webp`
                                  }
                                  alt="iPhone 15"
                                />
                              </td>
                              <td>
                                <div className="name">
                                  <strong>{item.sub_product.name}</strong>
                                  <p className="invoide-color m-0">
                                    Phân loại:{" "}
                                    {item.sub_product.type_classify_details.map(
                                      (item, index) => " " + item.name
                                    )}
                                  </p>
                                  <a className="text-primary" href="">
                                    Sửa
                                  </a>
                                </div>
                              </td>
                              <td>
                                <span>
                                  {item.price
                                    ? item.price.toLocaleString("VN-vi")
                                    : 0}
                                  VNĐ
                                </span>
                              </td>
                              <td>
                                <div className="quantity">
                                  <i className="fas fa-minus"></i>
                                  <input
                                    className="input_quantity"
                                    name="number-quantity"
                                    type="text"
                                    value="4"
                                  />
                                  <i className="fas fa-plus"></i>
                                  <i className="fas fa-trash"></i>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                <div className="option d-flex">
                  <div className="invoid-btn">Cặp nhật giỏ hàng</div>
                  <div className="invoid-btn">Tiếp tục mua sắm</div>
                </div>
              </div>
              {/* <!--ALL Product--> */}
              <div className="all-product-detail">
                <div className="all-product-detail-title pt-3 pb-3">
                  <h3>Gợi ý phụ kiện đi kèm </h3>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="product-detail">
                      <div className="card-product-detail">
                        <div className="content">
                          <div>
                            <img
                              className="img-card"
                              src="https://shopdunk.com/images/thumbs/0019158_cuong-luc-apple-iphone-15-series-zeelot-solidleek_240.jpeg"
                              alt="Hinh card dien thoai"
                            />
                          </div>
                          <div className="body-content">
                            <div>
                              <a href="">
                                Cường lực Apple iPhone 15 series Zeelot
                                Solidleek
                              </a>
                            </div>
                            <div className="content-card-price d-flex">
                              <div>
                                <span className="content-card-price-no-promotion fw-bold">
                                  390.000đ
                                </span>
                              </div>
                              <div>
                                <span className="content-card-price-promotion">
                                  450.000đ
                                </span>
                              </div>
                            </div>
                            <div className="content-card-btn">
                              <button className="content-card-btn-buy">
                                Mua ngay
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!--card2--> */}
                  <div className="col">
                    <div className="product-detail">
                      <div className="card-product-detail">
                        <div className="content">
                          <div>
                            <img
                              className="img-card"
                              src="https://shopdunk.com/images/thumbs/0021877_cuong-luc-camera-uniq-optix-for-iphone-15-iphone-15-plus_240.jpeg"
                              alt="Hinh card dien thoai"
                            />
                          </div>
                          <div className="body-content">
                            <div>
                              <a href="">
                                Cường lực Camera UNIQ OPTIX for iPhone 15 /
                                iPhone 15 Plus
                              </a>
                            </div>
                            <div className="content-card-price d-flex">
                              <div>
                                <span className="content-card-price-no-promotion fw-bold">
                                  350.000đ
                                </span>
                              </div>
                              <div>
                                <span className="content-card-price-promotion">
                                  400.000đ
                                </span>
                              </div>
                            </div>
                            <div className="content-card-btn">
                              <button className="content-card-btn-buy">
                                Mua ngay
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!--card3--> */}
                  <div className="col">
                    <div className="product-detail">
                      <div className="card-product-detail">
                        <div className="content">
                          <div>
                            <img
                              className="img-card"
                              src="https://shopdunk.com/images/thumbs/0019158_cuong-luc-apple-iphone-15-series-zeelot-solidleek_240.jpeg"
                              alt="Hinh card dien thoai"
                            />
                          </div>
                          <div className="body-content">
                            <div>
                              <a href="">
                                Cường lực Apple iPhone 15 series Zeelot
                                Solidleek
                              </a>
                            </div>
                            <div className="content-card-price d-flex">
                              <div>
                                <span className="content-card-price-no-promotion fw-bold">
                                  390.000đ
                                </span>
                              </div>
                              <div>
                                <span className="content-card-price-promotion">
                                  450.000đ
                                </span>
                              </div>
                            </div>
                            <div className="content-card-btn">
                              <button className="content-card-btn-buy">
                                Mua ngay
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!--card4--> */}
                  <div className="col">
                    <div className="product-detail">
                      <div className="card-product-detail">
                        <div className="content">
                          <div>
                            <img
                              className="img-card"
                              src="https://shopdunk.com/images/thumbs/0019158_cuong-luc-apple-iphone-15-series-zeelot-solidleek_240.jpeg"
                              alt="Hinh card dien thoai"
                            />
                          </div>
                          <div className="body-content">
                            <div>
                              <a href="">
                                Cường lực Apple iPhone 15 series Zeelot
                                Solidleek
                              </a>
                            </div>
                            <div className="content-card-price d-flex">
                              <div>
                                <span className="content-card-price-no-promotion fw-bold">
                                  390.000đ
                                </span>
                              </div>
                              <div>
                                <span className="content-card-price-promotion">
                                  450.000đ
                                </span>
                              </div>
                            </div>
                            <div className="content-card-btn">
                              <button className="content-card-btn-buy">
                                Mua ngay
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!--Form thanh toán--> */}
              <div className="abate">
                <div className="information-abate">
                  <h3>Thông tin thanh toán</h3>
                </div>
                <div className="login-abate">
                  <div className="content-login-abate d-flex">
                    <p className="text-content-login">
                      Đăng nhập ngay để nhận được “điểm thưởng” hấp dẫn khi mua
                      hàng thành công <br /> các sản phẩm tại ShopDunk
                    </p>
                    <button className="btn-login-abate">Đăng nhập ngay</button>
                  </div>
                </div>
              </div>
              {/* <!--Register Abate--> */}
              <div className="register-abate mt-3 mb-3">
                <div className="form-register-abate p-3">
                  <input
                    className="register-name"
                    type="text"
                    placeholder="Tên"
                  />
                  <div className="d-flex">
                    <input
                      className="register-phone mt-4 mb-4"
                      type="text"
                      placeholder="Số điện thoại"
                    />
                    <input
                      className="register-email mt-4 mb-4"
                      type="text"
                      placeholder="Email"
                    />
                  </div>
                  <div className="title-ship">Hình thức nhận hàng</div>
                  <div className="choose-ship d-flex mt-2">
                    <div className="ship-shop">
                      <input
                        className="radio-shop"
                        type="radio"
                        checked="checked"
                        name="radio"
                      />
                      <span className="checkmark"></span>
                      Nhận tại cửa hàng
                    </div>
                    <div className="ship-home">
                      <input
                        className="radio-home"
                        type="radio"
                        checked="checked"
                        name="radio"
                      />
                      <span className="checkmark"></span>
                      Giao hàng tận nơi
                    </div>
                  </div>
                  <div className="choose-addres ">
                    <div className="d-flex">
                      <div className="mt-3">
                        Tỉnh, thành phố: <br />
                        <select className="select-choose-addres-city">
                          <option value="0">Chọn tỉnh, thành phố</option>
                          <option value="1">Audi</option>
                          <option value="2">BMW</option>
                          <option value="3">Citroen</option>
                          <option value="4">Ford</option>
                          <option value="5">Honda</option>
                          <option value="6">Jaguar</option>
                          <option value="7">Land Rover</option>
                          <option value="8">Mercedes</option>
                          <option value="9">Mini</option>
                          <option value="10">Nissan</option>
                          <option value="11">Toyota</option>
                          <option value="12">Volvo</option>
                        </select>
                      </div>
                      <div className="mt-3">
                        Quận, Huyện <br />
                        <select className="select-choose-addres-district">
                          <option value="0"></option>
                          <option value="1">Audi</option>
                          <option value="2">BMW</option>
                          <option value="3">Citroen</option>
                          <option value="4">Ford</option>
                          <option value="5">Honda</option>
                          <option value="6">Jaguar</option>
                          <option value="7">Land Rover</option>
                          <option value="8">Mercedes</option>
                          <option value="9">Mini</option>
                          <option value="10">Nissan</option>
                          <option value="11">Toyota</option>
                          <option value="12">Volvo</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-3">
                      <select className="all-addres">
                        <option value="0"></option>
                        <option value="1">Audi</option>
                        <option value="2">BMW</option>
                        <option value="3">Citroen</option>
                        <option value="4">Ford</option>
                        <option value="5">Honda</option>
                        <option value="6">Jaguar</option>
                        <option value="7">Land Rover</option>
                        <option value="8">Mercedes</option>
                        <option value="9">Mini</option>
                        <option value="10">Nissan</option>
                        <option value="11">Toyota</option>
                        <option value="12">Volvo</option>
                      </select>
                    </div>
                  </div>
                  <div className="clause d-flex">
                    <input
                      className="checkbox"
                      type="checkbox"
                      checked="checked"
                    />
                    <span className="checkmark"></span>
                    <label />
                    <p className="text-clause">Xuất hóa đơn công ty</p>
                  </div>
                </div>
              </div>
              {/* <!--abate online--> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cart;
