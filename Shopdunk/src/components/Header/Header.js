import React, { useContext, useEffect, useState } from "react";
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { getAllCategories } from "../../services/categoryService";
import { Logout, Login } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Badge from '@mui/material/Badge';
import { IconButton } from "@mui/material";
import { Context } from "../../App";
import Dropdown from 'react-bootstrap/Dropdown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { checkAdminRole, checkToken } from "../../function/checkToken";

const Header = () => {
  const navigate = useNavigate();
  const { totalCart } = useContext(Context);
  let user = localStorage.getItem("user");
  const [categories, setCategories] = useState([]);
  const [admin, setAdmin] = useState(false);

  try {
    user = JSON.parse(user);
  } catch (e) {}

  useEffect(() => {
    try {
      if(user){
        console.log("Sao z");
        
        check();
        checkAdmin();
      }
      getListCategories();
    } catch (e) {
      if (user) {
        localStorage.clear();
        navigate("/login");
      }
    }
  }, [admin]);

  const check = async () => {
    const checkData = await checkToken();
    if (checkData.data.EC != 1) {
      
    } else {
        localStorage.clear();
        window.location.reload();
        navigate("/login");
    }
    return checkData;
  };

  const checkAdmin = async () => {
    try {
      const checkData = await checkAdminRole();
      if (checkData.data.EC === 1) {
        setAdmin(true);
      }
      return checkData;
    } catch (e) {
      console.log(e);
    }
  };

  const getListCategories = async () => {
    const results = await getAllCategories();
    if (results) {
      setCategories(results);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    navigate("/login");
  };

  return (
    <div id="header">
      <div className="container p-0">
        <div className="container d-flex header align-items-center justify-content-between" style={{ height: 75 }}>
          <div className="logo">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <div className="header-logo" style={{ width: "100%" }}>
                <img
                  style={{ width: "100%" }}
                  src={`${process.env.REACT_APP_LOCALHOST_SERVER}/bannerImage/avatar_preview_rev_1.png`}
                  alt="logo"
                />
              </div>
            </Link>
          </div>

          <div className="categories" style={{ position: "relative" }}>
            {categories && categories.length > 0 && (
              <ul className="ul-category">
                {categories.map((item, index) => (
                  <Link key={index} to={`/category/${item.slug}`}>
                    <li className="nav">
                      <a style={{ color: "#F4F4F4", fontSize: 15 }} href="#">
                        {item.name}
                      </a>
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </div>

          <div className="action d-flex align-items-center">
            {user && user.token && (
              <Link
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              to="/cart"
              className="bag"
              style={{
                width: 14,
                position: "relative",
                top: 2,
                left: -16,
                cursor: "pointer",
              }}
            >
              <IconButton aria-label="cart" className="cart-icon">
                <ShoppingCartIcon />
                <span className="number-cart">{totalCart > 99 ? "99+" : totalCart}</span>
              </IconButton>
            </Link>
            )}

            {user ? (
              <div className="d-flex align-items-center ms-3">
                <Dropdown>
                  <Dropdown.Toggle
                    style={{
                      backgroundColor: "#515154",
                      border: "none",
                      padding: "4px 8px",
                    }}
                    variant="light"
                    id="dropdown-basic"
                  >
                    <div className="avatar">
                      <img
                        className="avatar-header"
                        src={
                          user.image && user.name
                            ? `${process.env.REACT_APP_LOCALHOST_SERVER}/userImage/${user.image}`
                            : `${process.env.REACT_APP_LOCALHOST_SERVER}/userImage/avatar-default.jpg`
                        }
                        alt="avatar"
                      />
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/user-information">Thông tin tài khoản</Dropdown.Item>
                    {admin && <Dropdown.Item href="/admin">Trang quản lý thông tin người dùng</Dropdown.Item>}
                    <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <div className="ms-2" style={{ color: "#fff", whiteSpace: "nowrap", fontSize: "16px" }}>
                  👋 Xin chào, {user.name}!
                </div>
              </div>
            ) : (
              <div className="d-flex align-items-center ms-3">
                <strong style={{ whiteSpace: "nowrap", color: "#fff", marginRight: "12px" }}>
                  Bạn chưa đăng nhập?
                </strong>
                <Link to="/login">
                  <Login className="logo-login" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
