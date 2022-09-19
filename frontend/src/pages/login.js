import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import InputField from "../components/input";
import { login } from "../store/user";

const Login = () => {
  const userLogin = useSelector((state) => state.login.value);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    // do something here
  };

  const handleChange = ({ currentTarget: input }) => {
    const name = input.id;
    const value = input.value;
    const error = {};
    let payload = {};

    payload = {
      ...userLogin,
      [name]: value,
      errors: error,
      success: false,
    };

    dispatch(login(payload));
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1>Login</h1>
          <Form>
            <InputField
              name="email"
              value={userLogin.email}
              label="Email"
              type="text"
              onChange={handleChange}
              error={userLogin.errors.email}
            />
            <InputField
              name="password"
              value={userLogin.password}
              label="Password"
              type="password"
              onChange={handleChange}
              error={userLogin.errors.password}
            />
            <Button onClick={handleSubmit}>Submit</Button>
          </Form>
          {userLogin.success && <Form.Text muted>Login Sucess!</Form.Text>}
          <Link to="/register">Create an account</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
