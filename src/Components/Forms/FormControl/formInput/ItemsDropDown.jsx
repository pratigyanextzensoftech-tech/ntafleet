import React from "react";
import { FormGroup, InputGroup, InputGroupText } from "reactstrap";
import { Controller } from "react-hook-form";
import Select from "react-select";
import useItems from "../../../../Hooks/useItems";

const ItemsDropDown = ({ control, name = "items" }) => {
  const { items, loading, error } = useItems();

  if (loading) return <p>Loading items...</p>;
  if (error) return <p>Error loading items</p>;

  return (
    <FormGroup>
      <InputGroup>
        <InputGroupText>Items</InputGroupText>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={items}
              placeholder="Select Item"
              className="form-control p-0 border-0"
              onChange={(val) => field.onChange(val)}
            />
          )}
        />
      </InputGroup>
    </FormGroup>
  );
};

export default ItemsDropDown;
