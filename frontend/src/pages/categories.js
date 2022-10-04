import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CategoryCard from "../components/categoryCard";

const Categories = () => {
  return (
    <Container>
      <h1>Categories</h1>
      <Row xs={1} md={4} className="g-4">
        {Array.from({ length: 9 }).map((_, idx) => (
          <Col>
            <CategoryCard />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Categories;
