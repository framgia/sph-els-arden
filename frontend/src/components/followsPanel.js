import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import FollowEntry from "./followEntry";

const FollowsPanel = () => {
  return (
    <Container fluid className="mt-3">
      <Card border="dark" bg="light">
        <Card.Header>
          <Nav fill justify variant="tabs" defaultActiveKey="#followers">
            <Nav.Item>
              <Nav.Link href="#followers">Followers</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#followings">Followings</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <FollowEntry />
          <FollowEntry />
          <FollowEntry />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FollowsPanel;
