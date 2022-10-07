import React, { useEffect, useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useParams, useNavigate } from "react-router-dom";
import { addWord } from "../services/adminService";

import InputField from "../components/input";

const AdminAddWord = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    word: "",
    correct_answer: "",
    choice_1: "",
    choice_2: "",
    choice_3: "",
  });
  const WORD = "word";
  const CA = "correct_anwer";
  const C1 = "choice_1";
  const C2 = "choice_2";
  const C3 = "choice_3";
  const WORD_ref = useRef();
  const CA_ref = useRef();
  const C1_ref = useRef();
  const C2_ref = useRef();
  const C3_ref = useRef();

  const onSave = async () => {
    const load = {
      category_id: id,
      word: WORD_ref.current.value,
      correct_answer: CA_ref.current.value,
      choice_1: C1_ref.current.value,
      choice_2: C2_ref.current.value,
      choice_3: C3_ref.current.value,
    };

    try {
      await addWord(load);
      navigate("/admin/categories");
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  return (
    <div>
      <h1 className="text-capitalize">Add Word</h1>
      <Container className="pt-3 pb-3 mt-3 bg-light rounded">
        <Row>
          <Col>
            <p className="fs-4 pb-2">Word</p>
            <InputField
              ref={WORD_ref}
              name={WORD}
              type="text"
              error={errors[WORD]}
            />
          </Col>
          <Col>
            <p className="fs-4">Choices</p>
            <InputField
              ref={CA_ref}
              name={CA}
              label="Correct Answer"
              type="text"
              error={errors[CA]}
            />
            <InputField
              ref={C1_ref}
              name={C1}
              label="Choice 1"
              type="text"
              error={errors[C1]}
            />
            <InputField
              ref={C2_ref}
              name={C2}
              label="Choice 2"
              type="text"
              error={errors[C2]}
            />
            <InputField
              ref={C3_ref}
              name={C3}
              label="Choice 3"
              type="text"
              error={errors[C3]}
            />
            <Row>
              <Col md={{ span: 6, offset: 6 }} className="d-grid gap-2">
                <Button variant="primary" onClick={onSave}>
                  Save
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminAddWord;
