import Register from "./pages/register";
import { Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import EditProfile from "./pages/editProfile";

function App() {
  return (
    <div>
      <Container className="container mt-5 pt-5 mb-5">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
