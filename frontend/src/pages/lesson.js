import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import QuizPanel from "../components/quizPanel";
import { LessonContext } from "../utils/lessonContext";

const LessonQuiz = () => {
  const { lesson } = useContext(LessonContext);

  return lesson && !lesson.completed ? (
    <div>
      <h1 className="text-capitalize">{lesson.category.title}</h1>
      <Container>
        <QuizPanel />
      </Container>
    </div>
  ) : (
    <h1>Lesson Completed</h1>
  );
};

export default LessonQuiz;
