import React from "react";
import { Box, Typography, Button, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ErrorOutline as ErrorOutlineIcon } from "@mui/icons-material";
import theme from "../theme/theme.d";

const ErrorComponent = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
          textAlign: "center",
          flexDirection: "column",
          padding: 3,
        }}
      >
        <ErrorOutlineIcon
          sx={{
            fontSize: 120,
            color: theme.palette.error.main,
            marginBottom: 3,
          }}
        />

        <Typography
          variant="h1"
          color="error"
          sx={{ fontSize: "100px", fontWeight: "bold" }}
        >
          404
        </Typography>
        <Typography variant="h5" color="textSecondary" sx={{ marginBottom: 2 }}>
          Oops! Pagina pe care o căutați nu există.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={handleGoHome}
          sx={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "12px",
            boxShadow: 3,
            "&:hover": {
              boxShadow: 6,
            },
          }}
        >
          Întoarce-te la Pagina Principală
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default ErrorComponent;
