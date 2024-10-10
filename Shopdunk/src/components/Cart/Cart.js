import { useEffect, useState } from "react";
import "../Cart/Cart.css";
import axios from "axios";
import {
  apiAddCart,
  apiDeleteCart,
  apiShowCart,
} from "../../services/cartService";
import ProductRowRandom from "../Product/ProductRowRandom/ProductRowRandom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const [listProductInCart, setProductInCart] = useState([]);
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const [currentSubProduct, setCurrentSubProduct] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    handleGetData();
  }, [currentSubProduct]);

  const handleGetData = async () => {
    if (JSON.parse(user).id && JSON.parse(user).token) {
      const data = {
        userId: JSON.parse(user).id,
        token: JSON.parse(user).token,
      };
      const dataRs = await apiShowCart(data);
      if (dataRs) {
        setProductInCart(dataRs.data);
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
      toast.error("Đã có lỗi xảy ra!");
    }
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
      toast.error("Đã có lỗi xảy ra!");
    }
  };

  const totalAmount = listProductInCart.reduce(
    (total, item) => total + item.price * item.quantity,
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
                        item.sub_product.product_detail.product_detail_images[0]
                          .image
                          ? `${process.env.REACT_APP_LOCALHOST_SERVER}/productImage/${item.sub_product.product_detail.product.sub_category.name}/${item.sub_product.product_detail.product_detail_images[0].image}`
                          : `${process.env.REACT_APP_LOCALHOST_SERVER}/productImage/default.webp`
                      }
                      alt={item.sub_product.name}
                    />
                    <div className="information">
                      <h4>{item.sub_product.name}</h4>
                      <p className="invoide-color m-0">
                        Phân loại:{" "}
                        {item.sub_product.type_classify_details.map(
                          (type) => ` ${type.name}`
                        )}
                      </p>
                      <span>{item.price.toLocaleString("VN-vi")} VNĐ</span>
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
              <button className="btn-login-abate">Đăng nhập ngay</button>
            </div>
          </div>
          <div className="col-4">
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
                        <td>{item.price.toLocaleString("VN-vi")} VNĐ</td>
                        <td>
                          {(item.price * item.quantity).toLocaleString("VN-vi")}{" "}
                          VNĐ
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="invoice-footer">
                <h3>Tổng cộng: {totalAmount.toLocaleString("VN-vi")} VNĐ</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
