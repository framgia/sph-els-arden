import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container className="bg-dark">
        <Navbar.Brand className="bg-dark" href="#">
          E-Learning System
        </Navbar.Brand>
        <Nav className="text-right">
          <Nav.Link className="bg-dark" href="##">
            Link1
          </Nav.Link>
          <Nav.Link className="bg-dark" href="##">
            Link2
          </Nav.Link>
          <Nav.Link className="bg-dark" href="##">
            Link2
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
