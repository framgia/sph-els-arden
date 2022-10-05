import React from "react";
import Container from "react-bootstrap/Container";
import QuizPanel from "../components/quizPanel";

const LessonQuiz = () => {
  const filler = {
    word: "じゃね",
    choice_0: "goodbye",
    choice_1: "thank you",
    choice_2: "maybe",
    choice_3: "you",
  };
  return (
    <div>
      <h1>"Category Title"</h1>
      <Container>
        <QuizPanel data={filler} />
      </Container>
    </div>
  );
};

export default LessonQuiz;
