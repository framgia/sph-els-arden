import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import avatarPlaceholder from "../asset/avatar_placeholder.png";
import * as profileService from "../services/profileService";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../utils/userContext";

const ProfileOverview = ({ user_id, refetch }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [selectedProfile, setSelectedProfile] = useState();
  const [loading, setLoading] = useState(true);

  const handleFollow = async () => {
    try {
      if (selectedProfile.follow) {
        await profileService.unfollow(selectedProfile.id);
        fetchData();
        if (refetch) refetch();
      } else {
        await profileService.follow(selectedProfile.id);
        fetchData();
        if (refetch) refetch();
      }
    } catch {}
  };

  const fetchData = async () => {
    if (user_id && user_id != user.id) {
      const { data } = await profileService.getOtherProfile(user_id);
      setSelectedProfile({ ...data, viewingOwn: false });
      setLoading(false);
    } else {
      const { data } = await profileService.getCurrentProfile();
      setSelectedProfile({ ...data, viewingOwn: true });
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [user_id, user.id]);

  return (
    !loading && (
      <Container fluid className="mt-3">
        <Card className="text-center" border="dark">
          <Card.Img
            variant="top"
            src={
              selectedProfile.avatar
                ? `http://${selectedProfile.avatar}`
                : avatarPlaceholder
            }
          />
          <Card.Body>
            <Card.Title style={{ textTransform: "capitalize" }}>
              {selectedProfile.first_name} {selectedProfile.last_name}
            </Card.Title>
            <hr />
            <Row
              className="justify-content-center"
              onClick={
                selectedProfile.viewingOwn
                  ? () => navigate("/profile/follows")
                  : null
              }
            >
              <Col>
                <p>{selectedProfile.follower}</p>
                <p>Follower</p>
              </Col>
              <Col>
                <p>{selectedProfile.following}</p>
                <p>Following</p>
              </Col>
            </Row>
            {!selectedProfile.viewingOwn ? (
              <Button variant="primary" onClick={handleFollow}>
                {selectedProfile.follow ? "Unfollow" : "Follow"}
              </Button>
            ) : null}
            <Card.Body>
              <Card.Text href="#">
                Learned {selectedProfile.total_words_learned} words
              </Card.Text>
            </Card.Body>
          </Card.Body>
        </Card>
      </Container>
    )
  );
};

export default ProfileOverview;
