import { Link, useNavigate } from "react-router-dom";
import handlelLogo from "../assets/images/handlelLogo.png";
import styles from "./Navbar.module.css";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import {
  Create,
  Home,
  ManageAccounts,
  People,
  Science,
  ShoppingCart,
} from "@mui/icons-material";

export default function Navbar() {
  const pages = [
    { icon: <Home />, label: "Home", path: "/" },
    { icon: <Create />, label: "Create", path: "/create" },
    { icon: <People />, label: "Users", path: "/users" },
    { icon: <Science />, label: "Discover", path: "/discover" },
    { icon: <ShoppingCart />, label: "Shop", path: "/shop" },
    { icon: <ManageAccounts />, label: "Create User", path: "/createUser" },
  ];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { activeUser } = useUserContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [drawerOpen]);

  return (
    <>
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{
          keepMounted: true,
          disableScrollLock: false, // <- make sure this is false (default)
        }}
        variant="permanent"
        sx={{
          width: 300,

          "& .MuiDrawer-paper": {
            width: 300,
            boxSizing: "border-box",
            backgroundColor: "#ffa500",
            borderRight: "none",
          },
        }}
      >
        <Button
          onClick={() => navigate("/")}
          sx={{
            borderRadius: "0",
            backgroundColor: "#66d8ad",
            "&:hover": {
              backgroundColor: "#559e85",
            },
          }}
        >
          <img src={handlelLogo} className={styles.logo} />
        </Button>

        <Divider />

        <List>
          {pages.map((page) => (
            <ListItem key={page.label} disablePadding>
              <ListItemButton
                component={Link}
                to={page.path}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "green",
                  },
                }}
              >
                <ListItemIcon>{page.icon}</ListItemIcon>
                <ListItemText primary={page.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: "auto", p: 2 }}>
          <Button
            fullWidth
            startIcon={<AccountCircleIcon />}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              backgroundColor: (theme) => theme.palette.tertiary.main,
              color: (theme) => theme.palette.tertiary.contrastText,
            }}
          >
            {activeUser?.username || "Account"}
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ "aria-labelledby": "basic-button" }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                navigate(`/profile/${activeUser?.username}`);
              }}
            >
              Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Drawer>
    </>
  );
}
