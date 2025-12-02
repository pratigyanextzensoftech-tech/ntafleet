import React, { useEffect } from "react";
import { FormGroup, InputGroup, InputGroupText } from "reactstrap";
import { Controller } from "react-hook-form";
import Select from "react-select";

const DropDown = ({
  control,
  name,
  label = "Select Option",
  placeholder = "Select option",
  loading = false,
  options = [],
  rules = {},
  errors = {},
  defaultValueId = null,
   // ✅ ID of the option to select by default
}) => {
  const errorMsg = errors?.[name]?.message;

  // ✅ Automatically set default value based on ID
  useEffect(() => {
    
    if (defaultValueId != null && control?._formValues[name] == null) {
      const defaultOption = options.find((opt) => opt.value === defaultValueId);
      if (defaultOption) {
        control._formValues[name] = defaultOption;
      }
    }
  }, [defaultValueId, options, control, name]);

  if (loading) return <p>Loading items...</p>;

  return (
    <FormGroup>
      <InputGroup>
        <InputGroupText>{label}</InputGroupText>

        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={options.find((opt) => opt.value === defaultValueId) || null}
          render={({ field }) => (
            <Select
              {...field}
              options={options}
              placeholder={placeholder}
              className={`form-control p-0 border-0 ${errorMsg ? "is-invalid" : ""}`}
              onChange={(selected) => field.onChange(selected)}
              value={
                field.value
                  ? options.find((opt) => opt.value === field.value?.value) || field.value
                  : defaultValueId != null
                  ? options.find((opt) => opt.value === defaultValueId) || null
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
