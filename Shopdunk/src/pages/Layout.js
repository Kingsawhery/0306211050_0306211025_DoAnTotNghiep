import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./Layout.scss";
import { useEffect } from "react";
import { checkToken } from "../function/checkToken";
import MessengerChat from "../components/Messenger/MessengeButton";
export default function Layout() {

  return (
    <>
      <Header />
      <div className="main">
      <Outlet/>
      </div>
      <Footer />
      <MessengerChat/>

    </> 
  );
}
