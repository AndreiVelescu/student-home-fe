import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../Context/AuthContext";
import { useQuery, useMutation, gql } from "@apollo/client";

import { palette, styled, ThemeProvider } from "@mui/system";
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

const GET_USER_PROFILE = gql`
  query getFullUser {
    getCurrentUser {
      id
      email
      FirstName
      lastName
      preferences {
        cleanliness
        quietness
        lifestyle
      }
    }
  }
`;

const UPDATE_USER_PROFILE = gql`
  mutation UpdateOneUser(
    $data: UserUpdateInput!
    $where: UserWhereUniqueInput!
  ) {
    updateOneUser(data: $data, where: $where) {
      id
      lastName
      FirstName
      preferences {
        cleanliness
        quietness
        lifestyle
      }
    }
  }
`;

const UserProfile = () => {
  const { loading, error, data } = useQuery(GET_USER_PROFILE);
  const [updateProfile] = useMutation(UPDATE_USER_PROFILE);
  const [addNews] = useMutation(ADD_NEWS, {
    refetchQueries: [{ query: GET_ALL_NEWS }],
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [date, setDate] = useState("");
  const { currentUser } = useAuth();

  const handleSubmitAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    const isoDate = new Date(date).toISOString();

    addNews({
      variables: {
        data: {
          title,
          description,
          imageUrl,
          date: isoDate,
        },
      },
    }).then(() => {
      setTitle("");
      setDescription("");
      setImageUrl("");
      setDate("");
    });
  };

  const StyledCard = styled(Card)(({ theme }) => ({
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
  }));

  const ProfileImage = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: "auto",
  }));

  const NavButton = styled(Button)(({ theme }) => ({
    color: "#fff",
    marginLeft: theme.spacing(2),
  }));

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    preferences: {
      cleanliness: 5,
      quietness: 5,
      lifestyle: "Matinal",
    },
  });

  useEffect(() => {
    if (data?.getCurrentUser) {
      const user = data.getCurrentUser;
      setFormData({
        firstName: user.FirstName || "",
        lastName: user.lastName || "",
        preferences: {
          cleanliness: user.preferences?.cleanliness ?? 5,
          quietness: user.preferences?.quietness ?? 5,
          lifestyle: user.preferences?.lifestyle || "Matinal",
        },
      });
    }
  }, [data?.getCurrentUser]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      preferences: {
        ...prevState.preferences,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data?.getCurrentUser) return;

    try {
      await updateProfile({
        variables: {
          where: { id: data?.getCurrentUser?.id },
          data: {
            FirstName: { set: formData.firstName },
            lastName: { set: formData.lastName },
            preferences: {
              upsert: {
                create: {
                  cleanliness: formData.preferences.cleanliness,
                  quietness: formData.preferences.quietness,
                  lifestyle: formData.preferences.lifestyle,
                },
                update: {
                  cleanliness: { set: formData.preferences.cleanliness },
                  quietness: { set: formData.preferences.quietness },
                  lifestyle: { set: formData.preferences.lifestyle },
                },
              },
            },
          },
        },
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("A apărut o eroare la actualizarea profilului.");
    }
  };

  const handleSliderChange =
    (name: string) => (event: Event, newValue: number | number[]) => {
      setFormData((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [name]: newValue as number,
        },
      }));
    };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Container>
          <StyledCard>
            <CardContent>
              <Grid container spacing={4}>
                <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
                  <ProfileImage alt="Fotografia de Profil" src="" />
                  <Typography variant="h5" sx={{ mt: 2 }}>
                    {formData.firstName} {formData.lastName}
                  </Typography>
                  <Typography color="textSecondary">
                    {data?.getCurrentUser?.email}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={8}>
                  <Typography variant="h6" gutterBottom>
                    Preferințe
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Typography gutterBottom>Curtățenie</Typography>
                    <Slider
                      value={formData.preferences.cleanliness}
                      onChange={handleSliderChange("cleanliness")}
                      aria-label="Cleanliness"
                      step={1}
                      min={1}
                      max={10}
                    />
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <Typography gutterBottom>Liniște în cameră</Typography>
                    <Slider
                      value={formData.preferences.quietness}
                      onChange={handleSliderChange("quietness")}
                      aria-label="Quietness"
                      step={1}
                      min={1}
                      max={10}
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Editare Profil
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleTextFieldChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleTextFieldChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Stilul de viațǎ</InputLabel>
                      <Select
                        name="lifestyle"
                        value={formData.preferences.lifestyle}
                        onChange={handleSelectChange}
                        label="Lifestyle"
                      >
                        <MenuItem value="Matinal">
                          Matinal (activ dimineața, liniște noaptea)
                        </MenuItem>
                        <MenuItem value="Nocturn">
                          Nocturn (activ noaptea, liniște dimineața)
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </StyledCard>
        </Container>
      </Box>
      <Card
        sx={{
          maxWidth: 700,
          mx: "auto",
          height: "auto",
          mt: 3,
          mb: 3,
          bgcolor: "background.paper",
          boxShadow: 3,
          borderRadius: "12px",
        }}
      >
        {currentUser()?.role === "ADMIN" && (
          <Box sx={{ display: "flex", gap: 2, p: 3, justifyContent: "center" }}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mb: 4,
                width: "100%",
              }}
              onSubmit={handleSubmitAdmin}
            >
              <TextField
                label="Titlu"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                required
                color="primary"
              />
              <TextField
                label="Descriere"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                required
                multiline
                rows={4}
                color="primary"
              />
              <TextField
                label="Data"
                value={date}
                onChange={handleDateChange}
                fullWidth
                required
                type="date"
                InputLabelProps={{ shrink: true }}
                color="primary"
              />
              <Button type="submit" variant="contained" color="primary">
                Adaugă Noutatea
              </Button>
            </Box>
          </Box>
        )}
      </Card>
    </ThemeProvider>
  );
};

export default UserProfile;
