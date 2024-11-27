import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Contact, Footer, Intro } from "../../components";
import { path } from "../../ultils/constant";
import Header from "./Header";
import { Navigation, Search } from "./index";
import ContactInfo from "../../components/ContactInfo";

const Home = () => {
  const location = useLocation();
  const isLoginOrRegisterPage =
    location.pathname.includes("/login") ||
    location.pathname.includes("/register") ||
    location.pathname.includes("/lien-he") ||
    location.pathname.includes("/yeu-thich"); // Thêm điều kiện cho trang yêu thích

  return (
    <div className="w-full flex gap-1 flex-col items-center h-full">
      <Header />
      <Navigation />
      {!isLoginOrRegisterPage && !location.pathname.includes(path.DETAIL) && (
        <Search />
      )}
      <div className="w-4/5 lg:w-3/5 flex flex-col items-start justify-start mt-3">
        <Outlet />
      </div>

      <Intro />
      <Contact />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default Home;
