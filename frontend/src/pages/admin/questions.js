import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useParams, useLocation } from "react-router-dom";
import QuestionPanel from "../../components/questionPanel";
import { getQuestions } from "../../services/adminService";

const AdminQuestions = () => {
  const { id } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState();

  const handleChange = (index, newQuestion) => {
    setQuestions({ ...questions, [index]: newQuestion });
  };

  const handleDelete = (index) => {
    const toDelete = { ...questions };
    delete toDelete[index];
    setQuestions(toDelete);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getQuestions(id);
      setQuestions(data);
      setLoading(false);
    };
    fetchData();
  }, []);
  return !loading ? (
    <div>
      <h1 className="text-capitalize">{location.state.title} Questions</h1>
      <Container>
        {Object.keys(questions).map((key) => (
          <React.Fragment key={key}>
            <QuestionPanel
              question={questions[key]}
              handleChange={handleChange}
              handleDelete={handleDelete}
              index={key}
            />
          </React.Fragment>
        ))}
      </Container>
    </div>
  ) : null;
};

export default AdminQuestions;
