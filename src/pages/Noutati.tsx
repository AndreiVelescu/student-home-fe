import { gql, useQuery, useMutation } from "@apollo/client";
import {
  CircularProgress,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  ThemeProvider,
  CssBaseline,
  Grid,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import theme from "../theme/theme.d";

const ADD_NEWS = gql`
  mutation Mutation($data: NewsCreateInput!) {
    createOneNews(data: $data) {
      id
      description
      title
      date
    }
  }
`;

const GET_ALL_NEWS = gql`
  query FindManyNews {
    findManyNews {
      id
      description
      date
      title
    }
  }
`;

export const NewsList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const { loading, error, data } = useQuery(GET_ALL_NEWS);

  const [selectedNews, setSelectedNews] = useState<any | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleNewsClick = (news: any) => {
    setSelectedNews(news); // Setează noutatea selectată
    setOpenModal(true); // Deschide modalul
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Închide modalul
    setSelectedNews(null); // Resetează noutatea selectată
  };

  if (loading) return <CircularProgress color="primary" />;
  if (error)
    return <Typography color="error">Eroare la încărcarea știrilor</Typography>;

  // Pagina curentă și datele pentru acea pagină
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const newsForCurrentPage = data?.findManyNews.slice(startIndex, endIndex);

  // Calculăm numărul total de pagini
  const totalPages = Math.ceil(data?.findManyNews.length / pageSize);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Listă de noutăți cu paginare */}
      <Typography
        variant="h3"
        color="primary"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "3rem",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          mt: 2,
          mb: 4,
        }}
      >
        Noutăți
      </Typography>

      <Grid container spacing={3} sx={{ px: 2 }}>
        {newsForCurrentPage?.map(
          (news: {
            id: string;
            title: string;
            description: string;
            imageUrl: string;
            date: Date;
          }) => (
            <Grid item xs={12} sm={6} md={4} key={news.id}>
              <Card
                sx={{
                  maxWidth: 600,
                  mx: "auto",
                  height: "200px",
                  mb: 3,
                  borderRadius: "8px",
                }}
                onClick={() => handleNewsClick(news)}
              >
                <CardContent>
                  <Typography variant="h6" color="primary">
                    {news.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(news.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1">
                    {news.description?.length > 100
                      ? `${news.description.slice(0, 100)}...`
                      : news.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>

      {/* Paginare */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          bottom: 5,
          position: "static",
          mt: "auto",
          width: "100%",
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      {/* Modal pentru detaliile noutății selectate */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{selectedNews?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            {new Date(selectedNews?.date).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {selectedNews?.description}
          </Typography>
          {selectedNews?.imageUrl && (
            <Box
              component="img"
              src={selectedNews?.imageUrl}
              alt={selectedNews?.title}
              sx={{
                width: "100%", // Imagini vor ocupa 100% din lățimea containerului
                height: "auto",
                mt: 2,
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Închide
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};
