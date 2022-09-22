import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import avatarPlaceholder from "../asset/avatar_placeholder.png";

const ProfileOverview = () => {
  return (
    <Container fluid className="mt-3">
      <Card className="text-center" border="dark">
        <Card.Img variant="top" src={avatarPlaceholder} />
        <Card.Body>
          <Card.Title>User Name</Card.Title>
          <hr />
          <Row className="justify-content-center">
            <Col>
              <p>Count</p>
              <p>Follower</p>
            </Col>
            <Col>
              <p>Count</p>
              <p>Following</p>
            </Col>
          </Row>
          <Button variant="primary">Un/Follow</Button>
          <Card.Body>
            <Card.Link href="#">Learned {} words</Card.Link>
          </Card.Body>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfileOverview;
