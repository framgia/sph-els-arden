import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputField from "../components/input";

const EditCategory = ({ category }) => {
  return (
    <Container fluid>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1>Edit Category</h1>
          <Form>
            <InputField name="title" label="Title" type="text" />
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={10} placeholder="Description" />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button>Save</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditCategory;
