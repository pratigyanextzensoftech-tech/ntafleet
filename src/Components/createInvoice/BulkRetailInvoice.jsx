import React, { Fragment,useState } from 'react'
import {  Col, Row, Form, FormGroup, InputGroup, InputGroupText,Card,CardBody } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import {  optionscountry, supplier } from '../Forms/FormWidget/FormSelect2/OptionDatas';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import HeaderCard from '../Common/Component/HeaderCard';
const BulkRetailInvoice = ({title,btnTtitle,type}) => {
      
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
                <Col sm="3">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>
                        Start Date
                      </InputGroupText>
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
                <Col sm="3">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>
                        End Date
                      </InputGroupText>
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



                <Col sm="3">
                  <FormGroup className="m-form__group">
                    <InputGroup >
                      <InputGroupText>Supplier</InputGroupText>
                      <Controller
                        name="supplier"
                        rules={{ required: "supplier is required" }}
                         defaultValue={type === "bulk_customized"  ? [supplier[5]] : supplier}
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={
                            
                             type === "bulk_customized"
                                  ? [supplier[5]]
                                  : supplier
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

                <Col sm="3">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>Country</InputGroupText>
                       <Controller
                        name="country"
                                                rules={{ required: "country is required" }}
                         defaultValue={type === "bulk_customized"  ? [optionscountry[1]] : optionscountry}

                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                             options={
                            
                             type === "bulk_customized"
                                  ? [optionscountry[1]]
                                  : optionscountry
                            }
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
              <div className='text-end'>
                <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTtitle}</Btn>
              </div>
              </Form>
              </CardBody>
      </Card>
    </Fragment>
  )
}

export default BulkRetailInvoice
