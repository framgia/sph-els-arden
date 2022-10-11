import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "../asset/style.css";

const CategoryCard = ({ data, onStart, completed, height }) => {
  const style = {
    height: height || 200,
    overflow: "auto",
  };
  return (
    <Card>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-capitalize">{data.title}</Card.Title>
        <Card.Text style={style}>{data.description}</Card.Text>
        <Col md={{ offset: 6 }} className="d-grid gap-2">
          <Button
            className="mt-auto align-self-start"
            variant="primary"
            onClick={() => onStart(data.id)}
            disabled={completed}
          >
            {completed ? "Finished" : "Start"}
          </Button>
        </Col>
      </Card.Body>
    </Card>
  );
};

export default CategoryCard;
