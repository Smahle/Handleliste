import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Box from '@mui/material/Box';
import useCart from "./hooks/useCart";
import UserList from "./pages/UserList";
import CreateUser from "./pages/CreateUser";
import Navbar from "./components/NavBar";
import useUser from "./hooks/useUser";

function App() {
  const { user } = useUser({
    username: "stian",
    carts: [],
    firstName: "",
    lastName: "",
    age: undefined,
    email: "",
    following: [],
  });

  const cartProps = useCart({ user });

  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <Navbar />
      </Box>
      <Routes>
  <Route path="/" element={<Home {...cartProps} />} />
  <Route path="/createUser" element={<CreateUser />} />
  <Route path="/userList" element={<UserList />} />
  <Route path="/profile/:username" element={<Profile cartProps={cartProps} user={user} />} />
  <Route path="*" element={<NotFound />} />
</Routes>

    </Router>
  );
}

export default App;

