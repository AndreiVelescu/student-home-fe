import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#6ddfd8", // Turcoaz deschis
      main: "#26a699", // Turcoaz principal (o nuanță modernă și calmă)
      dark: "#00766c", // Turcoaz închis
      contrastText: "#ffffff", // Text alb pentru contrast
    },
    secondary: {
      light: "#ffb74d", // Portocaliu deschis
      main: "#ff9800", // Portocaliu principal (o culoare energică și caldă)
      dark: "#f57c00", // Portocaliu închis
      contrastText: "#ffffff", // Text alb
    },
    error: {
      light: "#e57373", // Roșu deschis
      main: "rgba(244, 67, 54, 0.71)", // Roșu principal
      dark: "#d32f2f", // Roșu închis
      contrastText: "#ffffff", // Text alb
    },
    warning: {
      light: "#ffd54f", // Galben deschis
      main: "#ffc107", // Galben principal
      dark: "#ffa000", // Galben închis
      contrastText: "#212121", // Text negru pentru contrast
    },
    info: {
      light: "#64b5f6", // Albastru deschis
      main: "#2196f3", // Albastru principal
      dark: "#1976d2", // Albastru închis
      contrastText: "#ffffff", // Text alb
    },
    success: {
      light: "#81c784", // Verde deschis
      main: "#4caf50", // Verde principal
      dark: "#388e3c", // Verde închis
      contrastText: "#ffffff", // Text alb
    },
    background: {
      default: "#f5f5f5", // Gri foarte deschis pentru fundal
      paper: "#ffffff", // Alb pentru carduri sau ferestre popup
    },
    text: {
      primary: "#2d3436", // Gri închis pentru textul principal
      secondary: "#636e72", // Gri mediu pentru text secundar
      disabled: "#b2bec3", // Gri deschis pentru text dezactivat
    },
  },
  typography: {
    fontFamily: [
      "Poppins", // Un font modern și curat
      "Roboto",
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
      color: "#2d3436", // Gri închis pentru titluri
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
      color: "#2d3436",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
      color: "#2d3436",
    },
    body1: {
      fontSize: "1rem",
      color: "#2d3436",
    },
    body2: {
      fontSize: "0.875rem",
      color: "#636e72", // Gri mediu pentru text secundar
    },
  },
  shape: {
    borderRadius: 12, // Colțuri rotunjite pentru un aspect modern
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Butoane fără text uppercase
          borderRadius: 8, // Rotunjire moderată pentru butoane
          fontWeight: 500, // Text mai gros pentru butoane
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Umbră subtilă pentru carduri
          borderRadius: 12, // Colțuri rotunjite pentru carduri
        },
      },
    },
  },
});

export default theme;
