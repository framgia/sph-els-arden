import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Image from "react-bootstrap/Image";
import avatarPlaceholder from "../asset/avatar_placeholder.png";
import { domain } from "../services/apis";

const Activity = ({ activity }) => {
  const { content_type, content_object } = activity;
  const FOLLOW = 9;
  const LESSON = 12;
  const date = new Date(activity.activity_date);
  let avatar, message, hours, days;

  const seconds = (Date.now() - date.getTime()) / 1000;
  let minutes = Math.round(seconds / 60);
  let timeMessage = `${minutes} minutes ago`;

  if (minutes >= 60) {
    hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    timeMessage = `${hours} hours ${minutes} minutes ago`;
  }

  if (hours >= 24) {
    days = Math.floor(hours / 24);
    hours = hours % 24;
    timeMessage = `${hours} hours ${minutes} minutes ago`;
  }

  if (content_type === FOLLOW) {
    const { follower_id, following_id } = content_object;
    message = `${follower_id.user_id.first_name} followed ${following_id.user_id.first_name}`;
    avatar = domain.concat(follower_id.avatar);
  } else if (content_type === LESSON) {
    const { completed, profile_id, category_id } = content_object;
    avatar = domain.concat(profile_id.avatar);
    message = `${profile_id.user_id.first_name} ${
      completed ? "finished" : "started"
    } lesson in ${category_id.title}`;
  }

  return (
    <Container fluid className="flex-row">
      <Row>
        <Col md="auto">
          <Image
            src={!avatar ? avatarPlaceholder : avatar}
            style={{ width: "4rem" }}
          />
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
