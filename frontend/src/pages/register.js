import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { register } from "../store/user";
import InputField from "../components/input";
import {
  validate,
  validateField,
  getErrorMessage,
} from "../components/validation";

const Register = () => {
  const registrant = useSelector((state) => state.registrant.value);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate(registrant);
    const payload = { ...registrant, errors };
    dispatch(register(payload));
    // if there are no errors, register through api
  };

  const handleChange = ({ currentTarget: input }) => {
    const name = input.id;
    const value = input.value;
    const error = {};
    let payload = {};

    const errors = validateField(name, value);

    if (errors) {
      const key = errors.path[0];
      const message = getErrorMessage(errors);
      error[key] = message;

      const error_payload = { ...registrant.errors, [key]: message };
      payload = { ...registrant, [name]: value, errors: error_payload };
    } else {
      const error_payload = { ...registrant.errors };
      delete error_payload[name]; // remove the error
      payload = { ...registrant, [name]: value, errors: error_payload };
    }

    // create new object for payload
    //update state every change in the input field
    dispatch(register(payload));
  };

  return (
    <div>
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
        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  );
};

export default Register;
