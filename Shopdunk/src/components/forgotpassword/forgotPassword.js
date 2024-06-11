import { useState } from "react";
import {
  SendEmailTakeOTP,
  ResetPassword,
  OTP,
} from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import TimeExpired from "./timeExpired";
import InputOtp from "./inputOtp";
import { toast } from "react-toastify";

function ForgotPassword() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [showTime, setShowTime] = useState(false);
  const [isShowPopupOTP, setIsShowPopupOTP] = useState(false);
  const [resetOTP, setResetOTP] = useState();
  const [endTime, setEndTime] = useState(false);
  const [time, setTime] = useState();
  let date = new Date();
  let timeCurrent = date.getTime();

  const handleForgot = _.debounce(async () => {
    if (email === "") {
      return toast.error("Plesea your enter email!");
    } else {
      const takeEmail = await SendEmailTakeOTP(email); // gửi mã otp

      if (takeEmail.data.EC === 0) {
        // setShowTime(true);

        setIsShowPopupOTP(true);
        if (takeEmail.data.DT.timeExpired) {
          console.log(timeCurrent + "/" + takeEmail.data.DT.timeExpired);

          if (timeCurrent < takeEmail.data.DT.timeExpired) {
            // setTime(takeEmail.data.DT.timeExpired - timeCurrent);
          }
        }
        return toast.success("Đã gửi mã OTP");
      } else {
        return toast.error("email is not define");
      }
    }
  }, 1000);

  return (
    <div className="d-flex">
      <form className="m-auto pt-4">
        <h2>Forgot Password</h2>
        <span className="mb-2">
          Điền email và nhấn Gửi, hệ thống sẽ liên kết dùng cập nhật password
          mới về email của bạn.
        </span>
        <br />
        <input
          type="email"
          name="email"
          className="px-2 py-1 rounded"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button
          // onClick={handleForgot}
          type={"submit"}
          className="py-1 px-2 ms-2 bg-primary text-light"
        >
          Lấy mã
        </button>
      </form>
      {isShowPopupOTP && (
        <>
          <InputOtp
            email={email}
            setShowTime={setShowTime}
            setResetOTP={setResetOTP}
            setIsShowPopupOTP={setIsShowPopupOTP}
          />
        </>
      )}
    </div>
  );
}

export default ForgotPassword;
