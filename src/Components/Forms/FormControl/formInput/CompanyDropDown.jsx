import React from "react";
import { FormGroup, InputGroup, InputGroupText } from "reactstrap";
import { Controller } from "react-hook-form";
import Select from "react-select";
import useCompany from "../../../../Hooks/useCompany";

const CompanyDropDown = ({ control, name = "Company" }) => {
const { companies: companyOptions, loading: companyLoading, error } = useCompany();

  if (companyLoading) return <p>Loading items...</p>;
  if (error) return <p>Error loading items</p>;

  return (
        <FormGroup>
            <InputGroup>
              <InputGroupText>Company</InputGroupText>
           <Controller
  name="company"
  control={control}
  render={({ field }) => (
    <Select
  {...field}
  options={companyOptions}
  placeholder={companyLoading ? "Loading..." : "Select Company"}
  className="form-control p-0 border-0"
  onChange={field.onChange}
/>
  )}
/>
            </InputGroup>
          </FormGroup>
  );
};

export default CompanyDropDown;
