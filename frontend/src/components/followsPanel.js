import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import FollowEntry from "./followEntry";
import { setProfile } from "../store/profile";
import * as profileService from "../services/profileService";

const FollowsPanel = (props) => {
  const pageState = useSelector((state) => state.followPage.value);
  const profileState = useSelector((state) => state.profile.value);
  const dispatch = useDispatch();
  const { handleSwitchTab } = props;
  const currentTab = pageState.currentTab;

  const overview = async (key) => {
    const state = pageState[currentTab][key];
    const followers = await profileService.getFollowers(state.profile.user_id);
    const followings = await profileService.getFollowings(
      state.profile.user_id
    );
    let follow;

    for (const profile in followers.data) {
      const follower_id = followers.data[profile]["profile"].user_id;
      if (follower_id === pageState.id) {
        follow = true;
        break;
      } else {
        follow = false;
      }
    }
    const initialData = {};
    initialData.follower = Object.keys(followers.data).length;
    initialData.following = Object.keys(followings.data).length;
    dispatch(
      setProfile({
        ...profileState,
        ...state.profile,
        ...state.user,
        ...initialData,
        follow,
      })
    );
  };

  return (
    <Container fluid className="mt-3">
      <Card border="dark" bg="light">
        <Card.Header>
          <Nav fill justify variant="tabs">
            <Nav.Item>
              <Nav.Link
                onClick={handleSwitchTab}
                active={pageState.currentTab === "followers"}
              >
                Followers
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={handleSwitchTab}
                active={pageState.currentTab === "followings"}
              >
                Followings
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          {pageState[currentTab]
            ? Object.keys(pageState[currentTab]).map((entry) => (
                <div key={entry} onClick={() => overview(entry)}>
                  <FollowEntry entry={entry} />
                </div>
              ))
            : null}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FollowsPanel;
