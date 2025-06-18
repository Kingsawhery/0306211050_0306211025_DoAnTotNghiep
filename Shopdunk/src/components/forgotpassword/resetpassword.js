import { useState } from "react";
import { handleForgotPassword } from "../../services/userServices";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

function ResetPassword() {
  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [submitButton, setSubmitButton] = useState(false);

  const handleReset = async () => {
    if (submitButton) return;
    setSubmitButton(true);
    const reset = await handleForgotPassword(token, password);
    if (reset.status === "fail") {
      toast(reset.message);
      setTimeout(() => {
        setSubmitButton(false);
      }, 3000);
    } else {
      navigate("/login");
      setTimeout(() => {
        setSubmitButton(false);
      }, 3000);
      toast("✅ Đổi mật khẩu thành công!");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h4 className="text-center mb-4 text-secondary">🔐 Thay đổi mật khẩu</h4>
        <div className="mb-3">
          <input
            className="form-control w-100"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu mới"
            required
          />
        </div>
        <button
          className="btn btn-outline-secondary w-100"
          disabled={submitButton}
          onClick={handleReset}
        >
          {submitButton ? "Đang xử lý..." : "Xác nhận"}
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
