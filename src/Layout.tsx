import { ReactNode } from "react";
import Header from "./components/Header";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import { Box, ThemeProvider } from "@mui/material";
import theme from "./theme/theme.d";
import { ProfileImageProvider } from "./Context/ProfileImageContext";

const Layout = () => {
  return (
    <ProfileImageProvider>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Header />
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
            }}
          >
            <Outlet />
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </ProfileImageProvider>
  );
};

export default Layout;
