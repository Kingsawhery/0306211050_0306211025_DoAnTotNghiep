import { Link } from "react-router-dom";
import axios from "axios";
import { userServices } from "../../services/userServices";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
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
const Register = (props) => {
  const user = localStorage.getItem("user");
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });
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
  });
  const handleDataUser = async () => {
    if (dataRegister.password === dataRegister.confirmPassword) {
      if (
        validateEmail(dataRegister.email) &&
        validateUserName(dataRegister.username)
      ) {
        const rsRegister = await userServices(
          dataRegister.email,
          dataRegister.username,
          dataRegister.phone,
          dataRegister.password,
          "user"
        );
        if (rsRegister.EC !== 0) {
          toast(rsRegister.EM);
        } else {
          toast(rsRegister.EM);
          navigate("/login");
        }
      }
    } else {
      console.log(dataRegister.password, " ", dataRegister.confirmPassword);
      toast.error("Mật khẩu không trùng khớp!");
    }
  };
  let navigate = useNavigate();

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
      <div class="body">
        <div class="section">
          <from action="#">
            <h1 className="title">Regiter</h1>
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

            <button
              type="button"
              className="sub-title"
              name="btn"
              onClick={() => handleDataUser()}
            >
              Register
            </button>
            <div class="register-link">
              <p>
                Already have an account?
                <a className="fw-bold" onClick={() => handlePreLogin()}>
                  Login
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
