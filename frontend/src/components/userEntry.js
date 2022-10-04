import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Image from "react-bootstrap/Image";
import avatarPlaceholder from "../asset/avatar_placeholder.png";

const UserEntry = () => {
  return (
    <Container fluid className="flex-row">
      <Row>
        <Col md="auto">
          <Image src={avatarPlaceholder} style={{ width: "8rem" }} />
        </Col>
        <Col md="auto">
          <p className="fs-4">Sample User</p>
          <p>Sample email</p>
          <p>Last Login: sample date</p>
        </Col>
        <hr />
      </Row>
    </Container>
  );
};

export default UserEntry;
