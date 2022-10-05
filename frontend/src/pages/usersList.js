import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import UserEntry from "../components/userEntry";
import * as userService from "../services/userService";

const UserList = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    userService.allUsers().then(({ data }) => {
      setUsers(data);
    });
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      <Container className="pt-4 bg-light rounded">
        {users
          ? Object.keys(users).map((key) => (
              <div key={key}>
                <UserEntry data={users[key]} />
              </div>
            ))
          : null}
      </Container>
    </div>
  );
};

export default UserList;
