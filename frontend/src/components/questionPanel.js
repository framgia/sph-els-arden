import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const QuestionPanel = () => {
  return (
    <Container className="pt-3 bg-light rounded">
      <Row>
        <Col>
          <p>Word</p>
        </Col>
        <Col>
          <p>Choices</p>
        </Col>
      </Row>
    </Container>
  );
};

export default QuestionPanel;
