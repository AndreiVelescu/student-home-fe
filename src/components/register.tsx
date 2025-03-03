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
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SignUpContainer
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
              Înregistrare
            </Typography>
            <Box
              component="form"
              onSubmit={handleAddUser}
              noValidate
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
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
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
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
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  },
                }}
              />
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                variant="outlined"
                sx={{
                  backgroundColor: "#fff",
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
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
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{
                  borderRadius: "8px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.4s ease",

                  "&:hover": {
                    backgroundColor: "primary.light",
                    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
                    transform: "scale(1.01)",
                    transition: "transform 0.4s ease",
                  },
                }}
              >
                {loading ? <CircularProgress size={24} /> : "Înregistrează-te"}
              </Button>
              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
            </Box>
          </Card>
          <Snackbar
            open={openSnackBar}
            onClose={handleCloseSnackBar}
            message="Utilizator înregistrat cu succes!"
            autoHideDuration={3000}
          />
        </SignUpContainer>
      </ThemeProvider>
    </>
  );
};

export default AddUserForm;
