import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  CircularProgress,
  Typography,
  Snackbar,
  CssBaseline,
} from "@mui/material";
import { styled, ThemeProvider } from "@mui/material/styles";
import { useMutation, gql } from "@apollo/client";
import MuiCard from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import theme from "../theme/theme.d";
import RegisterSvg from "../assets/RegisterSvg.svg";

const SignUpContainer = styled(Stack)(({ theme }) => ({
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

const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  width: "100%",
}));

const CREATE_ONE_USER = gql`
  mutation SignUp(
    $email: String!
    $password: String!
    $lastName: String!
    $firstName: String!
  ) {
    signUp(
      email: $email
      password: $password
      lastName: $lastName
      firstName: $firstName
    ) {
      accessToken
      refreshToken
    }
  }
`;

const AddUserForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const navigate = useNavigate();

  const [signUp, { loading }] = useMutation(CREATE_ONE_USER, {
    onError: (err) => {
      setError(err.message);
    },
    onCompleted: () => {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setError("");
      setOpenSnackBar(true);
      navigate("/");
    },
  });

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      setError("Toate câmpurile sunt obligatorii.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Te rog introdu un email valid.");
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Parola trebuie să conțină cel puțin 8 caractere, inclusiv litere și cifre."
      );
      return;
    }

    try {
      await signUp({
        variables: {
          email: email,
          password: password,
          lastName: lastName,
          firstName: firstName,
        },
      });
    } catch (err) {
      console.error("Eroare la mutație:", err);
    }
  };

  const handleCloseSnackBar = () => setOpenSnackBar(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SignUpContainer
        direction={{ xs: "column", md: "row" }}
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flex: 1,
            maxWidth: "500px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={RegisterSvg}
            alt="Registration Illustration"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "500px",
              filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))",
            }}
          />
        </Box>
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{
              textAlign: "center",
              fontSize: "clamp(2rem, 10vw, 2.15rem)",
              color: "primary.main",
              fontWeight: 700,
              mb: 2,
            }}
          >
            Înregistrare
          </Typography>
          <FormContainer component="form" onSubmit={handleAddUser} noValidate>
            <TextField
              label="Prenume"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              required
              variant="outlined"
              sx={{
                backgroundColor: "#fff",
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                  transition: "box-shadow 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.12)",
                  },
                },
                "& .Mui-focused": {
                  boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.2)",
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "text.secondary",
                },
              }}
            />
            <TextField
              label="Nume"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              required
              variant="outlined"
              sx={{
                backgroundColor: "#fff",
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                  transition: "box-shadow 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.12)",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "text.secondary",
                },
              }}
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              id="email"
              type="email"
              name="email"
              placeholder="exemplu@email.com"
              required
              variant="outlined"
              sx={{
                backgroundColor: "#fff",
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                  transition: "box-shadow 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.12)",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "text.secondary",
                },
              }}
            />
            <TextField
              label="Parolă"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              type="password"
              variant="outlined"
              sx={{
                backgroundColor: "#fff",
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                  transition: "box-shadow 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.12)",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "text.secondary",
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              size="large"
              sx={{
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                py: 1.5,
                mt: 1,
                fontSize: "1rem",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "primary.dark",
                  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
                  transform: "translateY(-1px)",
                },
                "&:active": {
                  transform: "translateY(0)",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Înregistrează-te"
              )}
            </Button>
            {error && (
              <Typography
                color="error"
                sx={{
                  mt: 1,
                  textAlign: "center",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}
              >
                {error}
              </Typography>
            )}
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                mt: 2,
                color: "text.secondary",
              }}
            >
              Ai deja cont?{" "}
              <Button
                onClick={() => navigate("/login")}
                sx={{
                  textTransform: "none",
                  p: 0,
                  minWidth: "auto",
                  color: "primary.main",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "transparent",
                    textDecoration: "underline",
                  },
                }}
              >
                Autentifică-te
              </Button>
            </Typography>
          </FormContainer>
        </Card>
        <Snackbar
          open={openSnackBar}
          onClose={handleCloseSnackBar}
          message="Utilizator înregistrat cu succes!"
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{
            "& .MuiSnackbarContent-root": {
              backgroundColor: "success.main",
              color: "common.white",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            },
          }}
        />
      </SignUpContainer>
    </ThemeProvider>
  );
};

export default AddUserForm;
