import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Pagination from "../components/pagination";
import { UserContext } from "../utils/userContext";
import * as adminService from "../services/adminService";
import { Link, useNavigate } from "react-router-dom";

const AdminCategories = () => {
  const [categories, setCategories] = useState();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await adminService.getCategories();
      setCategories(data);
    };
    fetchData();
  }, []);

  const closeModal = () => setShow(false);
  const showModal = (category) => {
    setSelected(category);
    setShow(true);
  };

  const handleDelete = async () => {
    const { status } = await adminService.deleteCategory(selected.id);
    if (status === 204) {
      const { data } = await adminService.getCategories();
      setCategories(data);
    }
    closeModal();
  };

  const handleEdit = (id) => {
    navigate(`/admin/category/${id}/edit`);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Admin | Categories</h1>
          <div className="align-items-end">
            <Button
              variant="success"
              onClick={() => navigate("/admin/category/add")}
            >
              Add New Category
            </Button>
          </div>
          <Table striped bordered hover bgcolor="white">
            <thead className="text-center">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories
                ? Object.keys(categories).map((key) => (
                    <tr key={categories[key].id}>
                      <td className="align-middle text-capitalize">
                        {categories[key].title}
                      </td>
                      <td className="align-middle">
                        {categories[key].description}
                      </td>
                      <td className="align-middle">
                        <div className="d-grid gap-2">
                          <Button size="sm">Add word</Button>
                          <Button
                            onClick={() => handleEdit(categories[key].id)}
                            size="sm"
                            variant="warning"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => showModal(categories[key])}
                            size="sm"
                            variant="danger"
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {selected.title}?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {selected.title}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            No
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminCategories;
