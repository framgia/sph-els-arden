import React from "react";

const InputField = ({ name, label, value, onChange, type, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        onChange={onChange}
        value={value}
        id={name}
        type={type}
        className="form-control"
      />

      {/* conditional rendering */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default InputField;
