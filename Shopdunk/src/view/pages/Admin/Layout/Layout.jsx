import { Outlet, useNavigate } from "react-router-dom";
import "./Layout.scss";
import HeaderAdmin from "../Header/HeaderAdmin";
import {
  faList,
  faMobileScreenButton,
  faChartLine,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../../../../components/Footer/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkAdminRole } from "../../../../function/checkToken";
const Layout = ({ admin }) => {

  const [tabActive, setTabActive] = useState(-1);
  const navigate = useNavigate();
  const objectCategory = [
    {
      icon: faChartLine,
      name: "Thống kê",
      link: "/admin/thong-ke",
      subItem: [],
    },
    {
      icon: faList,
      name: "Quản lý",
      link: "",
      subItem: [
        {
          icon: faList,
          name: "Quản lý sản phẩm",
          link: "/admin/danh-muc",
        },
        {
          icon: faList,
          name: "Quản lý tin tức",
          link: "/admin/tin-tuc",
        },
        {
          icon: faList,
          name: "Quản lý người dùng",
          link: "/admin/user",
        },
        {
          icon: faList,
          name: "Quản lý đơn hàng",
          link: "/admin/invoice",
        },
        {
          icon: faList,
          name: "Quản lý thương hiệu",
          link: "/admin/brands",
        },
        {
          icon: faList,
          name: "Quản lý mã khuyến mãi",
          link: "/admin/promotions",
        },
      ],
    },
  ];
  useEffect(() => {
    checkAdmin();
  }, [admin])
  const checkAdmin = async () => {
    try{
      const checkAdminData = await checkAdminRole();
    
      if (checkAdminData?.data?.EC === 1) {
  
        return;
      }
     else {
      navigate("/")
    }
    return checkAdminData;

    }catch{

    }
    

  }
  return (
    <>
      <HeaderAdmin />
      <div className="body-admin">
        <div className="side-bar">
          {objectCategory.map((item, index) => {
            return item.link !== "" ? (
              <Link to={item.link} key={index}>
                <div className="list-item-side-bar">
                  <div
                    className={
                      tabActive === index
                        ? "item-side-bar effect-chervon"
                        : "item-side-bar"
                    }
                    onClick={() => {
                      if (tabActive === index) {
                        setTabActive(-1);
                      } else {
                        setTabActive(index);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={item.icon} />
                    <span className="icon">{item.name}</span>
                    {item.subItem.length > 0 ? (
                      <FontAwesomeIcon icon={faChevronRight} />
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    className={
                      tabActive === index
                        ? "sub-item-side-bar effect-sub-side-bar"
                        : "sub-item-side-bar"
                    }
                  >
                    {item.subItem.length > 0 &&
                      item.subItem.map((sub, subIndex) => {
                        return (
                          <div
                            className={
                              tabActive === index ? "item-side-bar" : "d-none"
                            }
                            key={subIndex}
                          >
                            <FontAwesomeIcon icon={sub.icon} />
                            <span className="icon">{sub.name}</span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </Link>
            ) : (
              <div className="list-item-side-bar" key={index}>
                <div
                  className={
                    tabActive === index
                      ? "item-side-bar effect-chervon"
                      : "item-side-bar"
                  }
                  onClick={() => {
                    if (tabActive === index) {
                      setTabActive(-1);
                    } else {
                      setTabActive(index);
                    }
                  }}
                >
                  <FontAwesomeIcon icon={item.icon} />
                  <span className="icon">{item.name}</span>
                  {item.subItem.length > 0 ? (
                    <FontAwesomeIcon icon={faChevronRight} />
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className={
                    tabActive === index
                      ? "sub-item-side-bar effect-sub-side-bar"
                      : "sub-item-side-bar"
                  }
                >
                  {item.subItem.length > 0 &&
                    item.subItem.map((sub, subIndex) => {
                      return (
                        <Link to={sub.link} key={subIndex}>
                          <div
                            className={
                              tabActive === index ? "item-side-bar" : "d-none"
                            }
                          >
                            <FontAwesomeIcon icon={sub.icon} />
                            <span className="icon">{sub.name}</span>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="main-content manage-page container">
          <Outlet />
        </div>
      </div>

      <Footer />
    </>
  );
};
export default Layout;
