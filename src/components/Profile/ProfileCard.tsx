import React, { useRef } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../../Context/AuthContext";
import { useQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "./mutations";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ProfileImage = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(20),
  height: theme.spacing(20),
  margin: "auto",
  cursor: "pointer",
  border: `3px solid ${theme.palette.primary.main}`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const EditIconWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  right: 0,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: "50%",
  padding: theme.spacing(1),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const InfoItem = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
  paddingBottom: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:last-child": {
    borderBottom: "none",
  },
}));

interface ProfileCardProps {
  profileImageUrl: string;
  firstName: string;
  lastName: string;
  email: string;
  onUpload: (file: File) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profileImageUrl,
  firstName,
  lastName,
  email,
  onUpload,
}) => {
  const theme = useTheme();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { data } = useQuery(GET_USER_PROFILE);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      <CardContent
        sx={{
          textAlign: "center",
          padding: "45px",
          background: `linear-gradient(to bottom, ${theme.palette.primary.light} 0%, ${theme.palette.background.paper} 100px)`,
        }}
      >
        <Box>
          <Button
            onClick={handleAvatarClick}
            sx={{
              padding: 0,
              borderRadius: "50%",
              "&:hover": {
                background: "transparent",
              },
            }}
          >
            <ProfileImage src={profileImageUrl} alt="Profile" />
            <EditIconWrapper>
              <EditIcon fontSize="small" />
            </EditIconWrapper>
            <VisuallyHiddenInput
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
            />
          </Button>
        </Box>

        <Typography
          variant="h4"
          sx={{
            mt: 3,
            mb: 1,
            fontWeight: 600,
            color: theme.palette.text.primary,
          }}
        >
          {firstName} {lastName}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            color: theme.palette.text.secondary,
            mb: 4,
          }}
        >
          {email}
        </Typography>

        <Box
          sx={{
            textAlign: "left",
            background: theme.palette.background.default,
            padding: theme.spacing(3),
          }}
        >
          <InfoItem variant="h6">
            <Typography variant="body2">Telefon:</Typography>{" "}
            {data.getCurrentUser?.phone}
          </InfoItem>
          <InfoItem variant="h6">
            <Typography variant="body2">Universitatea:</Typography>{" "}
            {data.getCurrentUser?.university}
          </InfoItem>
          <InfoItem variant="h6">
            <Typography variant="body2">Cămin:</Typography>{" "}
            {"Camin 1, Camera 101"}
          </InfoItem>
          <InfoItem variant="h6">
            <Typography variant="body2">Preferințe:</Typography> Stil de viata:{" "}
            {data.getCurrentUser?.preferences.lifestyle} <br />
            Curățenie: {data.getCurrentUser?.preferences.cleanliness} <br />
            Liniște: {data.getCurrentUser?.preferences.quietness}
          </InfoItem>
        </Box>
      </CardContent>
    </Box>
  );
};

export default ProfileCard;
