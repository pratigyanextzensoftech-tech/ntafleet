import React from "react";
import { FormGroup, InputGroup, InputGroupText, Input } from "reactstrap";

const InputText = ({
  name,
  id,
  label,
  type = "text",
  placeholder = "",
  register,
  errors,
  rules = {},
  defaultValue = "", // 👈 new prop for prefilled data
}) => {
  return (
    <FormGroup className="m-form__group">
      <InputGroup>
        {label && <InputGroupText>{label}</InputGroupText>}
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          defaultValue={defaultValue} // 👈 show API data here
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
