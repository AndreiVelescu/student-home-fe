import React from "react";
import { Box, Typography, Link } from "@mui/material";
import theme from "../theme/theme.d";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: theme.palette.primary.main,
        color: "white",
        py: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt: "auto",
        position: "absolute",
        bottom: "auto",
        marginTop: 3,
      }}
    >
      <Typography variant="body2" sx={{ mb: 1 }}>
        &copy; {new Date().getFullYear()} eCamin. All rights reserved.
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Link href="/terms" color="inherit" underline="hover">
          Terms of Service
        </Link>
        <Link href="/privacy" color="inherit" underline="hover">
          Privacy Policy
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
