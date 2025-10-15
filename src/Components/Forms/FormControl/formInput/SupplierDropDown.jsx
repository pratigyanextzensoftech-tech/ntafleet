import React from "react";
import { FormGroup, InputGroup, InputGroupText } from "reactstrap";
import { Controller } from "react-hook-form";
import Select from "react-select";
import useSupplier from "../../../../Hooks/useSupplier";

const SupplierDropDown = ({ control, name }) => {
  const { supplier, loading, error } = useSupplier();

  if (loading) return <p>Loading items...</p>;
  if (error) return <p>Error loading items</p>;

  return (
    <FormGroup>
      <InputGroup>
        <InputGroupText>Supplier</InputGroupText>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={supplier}
              placeholder="Select Supplier"
              className="form-control p-0 border-0"
              onChange={(val) => field.onChange(val)}
            />
          )}
        />
      </InputGroup>
    </FormGroup>
  );
};

export default SupplierDropDown;
