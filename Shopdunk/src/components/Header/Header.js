import React, { Component, useEffect, useState } from "react";
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { getAllCategories } from "../../services/categoryService";
import { Logout, Login } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const Header = () => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getListCategories();
  }, []);
  const getListCategories = async () => {
    const results = await getAllCategories();
    if (results) {
      setCategories(results);
    }
  };
  const handleLogout = () => {
    if (user) {
      localStorage.removeItem("user");
      window.location.reload();
    }
  };
  return (
    <div id="header">
      <div className="container p-0">
        <div className="container d-flex header" style={{ height: 75 }}>
          <Link to="/" onClick={()=>{
                window.scrollTo({ top: "0", behavior: "smooth" });
          }}>
            <div className="mt-3 header-logo">
              <img
                src="https://shopdunk.com/images/thumbs/0012445_Logo_ShopDunk.png"
                alt="logo"
              />
            </div>
          </Link>

          <div className="categories" style={{ position: "relative" }}>
            {categories && categories.length > 0 && (
              <ul className="ul-category">
                {categories.map((item, index) => {
                  return (
                    <Link to={`/category/${item.name}`}>
                      <li className="nav">
                        <a style={{ color: "#F4F4F4", fontSize: 15 }} href>
                          {item.name}
                        </a>
                      </li>
                    </Link>
                  );
                })}
              </ul>
            )}
          </div>
          <div className="action">
            <div
              className="tool"
              style={{
                width: 14,
                position: "relative",
                top: 20,
                paddingLeft: 30,
                cursor: "pointer",
              }}
            >
              <div className="search">
                <i
                  style={{ color: "#d2d2d7", fontSize: 23 }}
                  className="fas fa-search"
                />
              </div>
            </div>
            <Link
            onClick={()=>{
              window.scrollTo({ top: "0", behavior: "smooth" })
            }}
              to="/cart"
              className="bag"
              style={{
                width: 14,
                position: "relative",
                top: 20,
                left: 40,
                cursor: "pointer",
              }}
            >
              <i
                style={{ color: "#d2d2d7", fontSize: 23 }}
                className="fas fa-shopping-bag"
              />
            </Link>
            <div
              className="bag"
              style={{
                width: 14,
                position: "relative",
                top: 20,
                left: 65,
                cursor: "pointer",
              }}
            >
              {user ? (
                <AccountCircleIcon />
              ) : (
                <Link to="/login">
                  <Login className="logo-login" />
                </Link>
              )}
            </div>
          </div>
          {user && JSON.parse(localStorage.getItem("user")).name && (
            <div className="div-name">
              <h3>Xin chào {JSON.parse(localStorage.getItem("user")).name}!</h3>
              <div className="logout">
                {user && (
                  <Logout
                    className="logo"
                    fontSize="medium"
                    onClick={handleLogout}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
