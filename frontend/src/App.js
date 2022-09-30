import React, { useEffect, useState } from "react";
import Register from "./pages/register";
import { Route, Routes, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import EditProfile from "./pages/editProfile";
import Follows from "./pages/follows";
import NavBar from "./components/navbar";
import { UserContextProvider } from "./utils/userContext";

function App() {
  return (
    <React.Fragment>
      <UserContextProvider>
        <NavBar />
        <Container className="container mt-5 pt-5 mb-5">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/profile/follows" element={<Follows />} />
          </Routes>
        </Container>
      </UserContextProvider>
    </React.Fragment>
  );
}

export default App;
