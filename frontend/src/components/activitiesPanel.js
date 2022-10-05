import React, { useEffect, useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import { UserContext } from "../utils/userContext";
import Activity from "./activity";
import * as activityService from "../services/activityService";

const ActivitiesPanel = ({ otherUserID }) => {
  const [activities, setActivities] = useState();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await activityService.getActivities(
        otherUserID ? otherUserID : user.id
      );
      setActivities(data);
    };
    fetchData();
  }, [user.id]);

  return (
    <Container fluid className="mt-3">
      <Card border="dark" bg="light">
        <Card.Header as="h5">Activities</Card.Header>
        <Card.Body>
          {activities
            ? Object.keys(activities).map((key) => (
                <div key={key}>
                  <Activity activity={activities[key]} />
                </div>
              ))
            : null}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ActivitiesPanel;
