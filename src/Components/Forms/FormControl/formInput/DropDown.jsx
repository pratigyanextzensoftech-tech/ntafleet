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
  setValue
}) => {

  // Set default value safely
  useEffect(() => {
    if (defaultValueId && options.length > 0) {
      const option = options.find(o => o.value === defaultValueId);
      if (option) {
        setValue(name, option, { shouldValidate: true });
      }
    }
  }, [defaultValueId, options, name, setValue]);

  return (
    <FormGroup>
      <InputGroup>
        <InputGroupText>{label}</InputGroupText>

        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field, fieldState }) => (
            <Select
              {...field}
              options={options}
              placeholder={placeholder}
              value={field.value || null}
              onChange={(val) => field.onChange(val)}
              className={`form-control p-0 border-0 ${
                fieldState.error ? "is-invalid" : ""
              }`}
            />
          )}
        />
      </InputGroup>

      {errors[name] && (
        <span className="text-danger small">{errors[name].message}</span>
      )}
    </FormGroup>
  );
};

export default DropDown;
