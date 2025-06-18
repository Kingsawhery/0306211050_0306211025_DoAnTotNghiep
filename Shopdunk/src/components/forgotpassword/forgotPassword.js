import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [expired, setExpired] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer;
    if (isSent && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (isSent && countdown === 0) {
      setExpired(true);
    }
    return () => clearInterval(timer);
  }, [isSent, countdown]);

  return (
    <div className="py-5" style={{ minHeight: "80vh", backgroundColor: "#f8f9fa" }}>
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <div className="card shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
          <h3 className="mb-4 text-center text-secondary">Quên mật khẩu</h3>
          {isSent ? (
            <div className="alert alert-success text-center">
              <strong>✅ Đã gửi!</strong> Vui lòng kiểm tra email của bạn.
              {expired ? (
                <div className="text-danger mt-2">⛔ Đã hết hạn</div>
              ) : (
                <div style={{ textAlign: "center" }} className="mt-2">
                  <div>⏳ Liên kết hết hạn sau:</div>
                  <div style={{ fontSize: "30px" }}>{countdown}s</div>
                </div>
              )}
            </div>
          ) : (
            <>
              <p className="mb-3 text-secondary">
                Nhập email của bạn, chúng tôi sẽ gửi liên kết để cập nhật mật khẩu mới.
              </p>
              <form
                method="POST"
                onSubmit={(e) => {
                  e.preventDefault();
                  setError("");
                  setIsLoading(true); // disable button

                  axios
                    .post("http://localhost:8000/api/forgot-password", {
                      email: email,
                    })
                    .then((res) => {
                      console.log(res);

                      if (res.data.status === "success") {
                        setIsSent(true);
                        setExpired(false);
                        setCountdown(60);
                        setIsLoading(false); // bật lại ngay nếu thành công
                      } else {
                        toast("Không tìm thấy email trong hệ thống!");
                        // Chặn spam trong 3 giây
                        setTimeout(() => {
                          setIsLoading(false);
                        }, 3000);
                      }
                    })
                    .catch((error) => {
                      setError("Không thể gửi email. Vui lòng thử lại.");
                      console.error(error);
                      // Cũng chặn spam khi lỗi xảy ra
                      setTimeout(() => {
                        setIsLoading(false);
                      }, 3000);
                    });
                }}
              >
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email của bạn"
                    required
                    className="form-control w-100"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-secondary w-100"
                  disabled={isLoading || (isSent && !expired)}
                >
                  {isLoading ? "Đang gửi..." : "Gửi liên kết đặt lại mật khẩu"}
                </button>
              </form>
              {error && <div className="text-danger mt-2 text-center">{error}</div>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
