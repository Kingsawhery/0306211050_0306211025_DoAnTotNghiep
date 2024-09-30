import { Link } from "react-router-dom";
import axios from "axios";
import { userServices } from "../../services/userServices";

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
  const [email, setEmail] = useState("");
  const [hideEyes, setHideEyes] = useState({
    password: "password",
    rePassword: "password",
  });
  const [phone, setPhone] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");
  // const defaultValidInput = {
  //   isValidEmail: true,
  //   isValidName: true,
  //   isValidPhone: true,
  //   isValidPassword: true,
  //   isValidConFirmPassword: true,
  // };
  // const [checkValidInput, setCheckValidInput] = useState(defaultValidInput);
  const handleDataUser = async () => {
    if (
      !validateEmail(email) ||
      !validatePhone(phone) ||
      !validateUserName(username) ||
      !validatePassword(password, comfirmPassword)
    ) {
      return;
    }

    const rsRegister = await userServices(
      email,
      username,
      phone,
      password,
      "user"
    );

    if (rsRegister.EC !== 0) {
      toast(rsRegister.EM);
    } else {
      toast(rsRegister.EM);
      navigate("/login");
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
  return (
    <div>
      <div class="body">
        <div class="section">
          <from action="#">
            <h1>Regiter</h1>
            <div class="input-box">
              <input
                // className={
                //   checkValidInput.isValidEmail
                //     ? "form-control"
                //     : "form-control is-invalid"
                // }
                type="text"
                placeholder="email"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>

            <div class="input-box">
              <input
                // className={
                //   checkValidInput.isValidName
                //     ? "form-control"
                //     : "form-control is-invalid"
                // }
                type="text"
                placeholder="username"
                required
                value={username}
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
              />
            </div>
            <div class="input-box">
              <input
                // className={
                //   checkValidInput.isValidPhone
                //     ? "form-control"
                //     : "form-control is-invalid"
                // }
                type="text"
                placeholder="phone"
                required
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
              />
            </div>
            <div class="input-box">
              <input
                type={hideEyes.password}
                placeholder="password"
                required
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
            <div class="input-box">
              <input
                type={hideEyes.password}
                placeholder="Re-enter password"
                required
                value={comfirmPassword}
                onChange={(event) => {
                  setComfirmPassword(event.target.value);
                }}
              />
            </div>
            <div class="remember-forgot">
              <lable>
                <input className="mx-1" type="checkbox" />I agree to the terms &
                conditions
              </lable>
            </div>
            <button type="button" name="btn" onClick={() => handleDataUser()}>
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
