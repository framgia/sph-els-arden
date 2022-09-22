import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ProfileOverview from "../components/profileOverview";
import ActivitiesPanel from "../components/activitiesPanel";

const Profile = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <ProfileOverview />
        </Col>
        <Col lg>
          <ActivitiesPanel />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
