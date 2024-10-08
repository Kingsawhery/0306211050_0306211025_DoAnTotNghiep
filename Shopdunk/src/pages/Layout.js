import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./Layout.scss";
import { useEffect } from "react";
export default function Layout() {
  
  return (
    <>
      <Header />
      <div className="main">
      <Outlet/>
      </div>
      <Footer />
    </>
  );
}
