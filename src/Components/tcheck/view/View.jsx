import React, { useState } from 'react';
import Select from 'react-select'
import { optionscompany } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import useCompany from '../../../Hooks/useCompany';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText, Container } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DropDown from '../../Forms/FormControl/formInput/DropDown';
import DatePickerInput from '../../Forms/FormControl/formInput/DatePickerInput';
const List = ({ onSearch }) => {
  const { companies: companyOptions, loading: companyLoading } = useCompany();

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm();

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const onSubmit = (formData) => {
     console.log("Form Data:", formData); 
        const payload = {
      from: formData?.from ? formatDate(formData.from) : "",
      to: formData?.to ? formatDate(formData.to) : "",
      company_id: formData?.company ? formatDate(formData?.company.value) : ""
    }

         if (onSearch) onSearch(payload);
  };
  return (

    <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >
      <Row className="mt-3">
        <Col  xxl="3"  lg="6" sm="12">
          <DatePickerInput
            name="from"
            control={control}              // ✅ make sure this is passed
            label=" From Date"
          />
        </Col>
        <Col  xxl="3"  lg="6" sm="12">
          <DatePickerInput
            name="to"
            control={control}              // ✅ make sure this is passed
            label=" To"
          />

        </Col>
        <Col  xxl="3"  lg="6" sm="12">
          <DropDown
            name="company"
            label="Company"
            control={control}
            placeholder="Select Company"
            options={companyOptions}
          />

        </Col>



        <Col  xxl="3"  lg="6" sm="12">

          <div className='text-end'>
            <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >Search Data</Btn>

          </div>
        </Col>

      </Row>



    </Form>
  )
}


export default List
