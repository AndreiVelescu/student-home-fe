import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import theme from "../theme/theme.d"; 

export interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  status: boolean;
}

interface MessageContainerProps {
  message: Notification;
}

const MessageContainer: React.FC<MessageContainerProps> = ({ message }) => {
  return (
    <Box>
      <Stack
        sx={{
          boxShadow: theme.shadows[2], // Folosește umbra din tema
          borderRadius: "20px", // Folosește borderRadius din tema
          padding: 2,
          backgroundColor: theme.palette.success.light,
          color: theme.palette.primary.contrastText,
          marginBottom: "10px",
        }}
      >
        <Typography variant="h6">{message.title}</Typography>
      </Stack>
      <Stack
        sx={{
          boxShadow: theme.shadows[1], // Folosește umbra din tema
          borderRadius: "20px", // Folosește borderRadius din tema
          padding: 2,
          backgroundColor: theme.palette.success.light,
          color: theme.palette.primary.contrastText,
          marginBottom: "10px",
          wordWrap: "break-word", // Permite cuvintelor să se împartă
          whiteSpace: "normal", // Permite împărțirea textului în linii noi
          overflow: "auto", // Permite derularea textului dacă este prea lung
        }}
      >
        <Typography color="white">{message.message}</Typography>
      </Stack>

      <Stack
        sx={{
          boxShadow: theme.shadows[1], // Folosește umbra din tema
          borderRadius: "20px", // Folosește borderRadius din tema
          padding: 2,
          backgroundColor: theme.palette.success.light,
          color: theme.palette.primary.contrastText,
          marginBottom: "10px",
        }}
      >
        <Typography variant="h6" color="white">
          {new Date(message.createdAt).toLocaleString()}
        </Typography>
      </Stack>
    </Box>
  );
};

export default MessageContainer;
