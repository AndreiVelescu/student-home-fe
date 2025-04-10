import { LockOutlined } from "@mui/icons-material";
import { Box, Link, Paper, Typography } from "@mui/material";
import { ReactNode } from "react";

export const SectionView = ({
  children,
  locked,

  onPricingOpen,
}: {
  children: ReactNode;

  locked?: boolean;
  onPricingOpen?: () => void;
}) => {
  return (
    <Paper
      elevation={2}
      sx={{
        mx: "auto",
        mt: 2,
        mb: 1,
        px: 3,
        py: 2,

        sm: {
          mx: "auto",
          mt: 4,
          mb: 1,
          px: 6,
          py: 3,
        },
        border: "1px solid #f0f0f0",
        borderRadius: 1,
        backgroundColor: "#f9f9f9",
      }}
    >
      {children}
    </Paper>
  );
};
