import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Image from "react-bootstrap/Image";
import avatarPlaceholder from "../asset/avatar_placeholder.png";

const Activity = () => {
  return (
    <Container fluid className="flex-row">
      <Row>
        <Col md={1}>
          <Image src={avatarPlaceholder} style={{ width: "3rem" }} />
        </Col>
        <Col md="auto">
          <p>Sample activity</p>
          <p>Sample date</p>
        </Col>
        <hr></hr>
      </Row>
    </Container>
  );
};

export default Activity;
