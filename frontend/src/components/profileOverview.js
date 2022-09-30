import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import avatarPlaceholder from "../asset/avatar_placeholder.png";
import { domain } from "../services/apis";
import { setProfile } from "../store/profile";
import { setPage } from "../store/follow";
import * as profileService from "../services/profileService";

const ProfileOverview = () => {
  const state = useSelector((state) => state.profile.value);
  const pageState = useSelector((state) => state.followPage.value);
  const dispatch = useDispatch();
  const avatar = domain.concat(state.avatar);

  const handleFollow = async () => {
    const { data } = await profileService.getCurrentProfile();
    const id = data.profile.id;

    try {
      if (state.follow) {
        await profileService.unfollow(state.id);
        dispatch(setProfile({ ...state, follow: !state.follow }));
        const { data } = await profileService.getFollowings(pageState.id);
        dispatch(setPage({ ...pageState, followings: data }));
      } else {
        await profileService.follow(state.id);
        dispatch(setProfile({ ...state, follow: !state.follow }));
        const { data } = await profileService.getFollowings(pageState.id);
        dispatch(setPage({ ...pageState, followings: data }));
      }
    } catch {}
  };

  return (
    <Container fluid className="mt-3">
      <Card className="text-center" border="dark">
        <Card.Img
          variant="top"
          src={state.avatar ? avatar : avatarPlaceholder}
        />
        <Card.Body>
          <Card.Title style={{ textTransform: "capitalize" }}>
            {state.first_name} {state.last_name}
          </Card.Title>
          <hr />
          <Row className="justify-content-center">
            <Col>
              <p>{state.follower}</p>
              <p>Follower</p>
            </Col>
            <Col>
              <p>{state.following}</p>
              <p>Following</p>
            </Col>
          </Row>
          {!state.viewingOwn ? (
            <Button variant="primary" onClick={handleFollow}>
              {state.follow ? "Unfollow" : "Follow"}
            </Button>
          ) : null}
          <Card.Body>
            <Card.Link href="#">
              Learned {state.total_words_learned} words
            </Card.Link>
          </Card.Body>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfileOverview;
