import { Link } from "react-router-dom";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { loginServices } from "../../services/userServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginGG from "../LoginGG";
import Cookies from "js-cookie";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";

const Login = (props) => {
  let navigate = useNavigate();

  const dataUser = localStorage.getItem("user");
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const defaultObjInput = {
    isValue: true,
    isPassword: true,
  };
  // useEffect(() => {
  //   if (dataUser) {
  //     navigate("/");
  //   }
  // }, []);

  const [password, setPassword] = useState("");
  const handleCreatNewAccount = () => {
    navigate("/Register");
  };
  const hanldeSetValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const handleLogin = async () => {
    if (!data.email) {
      toast.error("Enter email/phone or Password");
      return;
    } else if (!data.password) {
      toast.error("Enter email/phone or Password");
      return;
    }
    const response = await loginServices(data.email, data.password);
    console.log(response.data);
    if (response.data.EC == 0 && response.data.EM == "Login success") {
      const dataSaveLocal = {
        id: response.data.user.id,
        name: response.data.user.username,
        phone: response.data.user.phone,
        email: response.data.user.email,
        token: response.data.user.token,
        image: response.data.user.image
      };
      localStorage.setItem("user", JSON.stringify(dataSaveLocal));
      window.location.reload();
      navigate("/");
    } else {
      toast.error("Account is not define");
    }
  };

  return (
    <div>
      <div className="body p-2">
        <div className="section">
          <div>
            <h1 className="title">Login</h1>
            <TextField
              className="text-field"
              required
              id="outlined-required"
              label="Email"
              type="text"
              name="email"
              fullWidth
              value={data.email}
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
              value={data.password}
              onChange={hanldeSetValue}
            />
            <div className="remember-forgot">
              <label>
                <input className="mx-1" type="checkbox" />
                Remember Mez
              </label>
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <div>
              <GoogleOAuthProvider clientId="893391151246-qbd3i6uctc7guvur5etsa4s7l963jakc.apps.googleusercontent.com">
                <LoginGG
                  onGet={(response) => {
                    console.log(response);
                    navigate("/users");
                  }} //Luu data vo localstorage
                />
              </GoogleOAuthProvider>
            </div>
            <div></div>
            <button
              onClick={() => {
                handleLogin();
              }}
              name="btn"
              className="mt-2"
            >
              Login
            </button>
            <div className="register-link">
              <p>
                Don't have an account?
                <a className="fw-bold" onClick={() => handleCreatNewAccount()}>
                  Register Here!
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
