import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { register } from "../store/user";
import InputField from "../components/input";
import { validate, validateField, getErrorPayload } from "../utils/validation";
import * as userService from "../services/userService";

const Register = () => {
  const registrant = useSelector((state) => state.registrant.value);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate(registrant);
    const payload = { ...registrant, errors };
    dispatch(register(payload));

    // if there are no errors, try register through api
    if (Object.keys(errors).length === 0) {
      try {
        await userService.register(registrant);
        const payload = { ...registrant, success: true };
        dispatch(register(payload));
      } catch (exception) {
        if (exception.response && exception.response.status === 400) {
          // if failed, update state and show error
          const response_error = exception.response.data;
          const key = Object.keys(response_error);
          const message = response_error[key][0];
          const error = { [key]: message };

          const payload = { ...registrant, errors: error, success: false };
          dispatch(register(payload));
        }
      }
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    const name = input.id;
    const value = input.value;
    let payload = {};

    const errors = validateField(name, value, { ...registrant });

    payload = getErrorPayload(name, value, errors, { ...registrant });

    // create new object for payload
    //update state every change in the input field
    dispatch(register(payload));
  };

  return (
    <div>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h1>Register</h1>
            <Form onSubmit={handleSubmit}>
              <InputField
                name="first_name"
                value={registrant.first_name}
                label="First Name"
                type="text"
                onChange={handleChange}
                error={registrant.errors.first_name}
              />

              <InputField
                name="last_name"
                value={registrant.last_name}
                label="Last Name"
                type="text"
                onChange={handleChange}
                error={registrant.errors.last_name}
              />

              <InputField
                name="email"
                value={registrant.email}
                label="Email"
                type="text"
                onChange={handleChange}
                error={registrant.errors.email}
              />

              <InputField
                name="password"
                value={registrant.password}
                label="Password"
                type="password"
                onChange={handleChange}
                error={registrant.errors.password}
              />

              <InputField
                name="password2"
                value={registrant.password2}
                label="Confirm Password"
                type="password"
                onChange={handleChange}
                error={registrant.errors.password2}
              />
              <div className="d-grid gap-2">
                <Button onClick={handleSubmit}>Register</Button>
              </div>
            </Form>
            {registrant.success && (
              <Form.Text muted>Registration Sucess!</Form.Text>
            )}
            <Link to="/login">Already have an account?</Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
