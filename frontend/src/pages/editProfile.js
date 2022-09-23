import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { editProfile } from "../store/profile";
import InputField from "../components/input";
import { validate, validateField, getErrorPayload } from "../utils/validation";
import * as profileService from "../services/profileService";

const EditProfile = () => {
  const state = useSelector((state) => state.editProfile.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let avatarFile = {};

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await profileService.getCurrentProfile();
      const payload = {
        ...state,
        profile_id: data.profile.id,
        user_id: data.profile.user_id,
      };
      dispatch(editProfile(payload));
      return data;
    };
    fetchProfile();
  }, []);

  const handleSubmit = async () => {
    const errors = validate(state);
    const payload = { ...state, errors };
    dispatch(editProfile(payload));

    if (Object.keys(errors).length === 0) {
      try {
        await profileService.update(state);
        const payload = { ...state, success: true };
        dispatch(editProfile(payload));

        await profileService.uploadAvatar(state, avatarFile);
      } catch (exception) {
        if (exception.response) {
          console.log(exception);
          // if failed, update state and show error
          const response_error = exception.response.data;
          const key = Object.keys(response_error);
          const message = response_error[key];
          const error = { [key]: message };

          const payload = { ...state, errors: error, success: false };
          dispatch(editProfile(payload));
        }
      }
      if (Object.keys(errors).length === 0) {
        navigate("/profile");
      }
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    const name = input.id;
    const value = input.value;
    let payload = {};

    const errors = validateField(name, value, { ...state });

    payload = getErrorPayload(name, value, errors, { ...state });
    delete payload.errors.detail;

    dispatch(editProfile(payload));
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
