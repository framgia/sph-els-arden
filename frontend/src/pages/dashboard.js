import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { UserContext } from "../utils/userContext";
import WordsPanel from "../components/learnedWordsPanel";
import avatarPlaceholder from "../asset/avatar_placeholder.png";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <Container>
      <h1>Dashboard</h1>
      <Row>
        <Col md={3}>
          <Row>
            <Col md="auto">
              <Image src={avatarPlaceholder} style={{ width: "6rem" }} />
            </Col>
            <Col md="auto">
              <p>User Name</p>
              <Link>Learned 0 words</Link>
              <br />
              <Link>Learned 0 lessons</Link>
            </Col>
          </Row>
        </Col>
        <Col>
          <WordsPanel />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
