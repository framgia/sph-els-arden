import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Image from "react-bootstrap/Image";
import avatarPlaceholder from "../asset/avatar_placeholder.png";
import { domain } from "../services/apis";
import { useNavigate } from "react-router-dom";

const UserEntry = ({ data }) => {
  const { profile, user } = data;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${data.user.id}`);
  };
  return (
    <Container fluid className="flex-row">
      <Row onClick={() => handleClick()}>
        <Col md="auto">
          <Image
            src={`http://${profile.avatar || avatarPlaceholder}`}
            style={{ width: "8rem" }}
          />
        </Col>
        <Col md="auto">
          <p className="fs-4 text-capitalize">
            {user.first_name} {user.last_name}
          </p>
          <p>{user.email}</p>
        </Col>
        <hr />
      </Row>
    </Container>
  );
};

export default UserEntry;
