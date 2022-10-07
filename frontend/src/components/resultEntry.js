import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Circle, XLg } from "react-bootstrap-icons";

const ResultEntry = ({ data }) => {
  return (
    <Row className="d-flex align-items-center text-center">
      <Col>{data.correct ? <Circle size={30} /> : <XLg size={30} />}</Col>
      <Col>
        <p>{data.question_id.word}</p>
      </Col>
      <Col>
        <p>{data.answer}</p>
      </Col>
    </Row>
  );
};

export default ResultEntry;
