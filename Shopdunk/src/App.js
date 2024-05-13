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
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage/>}/>
            <Route path="/product-detail" element={<ProductDetail />}/>
            <Route path="/product/:id" element={<ProductDetailPage />}/>
            <Route path="post/:slug/:id" element={<PostPage/>}/>

          </Route>
          {/* Admin route */}
          <Route path="/admin" element={<LayoutAdmin/>}>
            <Route index element={<AdminPage/>}/>
            <Route path="thong-ke" element={<AdminPage/>}/>
            <Route path="danh-muc" element={<Category/>}/>
            <Route path="tin-tuc" element={<Post/>}/>


        </Route>
        </Routes>
        
      </Router>
    </>
  );
};
export default App;
