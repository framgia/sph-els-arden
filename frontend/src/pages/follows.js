import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ProfileOverview from "../components/profileOverview";
import FollowsPanel from "../components/followsPanel";

const Follows = () => {
  return (
    <Container fluid>
      <h1>Follows</h1>
      <Row>
        <Col md={3}>
          <ProfileOverview />
        </Col>
        <Col lg>
          <FollowsPanel />
        </Col>
      </Row>
    </Container>
  );
};

export default Follows;
