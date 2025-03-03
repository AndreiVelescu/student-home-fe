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

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  borderRadius: "12px",
  backgroundColor: theme.palette.background.paper,
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
  minHeight: "100%",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
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
        navigate("/home");
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
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SignInContainer
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Card variant="outlined">
            <Typography
              component="h1"
              variant="h4"
              sx={{
                textAlign: "center",
                fontSize: "clamp(2rem, 10vw, 2.15rem)",
                color: "primary.main",
              }}
            >
              Autentificare
            </Typography>
            <Box
              component="form"
              onSubmit={handleSignIn}
              noValidate
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{
                  borderRadius: "8px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    backgroundColor: "primary.light",
                    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
                    transform: "scale(1.01)",
                    transition: "transform 0.4s ease",
                  },
                }}
              >
                {loading ? <CircularProgress size={24} /> : "Intra"}
              </Button>
              <Typography sx={{ textAlign: "center" }}>
                Nu ai cont?{" "}
                <Link href="/register" variant="body2" color="primary">
                  Inregistreaza-te
                </Link>
              </Typography>
            </Box>
          </Card>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              Error: {error.message}
            </Typography>
          )}
        </SignInContainer>
      </ThemeProvider>
    </div>
  );
};

export default LoginForm;
