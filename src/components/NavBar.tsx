import { Link, useNavigate } from "react-router-dom";
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
import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import {
  Home,
  ManageAccounts,
  People,
  Science,
  ShoppingCart,
} from "@mui/icons-material";

export default function Navbar() {
  const pages = [
    { icon: <Home />, label: "Home", path: "/" },
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

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: 440,

          "& .MuiDrawer-paper": {
            width: 440,
            boxSizing: "border-box",
            backgroundColor: "#ffa500",
          },
        }}
      >
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6">HandleL</Typography>
        </Box>

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
              backgroundColor: (theme) => theme.palette.primary.main,
              color: (theme) => theme.palette.primary.contrastText,
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
