import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Image from "react-bootstrap/Image";
import avatarPlaceholder from "../asset/avatar_placeholder.png";

const FollowEntry = () => {
  return (
    <Container fluid className="flex-row">
      <Row>
        <Col md={1}>
          <Image src={avatarPlaceholder} style={{ width: "3rem" }} />
        </Col>
        <Col md="auto">
          <p>Sample user</p>
        </Col>
        <hr />
      </Row>
    </Container>
  );
};

export default FollowEntry;
