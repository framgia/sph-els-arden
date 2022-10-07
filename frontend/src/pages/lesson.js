import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import QuizPanel from "../components/quizPanel";
import { LessonContext } from "../utils/lessonContext";

const LessonQuiz = () => {
  const { id } = useParams();
  const { lesson, setLessonId } = useContext(LessonContext);

  useEffect(() => {
    setLessonId(id);
  });

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
