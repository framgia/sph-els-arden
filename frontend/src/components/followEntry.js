import { useSelector } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Image from "react-bootstrap/Image";
import avatarPlaceholder from "../asset/avatar_placeholder.png";
import { domain } from "../services/apis";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

const FollowEntry = (props) => {
  const { entry } = props;
  const pageState = useSelector((state) => state.followPage.value);
  const { currentTab } = pageState;
  const data = pageState[currentTab][entry];
  const avatar = domain.concat(data.profile.avatar);

  return (
    <Container fluid className="flex-row">
      <Row style={{ cursor: "pointer" }}>
        <Col md={1}>
          <Image
            src={data.profile.avatar ? avatar : avatarPlaceholder}
            style={{ width: "3rem" }}
          />
        </Col>
        <Col md="auto">
          <p>
            {capitalizeFirstLetter(data.user.first_name)}{" "}
            {capitalizeFirstLetter(data.user.last_name)}
          </p>
        </Col>
        <hr />
      </Row>
    </Container>
  );
};

export default FollowEntry;
