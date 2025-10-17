import React, { useEffect } from "react";
import { FormGroup, InputGroup, InputGroupText } from "reactstrap";
import { Controller } from "react-hook-form";
import Select from "react-select";

const DropDown = ({
  control,
  name,
  label = "Select Option",
  placeholder = "Select  option",
  loading = false,
  options = [],
  rules = {},
  errors = {},
  autoSelectFirst = false, // ✅ flexibility flag
}) => {
  const errorMsg = errors?.[name]?.message;

  // ✅ Automatically set SECOND option (index 1) if available
  useEffect(() => {
    if (
      autoSelectFirst &&
      options?.length > 1 &&
      control?._formValues[name] == null
    ) {
      control._formValues[name] = options[1];
    }
  }, [options, control, name, autoSelectFirst]);

  if (loading) return <p>Loading items...</p>;

  return (
    <FormGroup>
      <InputGroup>
        <InputGroupText>{label}</InputGroupText>

        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={autoSelectFirst ? options?.[1] || null : null} // ✅ now index 1
          render={({ field }) => (
            <Select
              {...field}
              options={options}
              placeholder={placeholder}
              className={`form-control p-0 border-0 ${
                errorMsg ? "is-invalid" : ""
              }`}
              onChange={(selected) => field.onChange(selected)}
              value={
                field.value
                  ? options.find((opt) => opt.value === field.value?.value) ||
                    field.value
                  : autoSelectFirst
                  ? options?.[1] || null // ✅ second option
                  : null
              }
            />
          )}
        />
      </InputGroup>

      {errorMsg && <span className="text-danger small">{errorMsg}</span>}
    </FormGroup>
  );
};

export default DropDown;
