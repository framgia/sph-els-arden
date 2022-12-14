import React, { useEffect, useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import { UserContext } from "../utils/userContext";
import Activity from "./activity";
import * as activityService from "../services/activityService";

const ActivitiesPanel = ({ otherUserID, all }) => {
  const [activities, setActivities] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      if (!all) {
        const { data } = await activityService.getUser(
          otherUserID ? otherUserID : user.id
        );
        if (Object.keys(data).length !== 0) setActivities(data);
      } else {
        const { data } = await activityService.getAllUsers();
        if (Object.keys(data).length !== 0) setActivities(data);
      }
    };
    fetchData();
  }, []);

  return (
    <Container fluid className="mt-3">
      <Card border="dark" bg="light">
        <Card.Header as="h5">Activities</Card.Header>
        <Card.Body>
          {activities ? (
            Object.keys(activities).map((key) => (
              <div key={key}>
                <Activity activity={activities[key]} />
              </div>
            ))
          ) : (
            <p className="fs-5">There are no activities yet</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ActivitiesPanel;
