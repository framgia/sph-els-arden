import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [profile_id, setProfile_id] = useState();
  const [user_id, setUser_id] = useState();
  const [success, setSuccess] = useState(false);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({});
  const state = {
    profile_id: profile_id,
    user_id: user_id,
    success: success,
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
    password2: password2,
    errors: errors,
  };

  const navigate = useNavigate();
  let avatarFile = {};

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await profileService.getCurrentProfile();
      setProfile_id(data.profile.id);
      setUser_id(data.profile.user_id);
      setFirst_name(data.user.first_name);
      setLast_name(data.user.last_name);
      setEmail(data.user.email);
    };
    fetchProfile();
  }, []);

  const handleSubmit = async () => {
    const currErrors = validate(state);
    setErrors(currErrors);

    if (Object.keys(currErrors).length === 0) {
      try {
        const profileResponse = await profileService.update(state);

        const avatarResponse = await profileService.uploadAvatar(
          state,
          avatarFile
        );
        if (avatarResponse.status === 201 && profileResponse.status === 201) {
          setSuccess(true);
          navigate("/profile");
        }
      } catch (exception) {
        if (exception.response) {
          // if failed, update state and show error
          const response_error = exception.response.data;
          const key = Object.keys(response_error);
          const message = response_error[key];
          const error = { [key]: message };

          setErrors(error);
          setSuccess(false);
        }
      }
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    const name = input.id;
    const value = input.value;
    const resetFieldError = { ...state.errors };
    let payload = {};

    delete resetFieldError[name];
    setErrors(resetFieldError);

    const currErrors = validateField(name, value, { ...state });
    if (currErrors) {
      const key = currErrors.path[0];
      const message = getErrorMessage(currErrors);

      payload = { ...errors };
      payload[key] = message;
      setErrors(payload);
    }

    switch (name) {
      case "first_name":
        setFirst_name(value);
        break;
      case "last_name":
        setLast_name(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "password2":
        setPassword2(value);
        break;
      default:
        break;
    }
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
                  value={state.first_name}
                  label="First Name"
                  type="text"
                  onChange={handleChange}
                  error={state.errors.first_name}
                />
              </Col>
              <Col>
                <InputField
                  name="last_name"
                  value={state.last_name}
                  label="Last Name"
                  type="text"
                  onChange={handleChange}
                  error={state.errors.last_name}
                />
              </Col>
            </Row>
            <Row>
              <InputField
                name="email"
                value={state.email}
                label="Email"
                type="text"
                onChange={handleChange}
                error={state.errors.email}
              />
              <InputField
                name="password"
                value={state.password}
                label="Password"
                type="password"
                onChange={handleChange}
                error={state.errors.password}
              />
              <InputField
                name="password2"
                value={state.password2}
                label="Confirm Password"
                type="password"
                onChange={handleChange}
                error={state.errors.password2}
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
