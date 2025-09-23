import React, { Fragment,useState } from 'react'
import {  Col, Row, Form, FormGroup, InputGroup, InputGroupText,Card,CardBody } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import {  optionscountry, supplier, optionscompany } from '../Forms/FormWidget/FormSelect2/OptionDatas';
import HeaderCard from '../Common/Component/HeaderCard';
const BulkMOneyCodeForm = ({title,btnTtitle}) => {
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
              <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >
      <HeaderCard title={title}/>
       <Row className="mt-3">
                {/* <Col sm="4">
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
                            options={optionscompany}
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
                </Col> */}
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
                <Col sm="4">
                 <div className='text-end'>
                    <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTtitle}</Btn>
                  </div>
                  </Col>
                {/* <Col sm="4">
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
                            options={supplier}
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
                </Col> */}

                {/* <Col sm="4">
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
                            options={optionscountry}
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
                </Col> */}
              </Row>
            
                 
                
              </Form>
              </CardBody>
      </Card>
    </Fragment>
  )
}

export default BulkMOneyCodeForm
