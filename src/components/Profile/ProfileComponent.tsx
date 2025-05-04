import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Card, Container, Paper } from "@mui/material";
import { useAuth } from "../../Context/AuthContext";
import { useQuery, useMutation } from "@apollo/client";
import Grid from "@mui/material/Grid2";
import { ThemeProvider } from "@mui/system";
import theme from "../../theme/theme.d";
import { useProfileImage } from "../../Context/ProfileImageContext";
import {
  ADD_NEWS,
  GET_ALL_NEWS,
  GET_USER_PROFILE,
  UPDATE_USER_PROFILE,
  UPLOAD_USER_PROFILE_PICTURE,
} from "./mutations";
import ProfileCard from "./ProfileCard";
import PreferencesForm from "./PreferencesForm";
import ProfileEditForm from "./ProfileEditForm";
import AddNewsForm from "./AddNewsForm";
import { ApplicationsComponent } from "./Applications/ApplicationsComponent";

const ProfileComponent = () => {
  const [updateProfile] = useMutation(UPDATE_USER_PROFILE);
  const { loading, error, data } = useQuery(GET_USER_PROFILE);
  const [addNews] = useMutation(ADD_NEWS, {
    refetchQueries: [{ query: GET_ALL_NEWS }],
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [date, setDate] = useState("");
  const { currentUser } = useAuth();
  const [uploadProfilePicture] = useMutation(UPLOAD_USER_PROFILE_PICTURE);
  const [activeView, setActiveView] = useState<
    "profile" | "preferences" | "edit" | "news" | "applications"
  >("profile");
  const { profileImageUrl, setProfileImageUrl } = useProfileImage();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    preferences: { cleanliness: 5, quietness: 5, lifestyle: "Matinal" },
  });

  useEffect(() => {
    if (data?.getCurrentUser) {
      const user = data.getCurrentUser;
      setProfileImageUrl(user.profilePictureurl);
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

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data?.getCurrentUser) return;
    try {
      await updateProfile({
        variables: {
          where: { id: data.getCurrentUser.id },
          data: {
            FirstName: { set: formData.firstName },
            lastName: { set: formData.lastName },
            preferences: {
              upsert: {
                create: formData.preferences,
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
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("A apărut o eroare la actualizarea profilului.");
    }
  };

  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isoDate = new Date(date).toISOString();
    addNews({
      variables: { data: { title, description, imageUrl, date: isoDate } },
    }).then(() => {
      setTitle("");
      setDescription("");
      setImageUrl("");
      setDate("");
    });
  };

  const MenuButton = ({
    label,
    view,
  }: {
    label: string;
    view: typeof activeView;
  }) => (
    <Button
      fullWidth
      variant={activeView === view ? "contained" : "text"}
      color={activeView === view ? "primary" : "inherit"}
      onClick={() => setActiveView(view)}
      sx={{
        borderRadius: 0,
        justifyContent: "flex-start",
        pl: 2,
        py: 1.5,
        fontWeight: activeView === view ? "bold" : "normal",
        "&:hover": { backgroundColor: theme.palette.action.hover },
      }}
    >
      {label}
    </Button>
  );

  return (
    <ThemeProvider theme={theme}>
      <Grid container sx={{ minHeight: "100vh" }}>
        <Grid
          item
          xs={12}
          md="auto"
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRight: { md: "1px solid #e0e0e0" },
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: 240 },
              display: "flex",
              flexDirection: { xs: "row", md: "column" },
              overflowX: { xs: "auto", md: "hidden" },
              height: { xs: "auto", md: "100vh" },
            }}
          >
            <MenuButton label="Detalii profil" view="profile" />
            <MenuButton label="Preferințe" view="preferences" />
            {currentUser()?.role === "ADMIN" && (
              <>
                <MenuButton label="Adaugă știre" view="news" />
                <MenuButton label="Aplicații" view="applications" />
              </>
            )}
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md
          sx={{ flexGrow: 1, height: "100%", overflow: "auto" }}
        >
          <Box sx={{ height: "100%", width: "100%", p: 2 }}>
            {activeView === "profile" && (
              <ProfileCard
                profileImageUrl={
                  `http://localhost:8080${profileImageUrl}` || ""
                }
                firstName={formData.firstName}
                lastName={formData.lastName}
                email={data?.getCurrentUser?.email}
                onUpload={async (file) => {
                  const { data } = await uploadProfilePicture({
                    variables: { file },
                  });
                  if (data?.uploadUserProfilePicture) {
                    setProfileImageUrl(data.uploadUserProfilePicture);
                  }
                }}
              />
            )}

            {activeView === "preferences" && (
              <Box
                sx={{
                  width: "100%",
                  bgcolor: theme.palette.background.default,
                }}
              >
                <PreferencesForm
                  preferences={formData.preferences}
                  onChange={(updatedPreferences) =>
                    setFormData((prev) => ({
                      ...prev,
                      preferences: updatedPreferences,
                    }))
                  }
                />
                <ProfileEditForm
                  firstName={formData.firstName}
                  lastName={formData.lastName}
                  onChange={(field, value) =>
                    setFormData((prev) => ({ ...prev, [field]: value }))
                  }
                  onSubmit={handleProfileSubmit}
                />
              </Box>
            )}

            {activeView === "news" && currentUser()?.role === "ADMIN" && (
              <Card
                sx={{
                  width: "100%",
                  height: "auto",
                  mt: 3,
                  mb: 3,
                  bgcolor: "background.paper",
                  boxShadow: 3,
                  borderRadius: "12px",
                  p: 2,
                }}
              >
                <AddNewsForm
                  title={title}
                  description={description}
                  date={date}
                  onChange={(field, value) => {
                    if (field === "title") setTitle(value);
                    if (field === "description") setDescription(value);
                    if (field === "date") setDate(value);
                  }}
                  onSubmit={handleNewsSubmit}
                />
              </Card>
            )}

            {activeView === "applications" &&
              currentUser()?.role === "ADMIN" && (
                <Paper
                  sx={{
                    width: "100%",
                    mt: 3,
                    mb: 3,
                    bgcolor: "background.paper",
                    boxShadow: 3,
                    borderRadius: "12px",
                    p: 2,
                    overflow: "auto",
                  }}
                >
                  <ApplicationsComponent />
                </Paper>
              )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ProfileComponent;
