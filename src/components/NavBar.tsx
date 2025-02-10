import AppBar from "@mui/material/AppBar";
import { Link, useNavigate } from "react-router-dom"; // ✅ FIXED IMPORT
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

export default function Navbar() {
  const pages = [
    { name: "Home", path: "/" },
    { name: "CreateUser", path: "/createUser" },
    { name: "UserList", path: "/userList" },
  ];
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                sx={{ my: 2, color: "white", display: "block" }}
                component={Link} // ✅ Correctly using Link
                to={page.path}    // ✅ This now works as expected
              >
                {page.name}
              </Button>
            ))}
            <Button
              sx={{ marginLeft: "auto" }}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <AccountCircleIcon />
            </Button>
          </Box>

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
                navigate("/profile");
              }}
            >
              Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
