import React, { useState } from "react";
import {
  Box,
  Button,
  Collapse,
  Typography,
  useTheme,
  Grid,
  Card,
  CardMedia,
  Chip,
  Stack,
  Divider,
  IconButton,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description";
import theme from "../../../theme/theme.d";

interface RequestType {
  id: number;
  aplicantName: string;
  applicantFirstName: string;
  applicantEmail: string;
  applicantPhone: string;
  applicantAddress: string;
  applicantCity: string;
  applicantState: string;
  applicantUniversity: string;
  applicantDormitoryPreference: string;
  buletinFrontUrl: string;
  buletinBackUrl: string;
  confirmareStudiiUrl: string;
  createdAt: string;
  userId: string;
  status: string;
}

interface DropdownProps {
  data: RequestType;
  onAccept?: (data: RequestType) => void;
  onDecline?: () => void;
}

const DocumentCard = ({ url, label }: { url: string; label: string }) => (
  <Card sx={{ maxWidth: 300, m: 1 }}>
    <CardMedia
      component="img"
      height="140"
      image={url}
      alt={label}
      sx={{ objectFit: "contain" }}
    />
    <Box sx={{ p: 1, textAlign: "center" }}>
      <Button
        size="small"
        startIcon={<ImageIcon />}
        href={url}
        rel="noopener noreferrer"
      >
        {label}
      </Button>
    </Box>
  </Card>
);

export const Dropdown: React.FC<DropdownProps> = ({
  onAccept,
  onDecline,
  data,
}) => {
  const [expanded, setExpanded] = useState(false);

  const getStatusColor = () => {
    switch (data.status) {
      case "approved":
        return "success";
      case "rejected":
        return "error";
      default:
        return "info";
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        width: "100%",
        maxWidth: 900,
        margin: "0 auto",
        overflow: "hidden",

        mb: 2,
      }}
    >
      <Button
        fullWidth
        onClick={() => setExpanded(!expanded)}
        sx={{
          p: 2,
          fontWeight: 600,
          fontSize: "1rem",
          justifyContent: "space-between",
          textTransform: "none",
          display: "flex",
          alignItems: "center",
          backgroundColor: expanded ? theme.palette.action.selected : "inherit",
        }}
        endIcon={
          expanded ? (
            <ExpandLessIcon sx={{ ml: 2 }} />
          ) : (
            <ExpandMoreIcon sx={{ ml: 2 }} />
          )
        }
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="subtitle1">
            {data.applicantFirstName} {data.aplicantName}
          </Typography>
          <Chip
            label={data.status}
            color={getStatusColor()}
            size="small"
            sx={{ textTransform: "capitalize" }}
          />
        </Box>
      </Button>

      <Collapse in={expanded}>
        <Box
          sx={{
            p: 3,
            borderTop: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Grid container spacing={3}>
            {/* Secțiunea stânga */}
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Informații personale
                </Typography>
                <Divider />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Prenume
                    </Typography>
                    <Typography variant="body1">{data.aplicantName}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Nume
                    </Typography>
                    <Typography variant="body1">
                      {data.applicantFirstName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1">
                      {data.applicantEmail}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Telefon
                    </Typography>
                    <Typography variant="body1">
                      {data.applicantPhone}
                    </Typography>
                  </Grid>
                </Grid>

                <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                  Adresă
                </Typography>
                <Divider />
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Adresă completă
                    </Typography>
                    <Typography variant="body1">
                      {data.applicantAddress}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Oraș
                    </Typography>
                    <Typography variant="body1">
                      {data.applicantCity}
                    </Typography>
                  </Grid>
                </Grid>

                <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                  Informații academice
                </Typography>
                <Divider />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Universitate
                    </Typography>
                    <Typography variant="body1">
                      {data.applicantUniversity}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Preferință cămin
                    </Typography>
                    <Typography variant="body1">
                      {data.applicantDormitoryPreference}
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>

            {/* Secțiunea dreapta */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Documente încărcate
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <DocumentCard
                  url={`http://localhost:8080${data.buletinFrontUrl}`}
                  label="Buletin (față)"
                />
                <DocumentCard
                  url={`http://localhost:8080${data.buletinBackUrl}`}
                  label="Buletin (verso)"
                />
                <DocumentCard
                  url={`http://localhost:8080${data.confirmareStudiiUrl}`}
                  label="Confirmare studii"
                />
              </Box>

              <Typography
                variant="body2"
                sx={{
                  mt: 3,
                  color: "text.secondary",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Data depunerii:{" "}
                {new Date(data.createdAt).toLocaleDateString("ro-RO", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </Typography>
            </Grid>
          </Grid>

          <Box
            sx={{
              mt: 4,
              display: "flex",
              gap: 2,
              justifyContent: "flex-end",
              borderTop: `1px solid ${theme.palette.divider}`,
              pt: 2,
            }}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={onDecline}
              sx={{ px: 4 }}
            >
              Respinge
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onAccept?.(data)}
              sx={{ px: 4 }}
            >
              Aprobă
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
};
