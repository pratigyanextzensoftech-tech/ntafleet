import React from "react";
import { FormGroup, InputGroup, InputGroupText } from "reactstrap";
import { Controller } from "react-hook-form";
import Select from "react-select";

const DropDown = ({  control,
  name,
  label = "Select Option",
  defaultValue = null,
  placeholder = "Select an option",
  loading = false,
  error = null,
  options = [], }) => {

  if (loading) return <p>Loading items...</p>;
  if (error) return <p>Error loading items</p>;

  return (
        <FormGroup>
            <InputGroup>
              <InputGroupText>{name}</InputGroupText>
           <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <Select
              {...field}
              options={options}
              placeholder={placeholder}
              className="form-control p-0 border-0"
              onChange={(selected) => field.onChange(selected)}
              value={field.value || defaultValue || null}
            />
          )}
        />
            </InputGroup>
          </FormGroup>
  );
};

export default DropDown;
