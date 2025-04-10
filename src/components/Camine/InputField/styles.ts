import styled from "@emotion/styled";
import {
  inputLabelClasses,
  InputLabel as MuiInputLabel,
  OutlinedInput as MuiOutlinedInput,
  outlinedInputClasses,
} from "@mui/material";

interface OutlinedInputProps {
  invisible?: boolean;
}

export const OutlinedInput = styled(MuiOutlinedInput, {
  shouldForwardProp: (prop) => !["invisible"].includes(prop),
})<OutlinedInputProps>(({ invisible }) => ({
  "& input:-webkit-autofill, input:-webkit-autofill:focus": {
    boxShadow: "0 0 0 1000px #ffffff inset", // theme.palette.background.paper
    WebkitTextFillColor: "#2d3436", // theme.palette.text.primary
  },
  backgroundColor: "#ffffff", // theme.palette.background.paper
  paddingBottom: 0,
  ...(invisible
    ? {
        [`.${outlinedInputClasses.input}`]: {
          paddingLeft: "10px", // theme.spacing(1.25)

          [`&.${outlinedInputClasses.disabled}`]: {
            color: "#2d3436", // theme.palette.text.primary
            WebkitTextFillColor: "#2d3436", // theme.palette.text.primary
          },
        },
        [`.${outlinedInputClasses.notchedOutline}`]: {
          border: "none",
        },
      }
    : {}),
}));

interface InputLabelProps {
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
}

export const InputLabel = styled(MuiInputLabel)<InputLabelProps>(
  ({ color }) => {
    // Colors from your theme
    const textColors = {
      primary: "#2d3436", // theme.palette.text.primary
      secondary: "#636e72", // theme.palette.text.secondary
      disabled: "#b2bec3", // theme.palette.text.disabled
    };

    const paletteColors = {
      primary: "rgba(38, 166, 153, 0.68)", // theme.palette.primary.main
      secondary: "#ff9800", // theme.palette.secondary.main
      error: "rgba(244, 67, 54, 0.71)", // theme.palette.error.main
      warning: "#ffc107", // theme.palette.warning.main
      info: "#2196f3", // theme.palette.info.main
      success: "#4caf50", // theme.palette.success.main
    };

    return {
      color: color ? paletteColors[color] : textColors.secondary,
      fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif", // theme.typography.fontFamily
      [`&.${inputLabelClasses.disabled}`]: {
        color: textColors.disabled,
      },
      [`&.${inputLabelClasses.focused}`]: {
        color: paletteColors.primary, // theme.palette.primary.main
      },
    };
  }
);
