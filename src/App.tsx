import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile"; // ✅ Keep this import
import NotFound from "./pages/NotFound";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import useCart from "./hooks/useCart";

function Navbar() {
  const pages = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' }
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
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={Link} 
                to={page.path} 
              >
                {page.name}
              </Button>
            ))}
            <Button 
              sx={{ marginLeft: "auto" }} 
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >     
              <AccountCircleIcon/> 
            </Button>
          </Box>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ 'aria-labelledby': 'basic-button' }}
          >
            <MenuItem onClick={() => { handleClose(); navigate("/profile"); }}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  const user = { username: "Stian" } as User;
  const cartProps = useCart({ user });

  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <Navbar />
      </Box>
      <Routes>
        <Route path="/" element={<Home cartProps={cartProps} user={user} />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile cartProps={cartProps} user={user} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
