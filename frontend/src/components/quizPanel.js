import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputField from "./input";

const QuizPanel = ({ data }) => {
  return (
    <Container className="pt-3 pb-3 mt-3 bg-light rounded">
      <Row>
        <Col className="d-flex align-items-center justify-content-center">
          <h1>{data.word}</h1>
        </Col>
        <Col>
          <div className="d-flex justify-content-end">
            <p className="fs-4">1 of 1</p>
          </div>
          <Row>
            <Col className="d-grid gap-5 pt-3 pb-4">
              <Button variant="outline-primary">Choice_0</Button>
              <Button variant="outline-primary">Choice_1</Button>
              <Button variant="outline-primary">Choice_2</Button>
              <Button variant="outline-primary">Choice_3</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default QuizPanel;
