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
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    addCategory(state)
      .then(() => {
        setSuccess(true);
      })
      .catch(({ response }) => {
        setError(response.data);
      })
      .finally(() => {});
  };

  const handleChange = ({ currentTarget: input }) => {
    const name = input.id;
    const value = input.value;

    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    if (success) navigate("/admin/categories");
  }, [success]);

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
