import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#4caf50", // verde deschis
      main: "#388e3c", // verde principal
      dark: "#1b5e20", // verde inchis
      contrastText: "#ffffff", // text alb pentru contrast
    },
    secondary: {
      light: "#ff8a80", // rosu deschis
      main: "#ff5252", // rosu principal
      dark: "#d50000", // rosu inchis
      contrastText: "#ffffff", // text alb
    },
    background: {
      default: "#f4f6f8", //gri deschis pentru fundal
      paper: "#ffffff", // alb pentru carduri sau ferestre popup
    },
    text: {
      primary: "#212121", // negru pentru textul principal
      secondary: "#757575", // gri pentru text secundar
    },
  },
});

export default theme;
