import React, { useState } from 'react';
import Select from 'react-select'
import { optionscompany,optionscountry,supplier,salesman } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText, Container } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
const SalesmanVol = ({btnTitle}) => {
    const {
        register,
        control,
        reset,
        handleSubmit,
        formState: { errors, isSubmitted, isValid },
    } = useForm();

    const onSubmit = (data) => {

        console.log("Form Data:", data);  // ✅ This will print your inputs
        // alert("Form submitted successfully!");

    };
    const handleReset = () => {
    reset(); // reset all fields back to defaultValues (or empty if none given)
  };

   
    return (

        <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >

           
             
                <Row className="mt-3">
                       <Col sm="4">
                        <FormGroup className="m-form__group">
                            <InputGroup >
                                <InputGroupText>Salesman</InputGroupText>
                                <Controller name="salesman"
                                    rules={{ required: " Required" }}

                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={salesman}
                                            className="form-control p-0 border-0"
                                            placeholder="Select Salesman"
                                        />
                                    )}
                                />
                            </InputGroup>

                            {errors.salesman && (
                                <span className="text-danger">{errors.salesman?.message}</span>
                            )}
                        </FormGroup>
                    </Col>
                <Col sm="4">
                  <FormGroup className="m-form__group">
                    <Row>
                      <InputGroup>

                        <Col sm="4">        <InputGroupText>start Date</InputGroupText>
                        </Col>
                        <Col sm="8">
 <Controller
            name="startDate"
            control={control}
            rules={{ required: " Date is required" }}
            render={({ field }) => (
              <DatePicker
                placeholderText="Select  date"
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
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>End Date</InputGroupText>
                   <Controller
            name="endDate"
            control={control}
            rules={{ required: " Date is required" }}
            render={({ field }) => (
              <DatePicker
                placeholderText="Select  date"
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
 
        
                      
            </Row> 
            <Row>
                <Col sm="4">
                  <FormGroup className="m-form__group">
                            <InputGroup>
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
     options={
            supplier
            }
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
                
                                            <div className='text-start'>
                                                <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTitle}</Btn>
                                            </div>
                                        </Col>
            </Row>
            
        </Form>
    )
}


export default SalesmanVol
