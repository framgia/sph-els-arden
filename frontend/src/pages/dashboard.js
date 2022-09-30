import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import { UserContext } from "../utils/userContext";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <Container>
      {user ? (
        user.is_staff ? (
          <h1>Admin Dashboard</h1>
        ) : (
          <h1>Dashboard</h1>
        )
      ) : null}
    </Container>
  );
};

export default Dashboard;
