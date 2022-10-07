import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { LessonContext } from "../utils/lessonContext";
import { submitAnswer } from "../services/lessonService";

const QuizPanel = () => {
  const [itemNumber, setItemNumber] = useState(1);
  const { lesson } = useContext(LessonContext);
  const { choices, id } = lesson.questions[itemNumber - 1];
  const { total_questions } = lesson.category;
  const navigate = useNavigate();

  const handleAnswerClick = async (e) => {
    const answer = e.target.value;
    const load = {
      answer: answer,
      lesson_id: lesson.id,
    };
    await submitAnswer(id, load);
    if (itemNumber != total_questions) setItemNumber(itemNumber + 1);
    else navigate(`/lesson/${lesson.id}/results`);
  };

  return (
    <Container className="pt-3 pb-3 mt-3 bg-light rounded">
      <Row>
        <Col className="d-flex align-items-center justify-content-center">
          <h1>{lesson.questions[itemNumber - 1].word}</h1>
        </Col>
        <Col>
          <div className="d-flex justify-content-end">
            <p className="fs-4">
              {itemNumber} of {total_questions}
            </p>
          </div>
          <Row>
            <Col className="d-grid gap-5 pt-3 pb-4">
              <Button
                value={choices[0]}
                onClick={handleAnswerClick}
                variant="outline-primary"
              >
                {choices[0]}
              </Button>
              <Button
                value={choices[1]}
                onClick={handleAnswerClick}
                variant="outline-primary"
              >
                {choices[1]}
              </Button>
              <Button
                value={choices[2]}
                onClick={handleAnswerClick}
                variant="outline-primary"
              >
                {choices[2]}
              </Button>
              <Button
                value={choices[3]}
                onClick={handleAnswerClick}
                variant="outline-primary"
              >
                {choices[3]}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default QuizPanel;
