import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const CategoryCard = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Category title</Card.Title>
        <Card.Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          quis mi sem. Mauris sit amet libero enim. Maecenas tempor porttitor
          justo quis blandit.
        </Card.Text>
        <Col md={{ offset: 6 }} className="d-grid gap-2">
          <Button fill variant="primary">
            Start
          </Button>
        </Col>
      </Card.Body>
    </Card>
  );
};

export default CategoryCard;
