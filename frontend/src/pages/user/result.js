import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRightCircle } from "react-bootstrap-icons";

import ResultEntry from "../../components/resultEntry";
import { getResult } from "../../services/lessonService";

const Result = () => {
  const { id } = useParams();
  const [state, setState] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getResult(id)
      .then(({ data }) => {
        setState(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <Container>
      <Row>
        <Col className="d-flex justify-content-between pb-5">
          <h1 className="text-capitalize">{state.lesson.category_id.title}</h1>
          <h3>Result {state.lesson.progress * 100}%</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row
            className="d-flex align-items-center text-center"
            style={{ fontWeight: "bold" }}
          >
            <Col>
              <p>Result</p>
            </Col>
            <Col>
              <p>Word</p>
            </Col>
            <Col>
              <p>Answer</p>
            </Col>
          </Row>
          <React.Fragment>
            {state.answers
              ? state.answers.map((answer) => (
                  <React.Fragment key={answer.id}>
                    <ResultEntry data={answer} />
                  </React.Fragment>
                ))
              : null}
            <div className="ms-4 mt-4 d-flex align-items-center justify-content-end">
              <div
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/categories")}
              >
                <span className="me-2 fs-4 align-middle">
                  Go Back to Categories
                </span>
                <ArrowRightCircle size={30} />
              </div>
            </div>
          </React.Fragment>
        </Col>
      </Row>
    </Container>
  ) : null;
};

export default Result;
