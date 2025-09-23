import React, { Fragment,useState } from 'react'
import {  Col, Row, Form, FormGroup, InputGroup, InputGroupText,Card,CardBody } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { useForm,Controller } from 'react-hook-form';
import {  optionscountry,optionscompany, supplier } from '../Forms/FormWidget/FormSelect2/OptionDatas';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import HeaderCard from '../Common/Component/HeaderCard';
const SingleRetailMulti = ({title,btnTtitle,type}) => {
     
             const {
                register,
                control,
                handleSubmit,
                formState: { errors, isSubmitted, isValid },
              } = useForm();
          
           const onSubmit = (data) => {
        console.log("Form Data:", data);  // ✅ This will print your inputs
        // alert("Form submitted successfully!");
      };
  return (
    <Fragment>
      <Card className="shadow-lg">
        <CardBody>
      <HeaderCard title={title}/>
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
                            options={optionscompany}
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
                         defaultValue={type === "single_rack_actual"  || type==="bulk_rack_actual" ? [supplier[5]] : null}
                        render={({ field }) => (
                          <Select
                            {...field}
                         options={type === "single_rack_actual"  || type==="bulk_rack_actual"  ? [supplier[5]] : supplier}
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
                         defaultValue={type === "single_rack_actual" || type==="bulk_rack_actual" ? [optionscountry[1]] : null}

                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                    options={type === "single_rack_actual" || type==="bulk_rack_actual"  ? [optionscountry[1]] : optionscountry}

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
                    <InputGroup>
                      <InputGroupText>Start Date</InputGroupText>
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
         
                    </InputGroup>

                     {errors.startDate && (
            <span className="text-danger">{errors.startDate.message}</span>
          )}
                  </FormGroup>
                </Col>

                <Col sm="4">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>End Date</InputGroupText>
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
         
                      </InputGroup>
                       {errors.endDate && (
            <span className="text-danger">{errors.endDate.message}</span>
          )}
                  </FormGroup>

                </Col>
                <Col sm={{ size: 2, offset: 2 }}>
                  <div className='text-end'>
                    <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTtitle}</Btn>
                  </div>

                </Col>
              </Row>
              </Form>
              </CardBody>
      </Card>
    </Fragment>
  )
}

export default SingleRetailMulti
