import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { loginGoogle } from "../../services/userServices";

export default function LoginGG({ onGet }) {
  const handleSuccess = async (res) => {
    // Nếu không gg không trả về jwt thì dừng
    console.log(res.credential);

    if (!res?.credential) return;

    // Có jwt thì gửi lên sever xử lí
    const response = await loginGoogle(res.credential);
    console.log(response);
    onGet(response);
  };

  return (
    <GoogleLogin
      clientId="893391151246-qbd3i6uctc7guvur5etsa4s7l963jakc.apps.googleusercontent.com"
      onSuccess={handleSuccess}
      onError={(errors) => {
        console.log(errors);
      }}
    />
  );
}
