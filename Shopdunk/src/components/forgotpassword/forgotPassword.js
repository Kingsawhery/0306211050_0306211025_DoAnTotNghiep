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
    <div>
      <h2>Forgot Password</h2>
      {/* <TimeExpired
        start={true}
        time={!time ? 0 : time}
        onChange={(value) => {
          setEndTime(value);
          return 1;
        }}
      ></TimeExpired> */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
      <button onClick={handleForgot}>Submit</button>

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
