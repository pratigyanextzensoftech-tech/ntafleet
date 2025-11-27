import React, { Fragment, useState,useEffect } from 'react'
import { Col, Row, Form, FormGroup, InputGroup, InputGroupText, Card, CardBody } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import { useCountry,useCompany } from '../../Hooks/Dropdowns';
import { supplierById } from '../../api';
import axios from 'axios';
const OldRetailInvoice = ({ title, btnTtitle, type }) => {
  const {data:country}=useCountry()
  const {data:company}=useCompany()
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitted, isValid },
  } = useForm();
    const[supplierData,setSupplierData]=useState()
  
useEffect(() => {
  axios
    .get(`${supplierById}/1`)
    .then((res) => {
      const formatted = res.data.map((s) => ({
        value: s.id,
        label: s.supplier_name,
      }));

      setSupplierData(formatted);
setValue("supplier",formatted)
   
    })
}, []);
useEffect(() => {
  if (!country || country.length === 0) return;

  if (
    type === "single_rack_actual" ||
    type === "bulk_rack_actual" 
  ) {
    // Auto select the single allowed country
    setValue("country", country[2]);   // Set default value here
  } else {
    // Clear value if normal dropdown
    setValue("country", null);
  }
}, [type, country]);
  const onSubmit = (data) => {
    console.log("Form Data:", data);  // ✅ This will print your inputs
    // alert("Form submitted successfully!");
  };
  return (
    <Fragment>
      <Row>
        <Col>
          <fieldset>
            <legend>{title}</legend>
            <Form noValidate='' onSubmit={handleSubmit(onSubmit)}>

              <Row className="mt-3">
                <Col sm="4">
                  <FormGroup className="m-form__group">
                    <InputGroup >
                      <InputGroupText>Company</InputGroupText>
                      <Controller name="company"
                        rules={{ required: "company Name is required" }}

                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={company}
                            className="form-control p-0 border-0"
                            placeholder="Select Company Name"
                          />
                        )}
                      />
                    </InputGroup>

                    {errors.company && (
                      <span className="text-danger">{errors.company?.message}</span>
                    )}
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <FormGroup className="m-form__group">
                    <InputGroup >
                      <InputGroupText>Supplier</InputGroupText>
                      <Controller
                        name="supplier"
                        rules={{ required: "supplier is required" }}
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={supplierData}
                            className="form-control p-0 border-0"
                            placeholder="Select supplier"
                          />
                        )}
                      />
                    </InputGroup>

                    {errors.supplier && (
                      <span className="text-danger">{errors.supplier?.message}</span>
                    )}
                  </FormGroup>
                </Col>

                <Col sm="4">
                  <FormGroup className="m-form__group">
                    <InputGroup >
                      <InputGroupText>Country</InputGroupText>
                 
                                        <Controller
  name="country"
  rules={{ required: "country is required" }}
  control={control}
  render={({ field }) => {
    const isFixedType =
      type === "single_rack_actual" ||
      type === "bulk_rack_actual" 

    const countryOptions = isFixedType
      ? [country[2]]
      : country.filter((_, i) => i !== 0);

    return (
      <Select
        {...field}
        options={countryOptions}
        className="form-control p-0 border-0"
        placeholder="Select Country"
        value={field.value}
        onChange={(val) => field.onChange(val)}
      />
    );
  }}
/>
                    </InputGroup>

                    {errors.country && (
                      <span className="text-danger">{errors.country?.message}</span>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col sm="4">
                  <FormGroup className="m-form__group">
                    <Row>
                      <InputGroup>
                        <Col sm="4">
                          {" "}
                          <InputGroupText>Start Date</InputGroupText>
                        </Col>
                        <Col sm="8">
                          <Controller
                            name="startDate"
                            control={control}
                            rules={{ required: "Start Date is required" }}
                            render={({ field }) => (
                              <DatePicker
                                placeholderText="Select start date"
                                className={`form-control `}
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                              />
                            )}
                          />
                        </Col>
                      </InputGroup>
                      {errors.startDate && (
                        <span className="text-danger">
                          {errors.startDate.message}
                        </span>
                      )}
                    </Row>
                  </FormGroup>
                </Col>

                <Col sm="4">
                  <FormGroup className={`m-form__group  `}>
                    <Row>
                      <InputGroup>
                        <Col sm="4">
                          {" "}
                          <InputGroupText>End Date</InputGroupText>
                        </Col>
                        <Col sm="8">
                          <Controller
                            name="endDate"
                            control={control}
                            rules={{ required: "End Date is required" }}
                            render={({ field }) => (
                              <DatePicker
                                placeholderText="Select end date"
                                className={`form-control digits`}
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                              />
                            )}
                          />
                        </Col>
                      </InputGroup>
                      {errors.endDate && (
                        <span className="text-danger">
                          {errors.endDate.message}
                        </span>
                      )}
                    </Row>
                  </FormGroup>
                </Col>
                <Col sm={{ size: 2, offset: 2 }}>
                  <div className='text-end'>
                    <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTtitle}</Btn>
                  </div>

                </Col>
              </Row>
            </Form>
          </fieldset>
        </Col>
      </Row>
    </Fragment>

  )
}

export default OldRetailInvoice
