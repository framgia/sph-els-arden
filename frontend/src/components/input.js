import React, { forwardRef } from "react";
import Form from "react-bootstrap/Form";

const InputField = forwardRef(
  ({ name, label, value, onChange, type, error }, ref) => {
    return (
      <Form.Group className="mb-3" controlId={name}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          ref={ref || null}
          type={type}
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
  }
);

export default InputField;
