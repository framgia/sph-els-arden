import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import FollowEntry from "./followEntry";

const FollowsPanel = ({ handleSwitchTab, setProfile }) => {
  const pageState = useSelector((state) => state.followPage.value);
  const currentTab = pageState.currentTab;

  const overview = async (key) => {
    const state = pageState[currentTab][key];

    setProfile({ ...state.profile, ...state.user });
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
          {Object.keys(pageState[currentTab]).length !== 0 ? (
            Object.keys(pageState[currentTab]).map((entry) => (
              <div key={entry} onClick={() => overview(entry)}>
                <FollowEntry entry={entry} />
              </div>
            ))
          ) : (
            <p className="fs-5 d-flex justify-content-center">
              No {currentTab}
            </p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FollowsPanel;
