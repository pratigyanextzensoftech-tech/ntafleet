import React from "react";
import { FormGroup, InputGroup, InputGroupText } from "reactstrap";

const InputText = ({
  name,
  value,
  label,
  type = "text",
  placeholder = "",
  register,
  errors,
  rules = {},
}) => {
  return (
    <FormGroup className="m-form__group">
      <InputGroup>
        {label && <InputGroupText>{label}</InputGroupText>}
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          className={`form-control ${errors?.[name] ? "is-invalid" : ""}`}
          style={{ border: "1px solid #ccc" }}
          {...register(name, rules)}
        />
      </InputGroup>

      {errors?.[name] && (
        <span className="text-danger small">
          {errors[name]?.message || "Required"}
        </span>
      )}
    </FormGroup>
  );
};

export default InputText;
