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
  Avatar,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { useUserContext } from "../context/UserContext";

export default function Navbar() {
  const pages = [
    { name: "Home", path: "/" },
    { name: "CreateUser", path: "/createUser" },
    { name: "UserList", path: "/userList" },
    { name: "Discover", path: "/discover" },
    { name: "Shop", path: "/shop" },
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
          },
        }}
      >
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6">HandleL</Typography>
        </Box>

        <Divider />

        <List>
          {pages.map((page) => (
            <ListItem key={page.name} disablePadding>
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
                <ListItemText primary={page.name} />
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
