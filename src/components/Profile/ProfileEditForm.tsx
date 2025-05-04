import React from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";

import theme from "../../theme/theme.d";

interface ProfileEditFormProps {
  firstName: string;
  lastName: string;
  onChange: (field: "firstName" | "lastName", value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.shape.borderRadius,
    "& fieldset": {
      borderColor: theme.palette.divider,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderWidth: 2,
      borderColor: theme.palette.primary.main,
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.text.secondary,
    "&.Mui-focused": {
      color: theme.palette.primary.main,
    },
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  fontWeight: 600,
  letterSpacing: 0.5,
  textTransform: "none",

  "&:hover": {
    transform: "translateY(-1px)",
  },
}));

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  firstName,
  lastName,
  onChange,
  onSubmit,
}) => {
  return (
    <Box
      sx={{
        pl: 5,
        pr: 5,
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: theme.palette.text.primary,
          marginBottom: theme.spacing(3),
        }}
      >
        Editare profil
      </Typography>

      <Box component="form" onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              fullWidth
              label="Prenume"
              name="firstName"
              value={firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              fullWidth
              label="Nume"
              name="lastName"
              value={lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton
              type="submit"
              variant="contained"
              fullWidth
              color="primary"
            >
              Salvează modificările
            </SubmitButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProfileEditForm;
