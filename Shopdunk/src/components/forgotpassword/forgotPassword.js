import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState();
  const [isSent, setIsSent] = useState(false);
  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center mt-4">
        <div className="">
          <h2>Forgot Password</h2>
          {isSent ? (
            <p>Check mail đi</p>
          ) : (
            <>
              <span>
                Nhập mật khẩu của bạn vào ô bên dưới, chúng tôi sẽ gửi liên kết
                đề cập nhật mật khẩu mới cho bạn.
              </span>
              <form
                method="POST"
                onSubmit={(e) => {
                  e.preventDefault();

                  axios
                    .post("http://localhost:8000/api/forgot-password", {
                      email: email,
                    })
                    .then((res) => {
                      if (res.status === "success"); // In ra dữ liệu phản hồi
                      {
                        setIsSent(true);
                        return;
                      }

                      // Sử dụng dữ liệu phản hồi theo nhu cầu
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="px-2 py-2 rounded"
                />
                <button
                  type="submit"
                  className="ms-2 px-2 py-2 rounded btn btn-primary"
                >
                  Submit
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
