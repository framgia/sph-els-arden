import React from "react";
import Container from "react-bootstrap/Container";
import QuestionPanel from "../components/adminQuestionPanel";

const AdminQuestions = () => {
  const filler = {
    word: "じゃね",
    correct_answer: "goodbye",
    choice_1: "thank you",
    choice_2: "maybe",
    choice_3: "you",
  };
  return (
    <div>
      <h1>"Category Title" Questions</h1>
      <Container>
        <QuestionPanel data={filler} />
        <QuestionPanel data={filler} />
        <QuestionPanel data={filler} />
      </Container>
    </div>
  );
};

export default AdminQuestions;
