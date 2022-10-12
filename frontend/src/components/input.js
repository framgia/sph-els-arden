import React, { forwardRef } from "react";
import Form from "react-bootstrap/Form";

const InputField = forwardRef(
  ({ name, label, value, onChange, type, error, defaultValue }, ref) => {
    return (
      <Form.Group className="mb-3" controlId={name}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          ref={ref || null}
          type={type}
          placeholder={label}
          value={value}
          onChange={onChange}
          defaultValue={defaultValue || null}
        />

        {/* conditional rendering */}
        {error && (
          <Form.Text className="text-danger" id={name}>
            {error}
          </Form.Text>
        )}
      </Form.Group>
    );
  }
);

export default InputField;
