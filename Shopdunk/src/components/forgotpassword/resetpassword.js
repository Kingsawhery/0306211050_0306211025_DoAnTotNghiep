import { useState } from "react";
import { SendEmailTakeOTP, ResetPassword } from "../../services/userServices";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = async () => {
    const reset = await ResetPassword(email, password, confirmPassword);
  };

  return (
    <div>
      <div className="reset-password">
        <h4 className="reset">Thay đổi mật khẩu</h4>
        <input
          className="enter_email"
          type="password"
          value={password}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <input
          className="enter_email"
          type="password"
          value={confirmPassword}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button
          className=" btn btn btn-outline-secondary mx-2 "
          onClick={handleReset}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
