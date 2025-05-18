import { Link } from "react-router-dom";
import axios from "axios";
import { userServices } from "../../services/userServices";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./Register.css";
import {
  validateEmail,
  validatePhone,
  validatePassword,
  validateUserName,
} from "../../function/validate";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
const Register = (props) => {
  const user = localStorage.getItem("user");
  const fileRef = useRef(null);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });
  const [imageDemo, setImageDemo ] = useState("");
  const [hideEyes, setHideEyes] = useState({
    password: false,
    rePassword: false,
  });
  const [dataRegister, setDataRegister] = useState({
    email: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
    image:"",
    fileImage:{}
  });
  const handleDataUser = async () => {
    if (dataRegister.password === dataRegister.confirmPassword) {
      if (
        validateEmail(dataRegister.email) &&
        validateUserName(dataRegister.username)
      ) {
        const rsRegister = await userServices(dataRegister);
        if (rsRegister.EC !== 0) {
          toast.dismiss();
          toast(rsRegister.EM);
        } else {
          toast.dismiss();
          toast(rsRegister.EM);
          // navigate("/login");
        }
      }
    } else {
      toast.dismiss();
      toast.error("Mật khẩu không trùng khớp!");
    }
  };
  let navigate = useNavigate();
  const handleImageDemo = (e) => {
    try {      
        let exe =
          e.target.files[0].name.split(".")[
            e.target.files[0].name.split(".").length - 1
          ];

        if (exe !== "png" && exe !== "jpeg" && exe !== "jpg") {
          return;
        } else {
          setDataRegister((prevData) => ({
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

  const handlePreLogin = () => {
    navigate("/Login");
  };
  useEffect(() => {
    // axios.get("http://localhost:8001/api/v1/test-api").then((data) => {
    //   console.log(">>>check data", data);
    // }, []);
  });
  const hanldeSetValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDataRegister({ ...dataRegister, [name]: value });
    console.log(dataRegister);
  };
  return (
    <div>
     <Helmet>
        <meta charSet="utf-8" />
        <title>Đăng ký</title>
      </Helmet>
      <div class="body">
        <div class="section">
          <from action="#">
            <h1 className="title">Register</h1>
            <div className="avatar">
            <input
            className="d-none"
            ref={fileRef}
            type="file"
            onChange={handleImageDemo}
          />
          {imageDemo !== "" ? (<img className="add-avatar" onClick={() => {
                fileRef.current.click();
              }} src={`${imageDemo}`}></img>): (<AccountCircleIcon onClick={() => {
                fileRef.current.click();
              }} className="add-avatar" style={{color:"gray"}}/>) }
            
            </div>
            <div className="avatar">
            <p>Thêm ảnh đại diện</p>
            </div>
            
            <TextField
              className="text-field"
              required
              id="outlined-required"
              label="Email"
              type="text"
              name="email"
              fullWidth
              value={dataRegister.email}
              onChange={hanldeSetValue}
            />
            <TextField
              className="text-field"
              required
              id="outlined-required"
              label="Username"
              type="text"
              name="username"
              fullWidth
              value={dataRegister.username}
              onChange={hanldeSetValue}
            />

            <TextField
              className="text-field"
              required
              id="outlined-required"
              label="Số điện thoại"
              type="text"
              name="phone"
              fullWidth
              value={dataRegister.phone}
              onChange={hanldeSetValue}
            />

            <TextField
              className="text-field"
              required
              id="outlined-required"
              label="Password"
              type="password"
              name="password"
              fullWidth
              value={dataRegister.password}
              onChange={hanldeSetValue}
            />

            <TextField
              className="text-field"
              required
              id="outlined-required"
              label="Re-Password"
              type="password"
              name="confirmPassword"
              fullWidth
              value={dataRegister.confirmPassword}
              onChange={hanldeSetValue}
            />
  <div className="div-button d-flex justify-content-center mt-4">
  <button
              type="button"
              className="sub-title"
              name="btn"
              onClick={() => handleDataUser()}
              style={
                {
                  border: "1px solid gray",
    padding: "12px 20px",
    width: "40%",
    backgroundColor:"#4f85d4",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color:"#ffffff"
                }
              }
            >
              Register
            </button>
  </div>
           
            <div class="register-link">
              <p>
                Already have an account?
                <a className="fw-bold"
                style={{
                  color:"black",
                  textDecoration:"underline",
                }}
                onClick={() => handlePreLogin()}>
                  Login Here!
                </a>
              </p>
            </div>
          </from>
        </div>
      </div>
    </div>
  );
};
export default Register;
