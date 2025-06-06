import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Users from "./pages/Users";
import CreateUser from "./pages/CreateUser";
import Discover from "./pages/Discover";
import Navbar from "./components/NavBar";
import Shop from "./pages/Shop";
import Create from "./pages/Create";

function App() {
  return (
    <Router>
      <div className="appContainer">
        <div className="navbar">
          <Navbar />
        </div>
        <div className={`content primary`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/createUser" element={<CreateUser />} />
            <Route path="/users" element={<Users />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
