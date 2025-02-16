import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import UserList from "./pages/UserList";
import CreateUser from "./pages/CreateUser";
import Discover from "./pages/Discover";
import Navbar from "./components/NavBar";

function App() {
  return (
    <Router>
      <div className="appContainer">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createUser" element={<CreateUser />} />
            <Route path="/userList" element={<UserList />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
