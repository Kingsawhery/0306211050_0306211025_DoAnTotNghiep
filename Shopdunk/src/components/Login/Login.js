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

  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");
  const [objInput, setObjInput] = useState(defaultObjInput);
  const handleCreatNewAccount = () => {
    navigate("/Register");
  };

  const handleLogin = async () => {
    setObjInput(defaultObjInput);
    if (!value) {
      setObjInput({ ...defaultObjInput, isValue: false });
      toast.error("Enter email/phone or Password");
      return;
    } else if (!password) {
      setObjInput({ ...defaultObjInput, isPassword: false });
      toast.error("Enter email/phone or Password");
      return;
    }
    const response = await loginServices(value, password);
    if (response.EC == 0) {
      toast.success(response.message);
      const dataSaveLocal = {
        id: response.user.id,
        name: response.user.username,
        phone: response.user.phone,
        email: response.user.email,
      };
      localStorage.setItem("user", JSON.stringify(dataSaveLocal));
      navigate("/");
    } else {
      toast.error("Login fail!");
    }
  };

  return (
    <div>
      <div className="body p-2">
        <div className="section">
          <div>
            <h1>Login</h1>
            <div className="input-box">
              <input
                className={
                  objInput.isValue ? "form-control" : "is-invalid form-control"
                }
                name="email"
                type="text"
                placeholder="Email..."
                required
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                }}
              />
            </div>
            <div className="input-box">
              <input
                className={
                  objInput.isPassword
                    ? "form-control"
                    : "is-invalid form-control"
                }
                name="password"
                type="password"
                placeholder="Password..."
                required
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
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
