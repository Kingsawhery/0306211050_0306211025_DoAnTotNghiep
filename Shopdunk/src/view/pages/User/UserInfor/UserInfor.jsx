import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserInfor.scss"
import UserInforTab from "./UserInforTab";
import ChangePassword from "./ChangePassword";
import User from "../../Admin/Management/User/User";
import { InvoiceUser } from "../InvoicePage/InvoiceUser";
import { toast } from "react-toastify";
import { validateEmail, validateUserName } from "../../../../function/validate";
export default function UserInfor() {
  const [tabDisplay, setTabDisplay] = useState(1);
  const navigate = useNavigate();
  let user = localStorage.getItem("user")
  const fileRef = useRef(null);

  const [data, setData] = useState({
    id:JSON.parse(user)?.id || null,
    token: JSON.parse(user)?.token || null,
    username: '',
    email: '',
    phone: '',
    birthday: '',
    address: '',
    gender: '',
  });
  const [imageDemo, setImageDemo] = useState("");
  const handleImageDemo = (e) => {
    try {
      let exe =
        e.target.files[0].name.split(".")[
        e.target.files[0].name.split(".").length - 1
        ];

      if (exe !== "png" && exe !== "jpeg" && exe !== "jpg") {
        return;
      } else {
        setData((prevData) => ({
          ...prevData,
          image: e.target.files[0].name,
          fileImage: e.target.files[0],
        }));
        setImageDemo(URL.createObjectURL(e.target.files[0]));

      }
    } catch (e) {
      console.log(e);
    }
  };
  try {
    user = JSON.parse(user);

  } catch (e) {
    navigate("/");

  }
  useEffect(() => {
    if (user) {

    } else navigate("/")
  }, [user])

  return (
    user ? (
      <div className="user-infor-page container d-flex pt-5">
        <div className="user-infor-left col-4 m-4">
  <div
    style={{
      width: "100%",
      // maxWidth: "300px",
      height: "400px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden", 
      borderRadius: "20%" 
    }}
    className="div-img"
  >
    <input
      className="d-none"
      ref={fileRef}
      type="file"
      onChange={handleImageDemo}
    />
    {imageDemo === "" ? (
      <img
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "cover",
          objectPosition: "center",
          borderRadius: "20%",
        }}
        src={
          user?.image && user?.name
            ? `${process.env.REACT_APP_LOCALHOST_SERVER}/userImage/${user.image}`
            : `${process.env.REACT_APP_LOCALHOST_SERVER}/userImage/avatar-default.jpg`
        }
        alt="avatar"
      />
    ) : (
      <img
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "cover",
          objectPosition: "center",
          borderRadius: "20%",
        }}
        src={imageDemo}
        alt="avatar"
      />
    )}
  </div>

  <div className="d-flex justify-content-center mt-3">
    <p
      style={{
        cursor: "pointer",
        fontWeight: "bold",
      }}
      onClick={() => {
        fileRef.current.click();
      }}
    >
      Thay đổi
    </p>
  </div>

  <div
    style={{ fontSize: "40px" }}
    className="user-infor-name d-flex justify-content-center mt-3"
  >
    {user?.name}
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
                    ? "under-border user-infor-tab-right p-3"
                    : "user-infor-tab-right  p-3"
                }
              >
                Đơn hàng
              </div>
            </div>
            {tabDisplay === 1 ? <UserInforTab data={data} setData={setData} /> : <InvoiceUser />}
          </div>
        </div>
      </div>
    ) : <></>
  );
}      