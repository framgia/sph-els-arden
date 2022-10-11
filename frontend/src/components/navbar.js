import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { UserContext } from "../utils/userContext";

const NavBar = () => {
  const { user, logOut } = useContext(UserContext);
  const inLogin = useLocation().pathname === "/login";

  const handleLoginLogout = () => {
    if (user) logOut();
  };

  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container className="bg-dark">
        <Navbar.Brand className="bg-dark" href="/home">
          E-Learning System
        </Navbar.Brand>
        <Nav className="text-right">
          {user ? (
            <React.Fragment>
              <Nav.Link href="/users">Users List</Nav.Link>
              <Nav.Link
                href={user.is_staff ? "/admin/categories" : "/categories"}
              >
                Categories
              </Nav.Link>
              {!user.is_staff ? (
                <React.Fragment>
                  <Nav.Link href={user.is_staff ? "/admin/home" : "/home"}>
                    Home
                  </Nav.Link>
                  <Nav.Link href="/profile">Profile</Nav.Link>
                </React.Fragment>
              ) : null}
            </React.Fragment>
          ) : null}
          <Nav.Link
            onClick={handleLoginLogout}
            href={!user ? (inLogin ? "/register" : "/login") : null}
          >
            {user ? "Logout" : inLogin ? "Register" : "Login"}
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
