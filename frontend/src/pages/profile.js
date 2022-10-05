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
      let follow;
      const followers = await profileService.getFollowers(id ? id : user.id);
      const followings = await profileService.getFollowings(id ? id : user.id);
      const currentProfile = await profileService.getCurrentProfile();
      const { data } = id
        ? await profileService.getOtherProfile(id)
        : currentProfile;

      let viewingOwn = !id || user.id == id;

      for (const profile in followers.data) {
        const follower_id = followers.data[profile]["profile"].user_id;
        if (follower_id === user.id) {
          follow = true;
          break;
        } else {
          follow = false;
        }
      }

      dispatch(
        setProfile({
          ...profileState,
          ...data.user,
          ...data.profile,
          follower: Object.keys(followers.data).length,
          following: Object.keys(followings.data).length,
          viewingOwn,
          follow,
        })
      );
    };
    fetchData();
  }, [id]);
  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <ProfileOverview otherUserID={id} />
        </Col>
        <Col lg>
          <ActivitiesPanel otherUserID={id} />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
