import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { UserContext } from "../utils/userContext";
import ResultEntry from "../components/resultEntry";

const Result = () => {
  const { user } = useContext(UserContext);

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-between pb-5">
          <h1>Category Title</h1>
          <h3>Result XX%</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container
            className="d-flex justify-content-around"
            style={{ columns: 3, fontWeight: "bold" }}
          >
            <p>Result</p>
            <p>Word</p>
            <p>Answer</p>
          </Container>
          <Container>
            <ResultEntry data={{ correct: true }} />
            <ResultEntry data={{ correct: false }} />
            <ResultEntry data={{ correct: false }} />
            <ResultEntry data={{ correct: true }} />
            <ResultEntry data={{ correct: false }} />
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Result;
