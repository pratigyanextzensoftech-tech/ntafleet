import React, { Fragment,useState } from 'react'
import {  Col, Row, Form, FormGroup, InputGroup, InputGroupText,Card,CardBody } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import HeaderCard from '../../Common/Component/HeaderCard';
const Create = ({title,btnTitle}) => {
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
   
              <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >
      <HeaderCard title={title}/>
    
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
                    <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTitle}</Btn>
                  </div>
                </Col>
              </Row>
              </Form>
            
    </Fragment>
  )
}

export default Create
