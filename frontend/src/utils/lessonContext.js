import { createContext, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { startLesson, getLessons } from "../services/lessonService";
import { UserContext } from "./userContext";

const LessonContext = createContext(null);

const LessonContextProvider = ({ children }) => {
  const { user } = useContext(UserContext);
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
    getLessons(user.profile_id).then(({ data }) => {
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
