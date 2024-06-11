import axios from "axios";
const instance = axios.create({
  baseURL: process.env.REACT_APP_LOCALHOST_SERVER,
});
instance.interceptors.response.use((res) => {
  return res.data.data;
});
export default instance;
