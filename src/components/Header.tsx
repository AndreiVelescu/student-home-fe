import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme/theme.d";
import NotificationButton from "./Notification";

const pages = ["Camine", "News"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    logout();
    setAnchorElUser(null);
    navigate("/");
  };

  const handleNavigateToPage = (page: string) => {
    navigate(page === "Camine" ? "/camine" : "/news");
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="relative"
        sx={{
          backgroundColor: "white", // Fundal alb
          color: theme.palette.primary.main, // Culoare de text închisă pentru contrast
          boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)", // Umbră subtilă
          borderRadius: "10px",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo for desktop */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: theme.palette.primary.main, // Culoare de text închisă
                textDecoration: "none",
                fontSize: "1.5rem",
                mr: 2,
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            >
              eCamin
            </Typography>

            {/* Mobile Menu Icon - Visible only for authenticated users */}
            {isAuthenticated && (
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="menu"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                  sx={{ color: theme.palette.primary.main }} // Culoare de text închisă
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorElNav}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  {pages.map((page) => (
                    <MenuItem
                      key={page}
                      onClick={() => {
                        handleNavigateToPage(page);
                        handleCloseNavMenu();
                      }}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}

            {/* Logo for mobile */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                color: theme.palette.primary.main, // Culoare de text închisă
                textDecoration: "none",
                fontSize: "1.2rem",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            >
              eCamin
            </Typography>

            {/* Desktop menu - Visible only for authenticated users */}
            {isAuthenticated && (
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => handleNavigateToPage(page)}
                    sx={{
                      my: 2,
                      color: "text.primary", // Culoare de text închisă
                      display: "block",
                      fontSize: "1rem",
                      mx: 1,
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.05)", // Efect de hover subtil
                      },
                    }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            )}

            {/* User menu / Auth Buttons */}
            <Box
              sx={{
                flexGrow: 0,
                ml: "auto",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              {isAuthenticated ? (
                <Tooltip title="Account options">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <AccountCircleIcon
                      fontSize="large"
                      sx={{
                        color: "text.primary",
                        "&:hover": { opacity: 0.8 },
                      }} // Culoare de text închisă
                    />
                  </IconButton>
                </Tooltip>
              ) : (
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    onClick={() => {
                      navigate("/login");
                    }}
                    sx={{
                      borderRadius: "16px",
                      color: "text.primary", // Culoare de text închisă
                      borderColor: "text.primary", // Culoare de bordură închisă
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.05)", // Efect de hover subtil
                      },
                    }}
                    variant="outlined"
                  >
                    Logare
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/register");
                    }}
                    sx={{
                      borderRadius: "16px",
                      color: "text.primary", // Culoare de text închisă
                      borderColor: "text.primary", // Culoare de bordură închisă
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.05)", // Efect de hover subtil
                      },
                    }}
                    variant="outlined"
                  >
                    Înregistrare
                  </Button>
                </Box>
              )}
              {isAuthenticated && (
                <Menu
                  sx={{ mt: "45px" }}
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  open={Boolean(anchorElUser)}
                  onClose={() => setAnchorElUser(null)}
                >
                  <MenuItem
                    onClick={() => {
                      setAnchorElUser(null);
                      navigate("/profile");
                    }}
                  >
                    Profil
                  </MenuItem>

                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              )}
              {isAuthenticated && <NotificationButton />}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
