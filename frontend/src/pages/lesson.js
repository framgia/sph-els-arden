import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import QuizPanel from "../components/quizPanel";
import { LessonContext } from "../utils/lessonContext";

const LessonQuiz = () => {
  const { id } = useParams();
  const { lesson, setLessonId } = useContext(LessonContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLessonId(id);
  });

  useEffect(() => {
    if (lesson) setLoading(false);
  }, [lesson]);
  return !loading && !lesson.completed ? (
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
