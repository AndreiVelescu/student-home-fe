import { ReactNode } from "react";
import Header from "./components/Header";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme.d";

const Layout = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />

        <main>
          <Outlet />
        </main>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default Layout;
