import React, { Fragment, useState,useEffect } from 'react'
import { Col, Row, Form, FormGroup, InputGroup, InputGroupText, Card, CardBody } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import { optionscountry, supplier, optionscompany } from '../Forms/FormWidget/FormSelect2/OptionDatas';
import { useCompany,useCountry } from '../../Hooks/Dropdowns';
import { supplierById } from '../../api';
import axios from 'axios';
const Retail_capped = ({ title, btnTtitle, type,supplier_ids,
  invoice_creation,
  supplier_name,}) => {
    const[supplierData,setSupplierData]=useState([])

  const{data:company}=useCompany()
  const{data:country}=useCountry()
  const {
    register,
    control,
    setValue,   
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm();
useEffect(() => {
  if (!country || country.length === 0) return;

  
    // Clear value if normal dropdown
    setValue("country", country[2]);
  
}, [ country]);
useEffect(() => {
   const params = supplier_ids? supplier_ids : "";
  axios
    .get(`${supplierById}/${params}`)
    .then((res) => {
      const formatted = res.data.map((s) => ({
        value: s.id,
        label: s.supplier_name,
      }));

      setSupplierData(formatted);

      // ⭐ Automatically set default supplier based on type
     
        setValue("supplier", formatted[0]); // no default for no-type
      
    })
    .catch((err) => console.log(err));
}, [ setValue]);
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
<Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >
          <Row className="mt-3">
            <Col sm="4">
              <FormGroup className="m-form__group">
                <InputGroup>
                  <InputGroupText>Company</InputGroupText>
                  <Controller
                    name="company"
                    control={control}
                    rules={{ required: "company is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={company}
                        className="form-control p-0 border-0"
                        placeholder="Select a country"
                      />
                    )}
                  />

                </InputGroup>

                {errors.company && (
                  <span className="text-danger">{errors.company.message}</span>
                )}
              </FormGroup>
            </Col>
            <Col sm="4">
          <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>Supplier</InputGroupText>
                     <Controller
  name="supplier"
  control={control}
  rules={{ required: "supplier is required" }}
  render={({ field }) => (
    <Select
      {...field}
      options={supplierData}
      className="form-control p-0 border-0"
      placeholder="Select supplier"
      value={field.value}
      onChange={(val) => field.onChange(val)}
    />
  )}
/>

                    </InputGroup>

                    {errors.supplier && (
                      <span className="text-danger">
                        {errors.supplier?.message}
                      </span>
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
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={[country[2]]}
                       value={field.value}
                        onChange={(val) => field.onChange(val)}
                        className="form-control p-0 border-0"
                        placeholder="Select Country"
                      />
                    )}
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

                    <Col sm="4">        <InputGroupText>Start Date</InputGroupText>
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
                    <span className="text-danger">{errors.startDate.message}</span>
                  )}
                </Row>



              </FormGroup>
            </Col>

            <Col sm="4">
              <FormGroup className={`m-form__group  `}>
                <Row>
                  <InputGroup>
                    <Col sm="4">        <InputGroupText>End Date</InputGroupText>
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
                    <span className="text-danger">{errors.endDate.message}</span>
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

export default Retail_capped
