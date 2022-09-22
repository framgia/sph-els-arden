import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Activity from "./activity";

const ActivitiesPanel = () => {
  return (
    <Container fluid className="mt-3">
      <Card border="dark" bg="light">
        <Card.Header as="h5">Activities</Card.Header>
        <Card.Body>
          <Activity />
          <Activity />
          <Activity />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ActivitiesPanel;
