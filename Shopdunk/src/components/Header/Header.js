import React, { Component, useContext, useEffect, useState } from "react";
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { getAllCategories } from "../../services/categoryService";
import { Logout, Login } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Badge from '@mui/material/Badge';
import {IconButton} from "@mui/material";
import { styled } from '@mui/material/styles';
import { Context } from "../../App";
// import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const Header = () => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const {totalCart} = useContext(Context);
  console.log(useContext(Context));
  
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
            <div style={{width:"100%"}} className="header-logo">
              <img
              style={{width:"100%"}}
                src={`${process.env.REACT_APP_LOCALHOST_SERVER}/bannerImage/avatar_preview_rev_1.png`}
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
              <IconButton aria-label="cart" className="cart-icon">
    <ShoppingCartIcon />
              <span className="number-cart">{totalCart > 99 ? "99+" : totalCart}</span>
</IconButton>
            </Link>
            <div
              className="avatar"
              style={{
                width: 14,
                position: "relative",
               right:-91 + "px",
                cursor: "pointer",
              }}
            >
              {user ? (
                /* avatar-default.jpg */
                <img className="avatar-header" src={JSON.parse(localStorage.getItem("user")).image && JSON.parse(localStorage.getItem("user")).name ? `${process.env.REACT_APP_LOCALHOST_SERVER}/userImage/${JSON.parse(localStorage.getItem("user")).name}/${JSON.parse(localStorage.getItem("user")).image}`: `${process.env.REACT_APP_LOCALHOST_SERVER}/userImage/avatar-default.jpg`}></img>
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
