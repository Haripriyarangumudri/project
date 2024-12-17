import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Header1 from "../components/Header1";

function MainLayout({ children, isLoggedIn }) {
  return (
    <>
      {isLoggedIn ? <Header /> : <Header1 />}
      {children}
      <Footer />
    </>
  );
}

export default MainLayout;
