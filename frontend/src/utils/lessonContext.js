import { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { startLesson, getLessons } from "../services/lessonService";

const LessonContext = createContext(null);

const LessonContextProvider = ({ children }) => {
  const [lesson, setLesson] = useState(null);
  const [allLessons, setAllLessons] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lessonId, setLessonId] = useState();
  const { id } = useParams();

  useEffect(() => {
    startLesson(lessonId).then(({ data }) => {
      setLesson(data);
    });
  }, [lessonId]);

  useEffect(() => {
    setLessonId(id);
  }, [id]);

  useEffect(() => {
    getLessons().then(({ data }) => {
      setAllLessons(data);
    });
  }, []);

  useEffect(() => {
    if (id && lesson) setLoading(false);
    else if (!id && allLessons) setLoading(false);
  }, [lesson, allLessons, id]);

  return (
    <LessonContext.Provider value={{ lesson, allLessons, setLessonId }}>
      {!loading && children}
    </LessonContext.Provider>
  );
};

export { LessonContext, LessonContextProvider };
