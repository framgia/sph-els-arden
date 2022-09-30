import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import InputField from "../components/input";
import { validate, validateField } from "../utils/validation";
import * as profileService from "../services/profileService";
import { getErrorMessage } from "../utils/validation";

const EditProfile = () => {
  const [state, setState] = useState();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  let avatarFile = {};

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await profileService.getCurrentProfile();
      const payload = {
        ...data.profile,
        ...data.user,
        password: "",
        password2: "",
      };

      setState(payload);
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validate(state));

    if (Object.keys(errors).length === 0) {
      try {
        const profileResponse = await profileService.update(state);

        const avatarResponse = await profileService.uploadAvatar(
          state,
          avatarFile
        );
        if (avatarResponse.status === 201 && profileResponse.status === 201) {
          navigate("/profile");
        }
      } catch (exception) {
        if (exception.response) {
          // if failed, update state and show error
          const response_error = exception.response.data;
          setErrors({ ...response_error });
        }
      }
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    const name = input.id;
    const value = input.value;
    let payload = {};

    const resetFieldError = errors;
    delete resetFieldError[name];
    setErrors(resetFieldError);

    const currErrors = validateField(name, value, { ...state });
    if (currErrors) {
      const key = currErrors.path[0];
      const message = getErrorMessage(currErrors);

      payload = { ...errors };
      payload[key] = message;
    }

    setState({ ...state, [name]: value });
    setErrors({ ...errors, ...payload });
  };

  const handleFileChange = async (event) => {
    const formData = new FormData();
    const avatar = event.target.files[0];
    formData.append("avatar", avatar);
    avatarFile = formData;
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1>Edit Profile</h1>
          <Form>
            <Row>
              <Col>
                <InputField
                  name="first_name"
                  label="First Name"
                  type="text"
                  onChange={handleChange}
                  error={errors.first_name}
                />
              </Col>
              <Col>
                <InputField
                  name="last_name"
                  label="Last Name"
                  type="text"
                  onChange={handleChange}
                  error={errors.last_name}
                />
              </Col>
            </Row>
            <Row>
              <InputField
                name="email"
                label="Email"
                type="text"
                onChange={handleChange}
                error={errors.email}
              />
              <InputField
                name="password"
                label="Password"
                type="password"
                onChange={handleChange}
                error={errors.password}
              />
              <InputField
                name="password2"
                label="Confirm Password"
                type="password"
                onChange={handleChange}
                error={errors.password2}
              />
            </Row>
            <Row>
              <Form.Group controlId="avatarUpload" className="mb-3">
                <Form.Label>Avatar</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>
            </Row>
            <div className="d-grid gap-2">
              <Button onClick={handleSubmit}>Save</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfile;
