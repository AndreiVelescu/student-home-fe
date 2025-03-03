import { ReactNode } from "react";
import Header from "./components/Header";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
