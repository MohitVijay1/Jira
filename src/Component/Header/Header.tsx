import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useEffect, useState } from "react";
import useGetProjects from "../../utils/Hooks/useGetProjects";
import useGetCurrentUser from "../../utils/Hooks/useGetCurrentUser";
import useGetRecentProjects from "../../utils/Hooks/useGetRecentProjects";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [currentUserName, setCurrentUserName] = useState("R");
  const navigate = useNavigate();
  const user = useGetCurrentUser();

  const handleLogOut = () => {
    signOut(auth).then(() => {
      console.log("logout successfully");
      navigate("/login");
    });
  };
  const project = useGetRecentProjects();

  useEffect(() => {
    setProjects(project);
    setCurrentUserName(user[0]?.name.toUpperCase());
  }, [project, user]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" className="appbar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M11.53 2c0 2.4 1.97 4.35 4.35 4.35h1.78v1.7c0 2.4 1.94 4.34 4.34 4.35V2.84a.84.84 0 0 0-.84-.84zM6.77 6.8a4.36 4.36 0 0 0 4.34 4.34h1.8v1.72a4.36 4.36 0 0 0 4.34 4.34V7.63a.84.84 0 0 0-.83-.83zM2 11.6c0 2.4 1.95 4.34 4.35 4.34h1.78v1.72c.01 2.39 1.95 4.34 4.34 4.34v-9.57a.84.84 0 0 0-.84-.84z"
            />
          </svg>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/dashboard"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            JIRA
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            ></IconButton>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <li className="dropdown">
                <Button
                  sx={{ my: 2, color: "white", display: "block" }}
                  className="dropbtn"
                >
                  Projects
                </Button>

                <Box className="dropdown-content" sx={{ width: "200px" }}>
                  <Box>
                    <Box
                      sx={{
                        marginTop: 2,
                        // marginRight: "100px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#44546F",
                          fontSize: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        Recent
                      </Typography>
                    </Box>
                    {projects &&
                      projects.map((project, index) => {
                        return (
                          <div key={index}>
                            <Link to={`/project/${project.id}`}>
                              {project.name}
                            </Link>
                          </div>
                        );
                      })}
                  </Box>
                  <Box
                    sx={{
                      border: "solid",
                      borderTopColor: "#DCDCDC",
                    }}
                  >
                    <Link to="/addproject">Create Project</Link>
                    <Link to="/project">View all projects</Link>
                  </Box>
                </Box>
              </li>
            </Button>
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={currentUserName}
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography onClick={handleLogOut} textAlign="center">
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
