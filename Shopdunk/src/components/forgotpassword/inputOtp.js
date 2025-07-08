import { divide } from "lodash";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import TimeExpired from "./timeExpired";
import { verifyOtp } from "../../services/userServices";
import { SendEmailTakeOTP } from "../../services/userServices";

export default function InputOtp({
  email,
  setShowTime,
  setIsShowPopupOTP,
  setResetOTP,
}) {
  const [endTime, setEndTime] = useState(false);
  const [otp, setOtp] = useState("");
  const data = [TimeExpired];

  const handleClick = async () => {
    const result = await verifyOtp(otp);
  };

  const handleClickResend = async () => {
    const takeEmail = await SendEmailTakeOTP(email);
    if (takeEmail.data.EC === 0) {
      setShowTime(true);
      setResetOTP(true);
      setIsShowPopupOTP(true);
    }
  };

  return (
    <div className="pd-8 bg-green">
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={4}
        separator={<span>-</span>}
        inputStyle={{ width: "40px", height: "40px" }}
        focusStyle={{ borderColor: "red" }}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
      />

      {!endTime && (
        <button
          type="button"
          className="btn btn-primary mt-2"
          onClick={() => handleClick()}
        >
          Xác thực
        </button>
      )}

      {endTime && (
        <button
          type="button"
          className="btn btn-primary mt-2"
          onClick={() => handleClickResend()}
        >
          Gửi lại mã
        </button>
      )}
    </div>
  );
}
