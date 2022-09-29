import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSearchParams } from "react-router-dom";

import ProfileOverview from "../components/profileOverview";
import FollowsPanel from "../components/followsPanel";
import * as profileService from "../services/profileService";
import * as userService from "../services/userService";
import { setPage } from "../store/follow";

const Follows = () => {
  const params = new URLSearchParams(window.location.search);
  const [, setSearchParams] = useSearchParams();
  let tab;

  const pageState = useSelector((state) => state.followPage.value);
  const profile = useSelector((state) => state.profile.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        tab = params.get("tab");
      } catch {}
      if (!tab) tab = "followers";
      const { data } = await userService.loggedInUser();
      const { id } = data;
      const initialData = {};
      const response1 = await profileService.getFollowers(id);
      initialData.followers = response1.data;
      const response2 = await profileService.getFollowings(id);
      initialData.followings = response2.data;
      setSearchParams({ tab: tab });
      dispatch(setPage({ ...pageState, ...initialData, id, currentTab: tab }));
    };
    fetchData();
  }, []);

  const handleSwitchTab = () => {
    if (pageState.currentTab === "followers") {
      dispatch(setPage({ ...pageState, currentTab: "followings" }));
      params.set("tab", "followings");
      setSearchParams({ tab: "followings" });
    } else {
      dispatch(setPage({ ...pageState, currentTab: "followers" }));
      params.set("tab", "followers");
      setSearchParams({ tab: "followers" });
    }
  };

  return (
    <Container fluid>
      <h1>Your Follows</h1>
      <Row>
        <Col md={3}>{profile.user_id === "" ? null : <ProfileOverview />}</Col>
        <Col lg>
          <FollowsPanel handleSwitchTab={handleSwitchTab} />
        </Col>
      </Row>
    </Container>
  );
};

export default Follows;
