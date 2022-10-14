import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSearchParams } from "react-router-dom";

import ProfileOverview from "../../components/profileOverview";
import FollowsPanel from "../../components/followsPanel";
import * as profileService from "../../services/profileService";
import { setPage } from "../../store/follow";
import { UserContext } from "../../utils/userContext";

const Follows = () => {
  const { user } = useContext(UserContext);
  const params = new URLSearchParams(window.location.search);
  const [, setSearchParams] = useSearchParams();

  const pageState = useSelector((state) => state.followPage.value);
  const [selectedProfile, setSelectedProfile] = useState();
  const dispatch = useDispatch();

  const fetchData = async () => {
    let tab;
    try {
      tab = params.get("tab");
    } catch {}
    if (!tab) tab = "followers";
    const id = user.id;
    const initialData = {};
    const followers = await profileService.getFollowers(id);
    initialData.followers = followers.data;
    const followings = await profileService.getFollowings(id);
    initialData.followings = followings.data;
    setSearchParams({ tab: tab });
    dispatch(setPage({ ...pageState, ...initialData, id, currentTab: tab }));
  };

  useEffect(() => {
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
        <Col md={3}>
          {selectedProfile ? (
            <ProfileOverview
              user_id={selectedProfile.user_id}
              refetch={fetchData}
            />
          ) : null}
        </Col>
        <Col lg>
          <FollowsPanel
            handleSwitchTab={handleSwitchTab}
            setProfile={setSelectedProfile}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Follows;
