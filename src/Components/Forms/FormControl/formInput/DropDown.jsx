import React, { useEffect } from "react";
import { FormGroup, InputGroup, InputGroupText } from "reactstrap";
import { Controller, useWatch } from "react-hook-form";
import Select from "react-select";

const DropDown = ({
  control,
  name,
  label = "Select Option",
  placeholder = "Select option",
  options = [],
  rules = {},
  errors = {},
  defaultValueId = null,
  setValue,
  span
}) => {

  // 👇 watch current value safely
  const currentValue = useWatch({ control, name });

useEffect(() => {
  if (defaultValueId === null || defaultValueId === undefined) return;
  if (!options.length) return;

  const option = options.find(o => o.value === defaultValueId);

  if (!option) return;

  setValue(name, option, { shouldValidate: false });

}, [defaultValueId, options]);


  return (
    <FormGroup>
      <InputGroup>
        <InputGroupText>{label} {span==true &&   <span className="text-danger fw-bold mx-1">
                                *
                              </span>}</InputGroupText>

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
              onChange={field.onChange}
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
