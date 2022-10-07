import { createContext, useState, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";

import { startLesson } from "../services/lessonService";

const LessonContext = createContext(null);

const LessonContextProvider = ({ children }) => {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lessonId, setLessonId] = useState();

  useEffect(() => {
    const fetchData = () => {
      startLesson(lessonId)
        .then(({ data }) => {
          setLesson(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        })
        .finally(() => {});
    };
    fetchData();
  }, [lessonId]);

  return (
    <LessonContext.Provider value={{ lesson, setLessonId }}>
      {!loading && children}
    </LessonContext.Provider>
  );
};

export { LessonContext, LessonContextProvider };
