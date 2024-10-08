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
import { useEffect } from "react";
const App = () => {
  const user = localStorage.getItem("user");

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/product-detail" element={<ProductDetail />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="post/:slug/:id" element={<PostPage />} />
            <Route path="/category/:name" element={<CategoryPage />} />
            {user && (
              <>
                <Route path="/cart" element={<Cart />} />
              </>
            )}
            {!user && (
              <>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route
                  path="/forgot-password"
                  element={<ForgotPassword />}
                ></Route>
                <Route path="/otp" element={<InputOtp />}></Route>
              </>
            )}
          </Route>
          {/* Admin route */}
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route index element={<AdminPage />} />
            <Route path="thong-ke" element={<AdminPage />} />
            <Route path="danh-muc" element={<Category />} />
            <Route path="tin-tuc" element={<Post />} />
            <Route path="create-product" element={<CreateNewProduct />} />
            <Route path="user" element={<User />}></Route>
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
    </>
  );
};
export default App;
