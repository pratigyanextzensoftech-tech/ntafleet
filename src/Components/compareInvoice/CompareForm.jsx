import React, { useState } from 'react';
import Select from 'react-select'
import {  optionsSearch } from '../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Input, InputGroup, InputGroupText, Container } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import { useCountry } from '../../Hooks/Dropdowns';
const CompareForm = ({ title, btnTtitle, type, btnTtitle1 }) => {
  const {data:country}=useCountry()
  console.log(type, '++++++++++++++')
  const [selectedValues, setSelectedValues] = useState([]);
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
  const onSubmit = (data) => {

    console.log("Form Data:", data);  // ✅ This will print your inputs
    // alert("Form submitted successfully!");

  };
  const handleReset = () => {
    reset(); // reset all fields back to defaultValues (or empty if none given)
  };

  
  return (
    <>

      <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >
        <Row className="mt-3">
          <Col sm="3">
            <FormGroup className="m-form__group">
              <Row>
                <InputGroup> 
                  <Col sm="4">        <InputGroupText>From Date</InputGroupText>
                  </Col>
                  <Col sm="8">
                    <Controller
                      name="fromDate"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          placeholderText="Select  date"
                          className={`form-control `}
                          selected={field.value}
                          onChange={(date) => field.onChange(date)}
                          dateFormat="yyyy-MM-dd"

                        />
                      )}
                    />

                  </Col>

                </InputGroup>
             
              </Row>



            </FormGroup>
          </Col>
          <Col sm="3">
            <FormGroup className="m-form__group">
              <InputGroup>
               <Col sm="4"> 
                <InputGroupText>To Date</InputGroupText></Col><Col sm="8">
                <Controller
                  name="ToDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      placeholderText="Select  date"
                      className={`form-control digits`}
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      dateFormat="yyyy-MM-dd"

                    />
                  )}
                />
</Col>
              </InputGroup>
          
            </FormGroup>

          </Col>
          <Col sm="3">
            <FormGroup className="m-form__group">
              <InputGroup >
                <InputGroupText>Search Type</InputGroupText>
                <Controller name="type"

                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={optionsSearch}
                      className="form-control p-0 border-0"
                      placeholder="Search"
                    />
                  )}
                />
              </InputGroup>

             
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup className=" m-form__group">
              <InputGroup>
                <InputGroupText>Amount</InputGroupText>
                <Input className="form-control" type="text" />
              </InputGroup>
            </FormGroup>
          </Col>








        </Row>
        <Row className="mt-3">

          <Col sm="3">
            <FormGroup className="m-form__group">
              <InputGroup>
                <InputGroupText>Country</InputGroupText>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={country}
                      className="form-control p-0 border-0"
                      placeholder="Select Country"
                    />
                  )}
                />
              </InputGroup>

             
            </FormGroup>
          </Col>





          <Col sm="9">
            <div className='text-end'>
              <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTtitle}</Btn>
              <button className='btn btn-secondary'>{btnTtitle1}</button>
            </div>
          </Col>
        </Row>


      </Form>
    </>
  )
}


export default CompareForm
