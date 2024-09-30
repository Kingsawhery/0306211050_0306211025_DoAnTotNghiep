import axios from "./customAxios";
import axiosFormal from "axios";

const userServices = async(email, username, phone, password,role) => {
  try{
    const rs = await axios.post("/api/register", {
      email,
      username,
      phone,
      password,
      role
    });
    console.log(rs);
    return rs;
  }catch(e){
    console.log(e);
  }
  
};
const getUsers = (page) => {
  return axios.get(`/api/users?page=${page}`);
};
const PostUser = () => {
  return axios.post(`/api/users/create-user`);
};
const SendEmailTakeOTP = async (email) => {
  try {
    const response = await axiosFormal.post(
      "http://localhost:8000/api/forgot-password",
      {
        email,
      }
    );
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
const OTP = async () => {
  try {
    const response = await axiosFormal.get("http://localhost:8000/api/otp");
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
const ResetPassword = (email, password, confirmPassword) => {
  axios.post("api/reset-password", {
    email,
    password,
    confirmPassword,
  });
};

const clientId =
  "893391151246-qbd3i6uctc7guvur5etsa4s7l963jakc.apps.googleusercontent.com";

const loginServices = async (value, password) => {
  try {
    const res = await axiosFormal.post(
      "http://localhost:8000/api/login",
      {
        value,
        password,
      },
      {
        //config cookies cho phep tat ca
        withCredentials: true,
      }
    );
    console.log(res);
    return res;
  } catch (e) {
    console.log(e); // Xử lý lỗi
    throw e; // Ném lỗi lên để nó có thể được xử lý bởi component gọi hàm này
  }
};

const loginGoogle = async (access_token) => {
  try {
    const res = await axios.post("/api/auth/google", {
      access_token: access_token,
    });
    return res;
  } catch (error) {
    console.log("error login gg api: ", error);
  }
};

const verifyOtp = async (code) => {
  try {
    const response = await axios.post("/api/check-otp");
    return response.data;
  } catch (error) {
    console.log("error");
  }
};
export {
  userServices,
  loginServices,
  SendEmailTakeOTP,
  loginGoogle,
  ResetPassword,
  OTP,
  verifyOtp,
  getUsers,
  PostUser,
};
