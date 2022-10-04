import React from "react";
import Container from "react-bootstrap/Container";
import UserEntry from "../components/userEntry";

const AdminUserList = () => {
  return (
    <div>
      <h1>Users List</h1>
      <Container className="pt-4 bg-light rounded">
        <UserEntry />
        <UserEntry />
        <UserEntry />
        <UserEntry />
        <UserEntry />
        <UserEntry />
      </Container>
    </div>
  );
};

export default AdminUserList;
