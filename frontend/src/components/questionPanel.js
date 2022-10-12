import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import InputField from "./input";
import { updateQuestion, deleteQuestion } from "../services/adminService";

const QuestionPanel = ({ question, handleChange, handleDelete, index }) => {
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(false);
  const [errors, setErrors] = useState({
    word: "",
    correct_answer: "",
    choice_1: "",
    choice_2: "",
    choice_3: "",
  });
  const WORD = "word";
  const CA = "correct_answer";
  const C1 = "choice_1";
  const C2 = "choice_2";
  const C3 = "choice_3";

  const handleValueChange = (e, name) => {
    question[name] = e.target.value;
    handleChange(index, question);
  };

  const onSave = async () => {
    try {
      await updateQuestion(question.id, question);
      setAlert(true);
      setTimeout(() => setAlert(false), 3000);
    } catch ({ response }) {
      setErrors(response.data);
    }
  };

  const onDelete = async () => {
    await deleteQuestion(question.id);
    handleDelete(index);
    closeModal();
  };

  const closeModal = () => setShow(false);
  const showModal = () => {
    setShow(true);
  };

  return (
    <Container className="pt-3 pb-3 mt-3 bg-light rounded">
      <Row>
        <Col>
          <p className="fs-4 pb-2">Word</p>
          <InputField
            name={WORD}
            value={question.word}
            type="text"
            onChange={(e) => handleValueChange(e, WORD)}
            error={errors[WORD]}
          />
        </Col>
        <Col>
          <p className="fs-4">Choices</p>
          <InputField
            name={CA}
            value={question.correct_answer}
            label="Correct Answer"
            type="text"
            onChange={(e) => handleValueChange(e, CA)}
            error={errors[CA]}
          />
          <InputField
            name={C1}
            value={question.choice_1}
            label="Choice 1"
            type="text"
            onChange={(e) => handleValueChange(e, C1)}
            error={errors[C1]}
          />
          <InputField
            name={C2}
            value={question.choice_2}
            label="Choice 2"
            type="text"
            onChange={(e) => handleValueChange(e, C2)}
            error={errors[C2]}
          />
          <InputField
            name={C3}
            value={question.choice_3}
            label="Choice 3"
            type="text"
            onChange={(e) => handleValueChange(e, C3)}
            error={errors[C3]}
          />
          <Row>
            <Col md={{ span: 6 }} className="d-grid gap-2">
              <Button variant="primary" onClick={onSave}>
                Save
              </Button>
            </Col>
            <Col md={{ span: 6 }} className="d-grid gap-2">
              <Button variant="danger" onClick={showModal}>
                Delete
              </Button>
            </Col>
          </Row>
          <Row>
            <Col className="mt-2">
              <Alert show={alert} variant="success">
                <Alert.Heading>Sucess!</Alert.Heading>
              </Alert>
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete "{question.word}"?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete "{question.word}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            No
          </Button>
          <Button variant="primary" onClick={onDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default QuestionPanel;
