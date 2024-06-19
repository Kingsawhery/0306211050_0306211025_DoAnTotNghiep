import React, { Component } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div id="header">
        <div className="container p-0">
          <div className="container d-flex header" style={{ height: 75 }}>
            <Link className="mt-3 header-logo" to="/">
              <img
                src="https://shopdunk.com/images/thumbs/0012445_Logo_ShopDunk.png"
                alt="logo"
              />
            </Link>
            <div className="categories" style={{ position: "relative" }}>
              <ul className="pl-0 d-flex mb-1">
                <li className="nav">
                  <a style={{ color: "#F4F4F4", fontSize: 15 }} href>
                    iPhone
                  </a>
                </li>
                <li className="nav">
                  <a style={{ color: "#F4F4F4", fontSize: 15 }} href>
                    iPad
                  </a>
                </li>
                <li className="nav">
                  <a style={{ color: "#F4F4F4", fontSize: 15 }} href>
                    Mac
                  </a>
                </li>
                <li className="nav">
                  <a style={{ color: "#F4F4F4", fontSize: 15 }} href>
                    Watch
                  </a>
                </li>
                <li className="nav">
                  <a style={{ color: "#F4F4F4", fontSize: 15 }} href>
                    Âm thanh
                  </a>
                </li>
                <li className="nav">
                  <a style={{ color: "#F4F4F4", fontSize: 15 }} href>
                    Phụ kiện
                  </a>
                </li>
                <li className="nav">
                  <a style={{ color: "#F4F4F4", fontSize: 15 }} href>
                    Máy cũ
                  </a>
                </li>
                <li className="nav">
                  <a style={{ color: "#F4F4F4", fontSize: 15 }} href>
                    Dịch vụ
                  </a>
                </li>
                <li className="nav">
                  <a style={{ color: "#F4F4F4", fontSize: 15 }} href>
                    Khuyến mãi
                  </a>
                </li>
              </ul>
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
                <i
                  style={{ color: "#d2d2d7", fontSize: 23 }}
                  className="fas fa-user"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
