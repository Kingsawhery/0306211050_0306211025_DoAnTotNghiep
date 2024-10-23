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
import { checkToken } from "../../function/checkToken";
const Header = () => {
  const navigate = useNavigate();
  const {totalCart} = useContext(Context);
  let user = localStorage.getItem("user");
  const [categories, setCategories] = useState([]);
  try{
    user = JSON.parse(user);
  }catch(e){

  }
  useEffect(() => {
try{
  
  check();
  getListCategories();
}catch(e){
  if(user){
    localStorage.clear();
    navigate("/login")

  }

}
    

  }, []);
  const check = async ()=>{
    const checkData = await checkToken();
    if(checkData.EC !== 1){
      

    }
    else{
      if(user){
      localStorage.clear();
      window.location.reload();
      window.location.reload();

      }
    }
    return checkData;
  }
  const getListCategories = async () => {
    const results = await getAllCategories();
    if (results) {
      setCategories(results);
    }
  };
  const handleLogout = () => {
      localStorage.clear();
      window.location.reload();
      navigate("/login")
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
            {/* <div
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
            </div> */}
            {user && user.token && 
            (
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
            )
            }
            
          
              {user ? (
                /* avatar-default.jpg */
                <div
              className="avatar"
              style={{
                width: 14,
                position: "relative",
               right:-91 + "px",
                cursor: "pointer",
              }}
            >
                <img className="avatar-header" src={user.image && user.name ? `${process.env.REACT_APP_LOCALHOST_SERVER}/userImage/${user.name}/${user.image}`: `${process.env.REACT_APP_LOCALHOST_SERVER}/userImage/avatar-default.jpg`}></img>
                </div>

              ) : (
                <div className="d-flex" style={{marginLeft:"40px",width:"100%", alignItems:"center"}}>
                <strong style={{whiteSpace:"no-wrap",marginRight:"12px",color:"#fff",}}>Bạn chưa đăng nhập?</strong>
                <Link to="/login">
                  <Login className="logo-login" />
                </Link>
                </div>
               
              )}
              {user && user.name && (
            <div className="div-name">
              <h3>Xin chào {user.name}!</h3>
              
            </div>
          )}
          </div>
         
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
      </div>
    </div>
  );
};

export default Header;
