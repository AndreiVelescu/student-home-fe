import React, { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { styled, ThemeProvider } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import theme from "../theme/theme.d";

import LoginSvg from "../assets/LoginSvg.svg";

interface component {
  component: string;
}

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(3),
  margin: "auto",
  maxWidth: "450px",
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.08)",
  borderRadius: "16px",
  backgroundColor: theme.palette.background.paper,
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
  minHeight: "100%",
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
}));

const FormContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  width: "100%",
  maxWidth: "450px",
});

const ImageContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  padding: "20px",
});

const InputField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  "& .MuiInputBase-root": {
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
    },
    "&.Mui-focused": {
      boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
    },
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  padding: "12px",
  borderRadius: "8px",
  fontWeight: 600,
  letterSpacing: "0.5px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
  },
}));

const SIGN_IN = gql`
  query SignIn($email: String!, $password: String!) {
    SignIn(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

const LoginForm = () => {
  const { login, loadCurrentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const navigate = useNavigate();

  const [signIn, { loading, error }] = useLazyQuery(SIGN_IN, {
    onCompleted: async (data) => {
      if (data.SignIn?.accessToken) {
        login(data.SignIn?.accessToken, data.SignIn?.refreshToken);
        await loadCurrentUser();
        navigate("/");
      }
    },
  });

  const validateInputs = () => {
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Introdu emailul valid");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password || password.length < 8) {
      setPasswordError(true);
      setPasswordErrorMessage("Parola nu poate fi mai mica de 8 caractere!");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInputs()) {
      await signIn({ variables: { email, password } });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SignInContainer>
        <FormContainer
          component="form"
          onSubmit={handleSignIn}
          sx={{ pl: "122px" }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              textAlign: "center",
              mb: 3,
              fontWeight: 600,
              color: "primary.main",
            }}
          >
            Bun venit înapoi
          </Typography>

          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="exemplu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              variant="outlined"
              sx={{
                backgroundColor: "#fff",
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                },
              }}
            />
          </FormControl>
          <FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormLabel htmlFor="password">Parola</FormLabel>
            </Box>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              id="password"
              type="password"
              name="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              variant="outlined"
              sx={{
                backgroundColor: "#fff",
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                },
              }}
            />
          </FormControl>

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Tine-ma minte"
          />

          {error && (
            <Typography color="error" textAlign="center">
              {error.message.includes("credentials")
                ? "Email sau parolă incorectă"
                : "Eroare la autentificare"}
            </Typography>
          )}

          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            size="large"
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Autentifică-te"
            )}
          </SubmitButton>

          <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
            Nu ai un cont?{" "}
            <Link
              component={require("react-router-dom").Link}
              to="/register"
              fontWeight={600}
            >
              Înregistrează-te
            </Link>
          </Typography>
        </FormContainer>

        <ImageContainer>
          <img
            src={LoginSvg}
            alt="Login illustration"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </ImageContainer>
      </SignInContainer>
    </ThemeProvider>
  );
};

export default LoginForm;
