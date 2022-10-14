import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ActivitiesPanel from "../../components/activitiesPanel";
import { UserContext } from "../../utils/userContext";
import * as profileService from "../../services/profileService";
import Button from "react-bootstrap/esm/Button";
import ProfileOverview from "../../components/profileOverview";

const Profile = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await profileService.getProfilePageData(
        id ? id : user.id
      );
      setProfile(data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  return (
    !loading && (
      <Container fluid>
        <Row>
          <Col md={3}>
            <Row>
              <ProfileOverview user_id={id} />
            </Row>
            <Row>
              <div md="auto" className="d-grid gap-2 mt-3">
                {profile.viewingOwn ? (
                  <React.Fragment>
                    <Button
                      variant="success"
                      onClick={() => navigate("/profile/follows")}
                    >
                      View Follows
                    </Button>
                    <Button onClick={() => navigate("/profile/edit")}>
                      Edit Profile
                    </Button>
                  </React.Fragment>
                ) : null}
              </div>
            </Row>
          </Col>
          <Col lg>
            <ActivitiesPanel otherUserID={id} />
          </Col>
        </Row>
      </Container>
    )
  );
};

export default Profile;
