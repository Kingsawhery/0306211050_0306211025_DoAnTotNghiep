import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPasswordText, setShowPasswordText] = useState(false);
  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 rounded-lg col-lg-4">
            <form
              method="post"
              onSubmit={(e) => {
                e.preventDefault();
                axios
                  .post("http://localhost:8000/api/reset-password", {
                    token: token,
                    password: password,
                    passwordConfirm: passwordConfirm,
                  })
                  .then((res) => {
                    console.log(res);
                  });
              }}
            >
              <div className="form-group w-100">
                <label for="password">Mật khẩu:</label>
                <input
                  type={showPasswordText ? "text" : "password"}
                  className="form-control border-dark w-100"
                  id="password"
                  placeholder="Nhập mật khẩu"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="form-group w-100">
                <label for="password-confirm">Xác nhận mật khẩu:</label>
                <input
                  type={showPasswordText ? "text" : "password"}
                  className="form-control border-dark w-100"
                  id="password-confirm"
                  placeholder="Nhập lại mật khẩu"
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value);
                  }}
                />
              </div>
              <input
                type="checkbox"
                name=""
                id=""
                onChange={() => {
                  setShowPasswordText(!showPasswordText);
                }}
              />{" "}
              <span>Show password text</span>
              <button type="submit" className="btn btn-primary mt-2 w-100">
                Gửi
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
