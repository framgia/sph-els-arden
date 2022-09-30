import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { UserContext } from "../utils/userContext";

const NavBar = () => {
  const { user, logOut } = useContext(UserContext);

  const handleLoginLogout = () => {
    if (user) logOut();
  };

  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container className="bg-dark">
        <Navbar.Brand className="bg-dark" to="/home">
          E-Learning System
        </Navbar.Brand>
        <Nav className="text-right">
          <Nav.Link
            style={{ color: "white", margin: 10, textDecoration: "none" }}
            href="/home"
          >
            Home
          </Nav.Link>{" "}
          <Nav.Link
            style={{ color: "white", margin: 10, textDecoration: "none" }}
            href="/profile"
          >
            Profile
          </Nav.Link>{" "}
          <Nav.Link
            style={{ color: "white", margin: 10, textDecoration: "none" }}
            onClick={handleLoginLogout}
            href={!user ? "/login" : null}
          >
            {user ? "Logout" : "Login"}
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
