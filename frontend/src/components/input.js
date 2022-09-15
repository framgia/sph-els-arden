import React from "react";
import Form from "react-bootstrap/Form";

const InputField = ({ name, label, value, onChange, type, error }) => {
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        id={name}
        placeholder={label}
        value={value}
        onChange={onChange}
      />

      {/* conditional rendering */}
      {error && (
        <Form.Text id={name} muted>
          {error}
        </Form.Text>
      )}
    </Form.Group>
  );
};

export default InputField;
