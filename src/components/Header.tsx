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
      <AppBar position="relative">
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
                color: "white",
                textDecoration: "none",
                fontSize: "1.5rem",
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
                color: "white",
                textDecoration: "none",
                fontSize: "1.2rem",
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
                      color: "white",
                      display: "block",
                      fontSize: "1rem",
                      mx: 1,
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
                      sx={{ color: "white" }}
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
                      "&:hover": {
                        backgroundColor: "white",
                        color: "primary.main",
                        borderColor: "primary.main",
                      },
                    }}
                    color="inherit"
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
                      "&:hover": {
                        backgroundColor: "white",
                        color: "primary.main",
                        borderColor: "primary.main",
                      },
                    }}
                    variant="outlined"
                    color="inherit"
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
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
