import { gql, useQuery } from "@apollo/client";
import {
  CircularProgress,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ThemeProvider,
  Button,
  Pagination,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import theme from "../theme/theme.d";
import BlogCard from "./BlogCard";

const GET_ALL_NEWS = gql`
  query FindManyNews {
    findManyNews {
      id
      description
      date
      title
      imageUrl
    }
  }
`;

export const NewsList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_NEWS);

  const [selectedNews, setSelectedNews] = useState<any | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;

  const handleNewsClick = (news: any) => {
    setSelectedNews(news);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedNews(null);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  if (loading) return <CircularProgress color="primary" />;
  if (error)
    return <Typography color="error">Eroare la încărcarea știrilor</Typography>;

  const paginatedNews = data?.findManyNews.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          height: { xs: "93.5vh", sm: "92vh" },
        }}
      >
        {/* Secțiunea statică din stânga */}
        <Box
          sx={{
            width: { xs: "100%", md: "40%" },
            height: { xs: "auto", md: "100%" },
            background: theme.palette.background.paper,
            color: theme.palette.primary.main,
            textAlign: "center",
            py: 4,
            px: 2,
            mb: { xs: 3, md: 0 },
            alignContent: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "2rem", sm: "3rem" },
              letterSpacing: "1px",
            }}
          >
            Noutăți
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1 }}>
            Cele mai recente știri și actualizări
          </Typography>
        </Box>

        {/* Listă de noutăți scrollabilă în dreapta */}
        <Box
          sx={{
            width: { xs: "100%", md: "60%" },
            height: "auto",
            overflowY: "auto",
            px: { xs: 2, sm: 4 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Grid container spacing={2} direction={{ xs: "column" }}>
            {paginatedNews?.map((news: any) => (
              <Grid size={{ xs: 12 }} key={news.id}>
                <BlogCard
                  news={{
                    ...news,
                    date: new Date(news.date).toLocaleDateString(),
                  }}
                  onClick={() => handleNewsClick(news)}
                />
              </Grid>
            ))}
          </Grid>

          <Pagination
            count={Math.ceil(data?.findManyNews.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            sx={{ mt: 3, display: "flex", justifyContent: "center" }}
          />
        </Box>

        {/* Modal pentru detaliile noutății selectate */}
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle
            sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
          >
            {selectedNews?.title}
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {new Date(selectedNews?.date).toLocaleDateString()}
            </Typography>
            {selectedNews?.imageUrl && (
              <Box
                component="img"
                src={selectedNews?.imageUrl}
                alt={selectedNews?.title}
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  mb: 2,
                }}
              />
            )}
            <Typography variant="body1">{selectedNews?.description}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Închide
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};
