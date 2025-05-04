import React from "react";
import { Box, Typography, Link } from "@mui/material";
import theme from "../theme/theme.d";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        background: theme.palette.primary.main,
        color: "white",
        py: 4,
        display: "flex",
        flexDirection: "column",

        alignItems: "center",
        justifyContent: "center",

        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        bottom: "auto",
      }}
    >
      <Typography variant="body2" sx={{ mb: 1, fontWeight: "medium" }}>
        &copy; {new Date().getFullYear()} eCamin. All rights reserved.
      </Typography>
      <Box sx={{ display: "flex", gap: 3 }}>
        <Link
          href="/terms"
          color="inherit"
          underline="hover"
          sx={{
            transition: "color 0.3s ease",
            "&:hover": {
              color: theme.palette.secondary.light,
            },
          }}
        >
          Terms of Service
        </Link>
        <Link
          href="/privacy"
          color="inherit"
          underline="hover"
          sx={{
            transition: "color 0.3s ease",
            "&:hover": {
              color: theme.palette.secondary.light,
            },
          }}
        >
          Privacy Policy
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
