import Register from "./pages/register";
import { Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "./asset/style.css";

function App() {
  return (
    <div>
      <Container className="container mt-5 pt-5 mb-5">
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
