import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { loginGoogle } from "../../services/userServices";
import { useNavigate } from "react-router-dom";

export default function LoginGG({ onGet }) {
  const navigate = useNavigate();
  const handleSuccess = async (res) => {
    // Nếu không gg không trả về jwt thì dừng
    console.log(res.credential);

    if (!res?.credential) return;
    console.log(res);
    
    // Có jwt thì gửi lên sever xử lí
    const response = await loginGoogle(res.credential);
    if(response){
      const dataSaveLocal = {
        id: response.id,
        name: response.username,
        phone: response.phone,
        email: response.email,
        token: response.token,
        image: response.image
      };      
      localStorage.setItem("user", JSON.stringify(dataSaveLocal));
      // window.location.reload();
      // navigate("/");
    }
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
