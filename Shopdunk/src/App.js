import {
  BrowserRouter as Router,
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Layout from "./pages/Layout";
import LayoutAdmin from "./view/pages/Admin/Layout/Layout";
import HomePage from "./view/pages/User/HomePage/Homepage";
import ProductDetail from "./view/pages/User/ProductDetail/ProductDetailPage";
import ProductDetailPage from "./view/pages/User/ProductDetail/ProductDetailPage";
import AdminPage from "./view/pages/Admin/AdminPage";
import Category from "./view/pages/Admin/Management/Category/Category";
import Post from "./view/pages/Admin/Management/Post/Post";
import PostPage from "./view/pages/User/PostPage/PostPage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ForgotPassword from "./components/forgotpassword/forgotPassword";
import InputOtp from "./components/forgotpassword/inputOtp";
import Cart from "./components/Cart/Cart";
import CreateNewProduct from "./view/pages/Admin/Management/Product/CreateNewProduct";
import User from "./view/pages/Admin/Management/User/User";
import NotFoundPage from "./components/NoPage/NotFoundPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryPage from "./view/pages/User/CategoryPage/CategoryPage";
import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { apiShowCart } from "./services/cartService";
import {  checkAdminRole, checkToken } from "./function/checkToken";
import UserInfor from "./view/pages/User/UserInfor/UserInfor";
import { Invoices } from "./view/pages/Admin/Management/Invoices/Invoices";
import TableSubProduct from "./components/Table/SubProd/subproduct";
import ResetPassword from "./components/forgotpassword/resetpassword";
import ListPost from "./view/pages/Admin/Management/Post/ListPost";
import EditPost from "./view/pages/Admin/Management/Post/EditPost";
import Brand from "./view/pages/Admin/Management/Brand/Brand";
import Promotion from "./view/pages/Admin/Management/Promotion/Promotion";
const App = () => {
  const user = localStorage.getItem("user");
  const [totalCart, setTotalCart] = useState(0);
  const [tokenTrue, setTokenTrue] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  
useEffect(() => {
  const init = async () => {
    await check();
    setLoading(false);
  };
  init();
}, []);
  const check = async () => {
    const checkData = await checkToken();
    if (checkData.EC !== 1) {
      setTokenTrue(true);
      if (user && JSON.parse(user).token) {
        handleGetData();
      } else {
        localStorage.clear();
      }
    }
    else {
      setTokenTrue(false);
      localStorage.clear();
    }
    return checkData;
  }
  
  const handleGetData = async () => {
    if (JSON.parse(user).id && JSON.parse(user).token) {
      const data = {
        userId: JSON.parse(user).id,
        token: JSON.parse(user).token,
      };
      const dataRs = await apiShowCart(data);
      console.log(dataRs);

      if (dataRs && dataRs.data.EC !== 1) {
        setTotalCart(dataRs.data.total);

      } else {
        localStorage.clear();
      }
    }
  };
  return (
    <>
      <Context.Provider
        value={{ totalCart, setTotalCart }}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/product-detail" element={<ProductDetail />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="post/:slug/:id" element={<PostPage />} />
              <Route path="/category/:name" element={<CategoryPage />} />
              <Route path="/user-information" element={<UserInfor />} />
              
              {user && tokenTrue && (
                <>
                  <Route path="/cart" element={<Cart />} />
                </>
              )}

              {!user && (
                <>
                  <Route path="/login" element={<Login />}></Route>
                  <Route path="/register" element={<Register />}></Route>
                  <Route
                    path="/reset-password"
                    element={<ResetPassword />}
                  ></Route>
                  <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                  ></Route>
                  <Route path="/otp" element={<InputOtp />}></Route>
                </>
              )}
            </Route>
            <Route path="/admin" element={<LayoutAdmin  />}>
                <Route index element={<AdminPage />} />
                <Route path="thong-ke" element={<AdminPage />} />
                <Route path="danh-muc" element={<Category />} />
                <Route path="sub-prod/:idSub" element={<TableSubProduct />} />

                <Route path="tin-tuc" element={<ListPost />} />
                <Route path="tin-tuc/:id" element={<EditPost />} />
                <Route path="tin-tuc/tao-moi" element={<Post />} />
                <Route path="promotions" element={<Promotion />} />

                <Route path="create-product" element={<CreateNewProduct />} />
                <Route path="user" element={<User />}></Route>
                <Route path="brands" element={<Brand />}></Route>

                <Route path="invoice" element={<Invoices />}></Route>
              </Route>
            

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        
          
      

        </Router>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ToastContainer />
      </Context.Provider>
    </>

  );
};
export default App;
export const Context = createContext(null);
