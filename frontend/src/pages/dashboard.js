import React from "react";
import Container from "react-bootstrap/Container";
import getCookie from "../utils/getCookie";

const Dashboard = () => {
  const admin = getCookie("admin");

  return (
    <Container>
      {admin ? <h1>Admin Dashboard</h1> : <h1>Dashboard</h1>}
    </Container>
  );
};

export default Dashboard;
