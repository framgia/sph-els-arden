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
import { validate, validateField, getErrorPayload } from "../utils/validation";
import * as userService from "../services/userService";

const Login = () => {
  const userLogin = useSelector((state) => state.login.value);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate(userLogin);
    const payload = { ...userLogin, errors };
    dispatch(login(payload));

    // if there are no errors, try login through api
    if (Object.keys(errors).length === 0) {
      try {
        await userService.login(userLogin);
        const payload = { ...userLogin, success: true };
        dispatch(login(payload));
      } catch (exception) {
        if (exception.response) {
          // if failed, update state and show error
          const response_error = exception.response.data;
          const key = Object.keys(response_error);
          const message = response_error[key];
          const error = { [key]: message };

          const payload = { ...userLogin, errors: error, success: false };
          dispatch(login(payload));
        }
      }
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    const name = input.id;
    const value = input.value;
    let payload = {};

    const errors = validateField(name, value, { ...userLogin });

    payload = getErrorPayload(name, value, errors, { ...userLogin });
    delete payload.errors.detail;

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
            {userLogin.errors.detail && (
              <Form.Text muted>{userLogin.errors.detail}</Form.Text>
            )}
            {userLogin.success && <Form.Text muted>Login Sucess!</Form.Text>}
            <div className="d-grid gap-2">
              <Button onClick={handleSubmit}>Login</Button>
            </div>
          </Form>
          <Link to="/register">Create an account</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
