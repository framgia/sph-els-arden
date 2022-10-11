import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import CardGroup from "react-bootstrap/CardGroup";
import CategoryCard from "../../components/categoryCard";
import * as lessonService from "../../services/lessonService";
import { LessonContext } from "../../utils/lessonContext";

const Categories = () => {
  const [categories, setCategories] = useState();
  const { allLessons } = useContext(LessonContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await lessonService.getCategories();
      setCategories(data);
    };
    fetchData();
  }, []);

  const handleStart = (id) => {
    navigate(`/lesson/${id}`);
  };

  const checkCompletion = (id) => {
    let completed = false;
    allLessons.forEach((lesson) => {
      if (lesson.category_id === id && lesson.completed) {
        completed = true;
      }
    });
    return completed;
  };

  return (
    <Container>
      <h1>Categories</h1>
      <Row xs={1} md={4} className="g-4">
        {categories
          ? Object.keys(categories).map((key) =>
              categories[key].total_questions > 0 ? (
                <CardGroup key={key}>
                  <CategoryCard
                    data={categories[key]}
                    onStart={handleStart}
                    completed={checkCompletion(categories[key].id)}
                    height={200}
                  />
                </CardGroup>
              ) : null
            )
          : null}
      </Row>
    </Container>
  );
};

export default Categories;
