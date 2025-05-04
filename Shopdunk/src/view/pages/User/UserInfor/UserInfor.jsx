import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserInfor.scss"
import UserInforTab from "./UserInforTab";
import ChangePassword from "./ChangePassword";
import User from "../../Admin/Management/User/User";
export default function UserInfor() {
    const [tabDisplay, setTabDisplay] = useState(1);
    const navigate = useNavigate();
    let user = localStorage.getItem("user")

    try{
        user =  JSON.parse(user);
       
      }catch(e){
          navigate("/");
  
      }
    useEffect(()=>{
        if(user){

        }else navigate("/")
    },[user])
    return (
        user ? (
          <div className="user-infor-page container d-flex pt-5">
            <div className="user-infor-left col-4">
              <div
                style={{ width: "100%" }}
                className="div-img d-flex justify-content-center"
              >
                <img
                  style={{
                    width: "60%",
                    borderRadius: "50%",
                  }}
                  src={
                    user?.image && user?.name
                      ? `${process.env.REACT_APP_LOCALHOST_SERVER}/userImage/${user.name}/${user.image}`
                      : `${process.env.REACT_APP_LOCALHOST_SERVER}/userImage/avatar-default.jpg`
                  }
                  alt="avatar"
                />
              </div>
              <div
                style={{ fontSize: "40px" }}
                className="user-infor-name d-flex justify-content-center mt-3"
              >
                lamnguyen
              </div>
            </div>
      
            <div className="user-infor-right col-8">
              <div className="user-infor-table">
                <div className="user-infor-tab d-flex">
                  <div
                    onClick={() => setTabDisplay(1)}
                    className={
                      tabDisplay === 1
                        ? "under-border user-infor-tab-left"
                        : "user-infor-tab-left"
                    }
                  >
                    Thông tin cá nhân
                  </div>
                  <div
                    onClick={() => setTabDisplay(2)}
                    className={
                      tabDisplay !== 1
                        ? "under-border user-infor-tab-right"
                        : "user-infor-tab-right"
                    }
                  >
                    Thay đổi mật khẩu
                  </div>
                </div>
      
                {tabDisplay === 1 ? <UserInforTab /> : <ChangePassword />}
              </div>
            </div>
          </div>
        ) : <></>
      );
    }      