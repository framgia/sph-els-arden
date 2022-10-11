import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Image from "react-bootstrap/Image";
import avatarPlaceholder from "../asset/avatar_placeholder.png";
import { domain } from "../services/apis";
import moment from "moment";

const Activity = ({ activity }) => {
  const { content_type, content_object } = activity;
  const FOLLOW = 9;
  const LESSON = 12;
  const date = new Date(activity.activity_date);
  const timeMessage = moment(date).fromNow();
  let avatar, message;

  if (content_type === FOLLOW) {
    const { follower_id, following_id } = content_object;
    message = `${follower_id.user_id.first_name} followed ${following_id.user_id.first_name}`;
    avatar = follower_id.avatar && domain.concat(follower_id.avatar);
  } else if (content_type === LESSON) {
    const { completed, profile_id, category_id } = content_object;
    avatar = profile_id.avatar && domain.concat(profile_id.avatar);
    message = `${profile_id.user_id.first_name} ${
      completed ? "finished" : "started"
    } lesson in ${category_id.title}`;
  }

  return (
    <Container fluid className="flex-row">
      <Row>
        <Col md="auto">
          <Image src={avatar || avatarPlaceholder} style={{ width: "4rem" }} />
        </Col>
        <Col md="auto">
          <p className="text-capitalize fs-5">{message}</p>
          <p>{timeMessage}</p>
        </Col>
        <hr />
      </Row>
    </Container>
  );
};

export default Activity;
