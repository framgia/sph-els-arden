import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import CardGroup from "react-bootstrap/CardGroup";
import CategoryCard from "../components/categoryCard";
import * as lessonService from "../services/lessonService";

const Categories = () => {
  const [categories, setCategories] = useState();
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

  return (
    <Container>
      <h1>Categories</h1>
      <Row xs={1} md={4} className="g-4">
        {categories
          ? Object.keys(categories).map((key) => (
              <CardGroup key={key}>
                <CategoryCard data={categories[key]} onStart={handleStart} />
              </CardGroup>
            ))
          : null}
      </Row>
    </Container>
  );
};

export default Categories;
