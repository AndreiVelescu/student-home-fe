import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import InfoImage from "../assets/InfoPage.svg";

export const Info = () => {
  return (
    <Box>
      <Box
        sx={{
          textAlign: "center",
          pt: { xs: 4, md: 8 },
          pb: { xs: 4, md: 8 },
          backgroundColor: "background.paper",
        }}
      >
        <Container maxWidth="md">
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12}>
              <Typography
                variant="h3"
                component="h1"
                fontWeight="bold"
                gutterBottom
                sx={{
                  fontSize: { xs: "2rem", md: "3rem" },
                  color: "primary.main",
                }}
              >
                Bun venit pe platforma noastră!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box
                component="img"
                src={InfoImage}
                alt="Platformă informațională"
                sx={{
                  width: { xs: "100%", md: "70%" },
                  maxHeight: { xs: 300, md: 400 },
                  objectFit: "contain",
                  mx: "auto",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
        <Box textAlign="center" mb={5}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            Despre Platformă
          </Typography>
          <Typography variant="h6" color="text.secondary">
            O platformă modernă pentru gestionarea aplicațiilor de cazare în
            cămine studențești.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: "100%",
                p: 2,
                borderRadius: 3,
                boxShadow: 3,
                textAlign: "center",
              }}
            >
              <SchoolIcon sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Gestionare Profil
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Creează și actualizează-ți rapid profilul personal pentru o
                  experiență personalizată.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: "100%",
                p: 2,
                borderRadius: 3,
                boxShadow: 3,
                textAlign: "center",
              }}
            >
              <HomeIcon sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Aplicare la Cămin
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Depune cereri pentru locuri de cazare și urmărește statusul
                  aplicațiilor tale.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: "100%",
                p: 2,
                borderRadius: 3,
                boxShadow: 3,
                textAlign: "center",
              }}
            >
              <SettingsIcon
                sx={{ fontSize: 60, color: "primary.main", mb: 2 }}
              />
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Setări Preferințe
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Configurează-ți preferințele pentru a primi cazare potrivită
                  stilului tău de viață.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: "100%",
                p: 2,
                borderRadius: 3,
                boxShadow: 3,
                textAlign: "center",
              }}
            >
              <NewspaperIcon
                sx={{ fontSize: 60, color: "primary.main", mb: 2 }}
              />
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Noutăți și Anunțuri
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fii la curent cu ultimele informații și anunțuri publicate de
                  administrație.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
