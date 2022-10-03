import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import CategoryForm from "../components/categoryForm";
import { useNavigate } from "react-router-dom";
import { addCategory } from "../services/adminService";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const AddCategory = () => {
  const navigate = useNavigate();

  const [state, setState] = useState(null);
  const [error, setError] = useState();

  const handleSave = async () => {
    addCategory(state)
      .then(() => {
        navigate("/admin/categories");
      })
      .catch(({ response }) => {
        setError(response.data);
      });
  };

  const handleChange = ({ currentTarget: input }) => {
    setState({ ...state, [input.id]: input.value });
  };

  return (
    <Container fluid>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1>Add Category</h1>
          <CategoryForm
            state={state}
            handleChange={handleChange}
            handleSave={handleSave}
            error={error}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AddCategory;
