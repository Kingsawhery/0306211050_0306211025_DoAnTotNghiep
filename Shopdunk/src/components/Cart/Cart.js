import "../Cart/Cart.css";
import { useUser } from "../../Context/UserContext";

export default function Cart() {
  const { user } = useUser();

  return (
    <>
      <div className="main">
        <div className="container">
          <div className="row d-flex">
            <div className="col-8 mt-3">
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
                      <tr>
                        <td>
                          <img
                            src="https://shopdunk.com/images/thumbs/0024431_iphone-15-128gb_80.png"
                            alt="iPhone 15"
                          />
                        </td>
                        <td>
                          <div className="name">
                            <strong>iPhone 15 128GB</strong>
                            <p className="invoide-color m-0">Màu sắc: Đen</p>
                            <a className="text-primary" href="">
                              Sửa
                            </a>
                          </div>
                        </td>
                        <td>
                          <span>19.890.000₫</span>
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
                              {/* {user.isLoggedIn ? <button className="content-card-btn-buy">
                                Mua ngay
                              </button>: } */}
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
              <div className="abate-online">
                <div>
                  <div className="information-abate-online-titile fw-bold">
                    Thông tin thanh toán
                  </div>
                  <p>
                    Quý khách vui lòng lựa chọn các hình thức thanh toán dưới
                    đây:
                  </p>
                </div>
              </div>
            </div>
            <div className="col-4 mt-3">
              <div className="price-promotion">
                <div className="input-group input-group-lg">
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-lg"
                    placeholder="Mã giảm giá"
                  />
                  <span className="input-group-text" id="inputGroup-sizing-lg">
                    <strong className="ad">Áp dụng</strong>
                  </span>
                </div>
                <div className="total">
                  <table>
                    <tbody>
                      <tr>
                        <td className="td-tongphu">
                          <p className="tongphu">Tổng phụ:</p>
                        </td>
                        <td>
                          <p className="phuthu">19.000.100đ</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="td-tongcong">
                          <p className="tongcong">Tổng cộng:</p>
                        </td>
                        <td>
                          <p className="giatongcong text-primary fw-bold">
                            19.000.100đ
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="crossbar"></div>
                <div className="clause d-flex">
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked="checked"
                  />
                  <span className="checkmark"></span>
                  <label />
                  <p className="text-clause">
                    Tôi đã đọc và đồng ý với{" "}
                    <a className="text-clause-a" href="">
                      điều khoản và điều kiện
                    </a>{" "}
                    của website
                  </p>
                </div>
                <div className="func-order m-3">
                  <button className="func-order-btn">Tiến hành đặt hàng</button>
                </div>
                <p className="pt m-3 pb-4">
                  (*) Phí phụ thu sẽ được tính khi bạn tiến hành thanh toán.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
