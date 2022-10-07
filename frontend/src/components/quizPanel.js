import React, { useContext, useState } from "react";
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
    const load = {
      answer: e.target.value,
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
              {Object.keys(choices).map((key) => (
                <React.Fragment key={key}>
                  <Button
                    value={choices[key]}
                    onClick={handleAnswerClick}
                    variant="outline-primary"
                  >
                    {choices[key]}
                  </Button>
                </React.Fragment>
              ))}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default QuizPanel;
