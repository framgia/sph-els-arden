import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { setProfile } from "../store/profile";
import ProfileOverview from "../components/profileOverview";
import ActivitiesPanel from "../components/activitiesPanel";
import { UserContext } from "../utils/userContext";
import * as profileService from "../services/profileService";

const Profile = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.profile.value);

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await profileService.getProfilePageData(
        id ? id : user.id
      );

      dispatch(
        setProfile({
          ...profileState,
          ...profileData.data,
        })
      );
    };
    fetchData();
  }, [id]);
  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <ProfileOverview />
        </Col>
        <Col lg>
          <ActivitiesPanel otherUserID={id} />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
