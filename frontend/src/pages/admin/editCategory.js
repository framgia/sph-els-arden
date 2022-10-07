import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import CategoryForm from "../../components/categoryForm";
import { useNavigate, useParams } from "react-router-dom";
import { editCategory, getCategory } from "../../services/adminService";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState(null);
  const [error, setError] = useState();

  const handleSave = async () => {
    editCategory(state)
      .then(() => {
        navigate("/admin/categories");
      })
      .catch(({ response }) => {
        setError(response.data);
      });
  };

  const handleChange = ({ currentTarget: input }) => {
    const name = input.id;
    const value = input.value;

    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCategory(id);
      setState(data);
    };
    fetchData();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1>Edit {state ? state.title : "Category"}</h1>
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

export default EditCategory;
