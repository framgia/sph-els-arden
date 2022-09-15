import Register from "./pages/register";
import Container from "react-bootstrap/Container";
import "./asset/style.css";

function App() {
  return (
    <div className="App">
      <Container className="container mt-5 pt-5 mb-5">
        <Register />
      </Container>
    </div>
  );
}

export default App;
