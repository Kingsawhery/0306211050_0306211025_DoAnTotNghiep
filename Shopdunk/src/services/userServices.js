import instance from "./customAxios";
import axios from "./customAxios";
import axiosFormal from "axios";

const changeUser = async(data) => {  
  try{
    const formData = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(`${key}`, data[key]);
    }
  }
  const rs = await axios.put("/api/change-data-user", formData);
  return rs;
}
  catch(e){
    console.log("Lỗi ở change data user: " , e);
  }
};
const userServices = async(data) => {
  console.log(data);
  
  try{
    const formData = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(`${key}`, data[key]);
    }
    
  }
  const rs = await axios.post("/api/register", formData);
  return rs;
}
  catch(e){
    console.log(e);
  }

};
const getUsers = (page, keyword) => {
  return instance.get(`${process.env.REACT_APP_API_SERVER}/users?page=${page}&keyword=${keyword ? keyword : null}`);
};
const lockUser = (id) => {
  return instance.put(`${process.env.REACT_APP_API_SERVER}/lock-user`,{id:id});
};
const postUser = () => {
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
const handleForgotPassword = (token, password) => {
  return axios.post("api/handle-forgot-password", {
    token,
    password,
  });
};
const handleResetPassword = (email, password, confirmPassword) => {
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
const getInfoUser = async (data)=>{
  try{
    const res = await instance.get(process.env.REACT_APP_API_SERVER + `/get-user?token=${data.token}&id=${data.id}`);

    return res
  }catch(e){
    console.log(e)  ;
    
  }
}

export {
  getInfoUser,
  userServices,
  loginServices,
  SendEmailTakeOTP,
  loginGoogle,
  handleResetPassword,
  handleForgotPassword,
  OTP,
  verifyOtp,
  getUsers,
  postUser,
  changeUser,
  lockUser
};
