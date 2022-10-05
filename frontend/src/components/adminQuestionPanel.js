import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputField from "./input";

const QuestionPanel = ({ data }) => {
  return (
    <Container className="pt-3 pb-3 mt-3 bg-light rounded">
      <Row>
        <Col>
          <p className="fs-4 pb-2">Word</p>
          <InputField name="word" value={data.word} type="text" />
        </Col>
        <Col>
          <p className="fs-4">Choices</p>
          <InputField
            name="correct_anwer"
            value={data.correct_answer}
            label="Correct Answer"
            type="text"
          />
          <InputField
            name="choice_1"
            value={data.choice_1}
            label="Choice 1"
            type="text"
          />
          <InputField
            name="choice_2"
            value={data.choice_2}
            label="Choice 2"
            type="text"
          />
          <InputField
            name="choice_3"
            value={data.choice_3}
            label="Choice 3"
            type="text"
          />
          <Row>
            <Col md={{ span: 6 }} className="d-grid gap-2">
              <Button fill variant="primary">
                Save
              </Button>
            </Col>
            <Col md={{ span: 6 }} className="d-grid gap-2">
              <Button fill variant="danger">
                Delete
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default QuestionPanel;
