import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../asset/style.css";

const WordEntry = ({ data }) => {
  return (
    <Row className="pt-2 bg-light rounded d-flex justify-content-around text-center">
      <Col>
        <p>{data.word}</p>
      </Col>
      <Col>
        <p>{data.answer}</p>
      </Col>
    </Row>
  );
};

export default WordEntry;
