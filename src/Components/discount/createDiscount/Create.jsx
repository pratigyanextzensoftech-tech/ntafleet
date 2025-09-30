import React, { useState } from 'react';
import Select from 'react-select'
import { checkBoxData, optionscountry, optionscompany,customizedTypeType,invoiceType1,InvoiceCategory,InvoiceShow,InVoiceSupplier } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText, Container } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import HeaderCard from '../../Common/Component/HeaderCard';
const Create = ({title,btnTitle}) => {
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
   

  
    return (
<>
<HeaderCard title={title}/>
        <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >
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
                  <FormGroup className="m-form__group">
                    <InputGroup>
                    <Col sm="4">   
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
            <span className="text-danger">{errors.endDate.message}</span>
          )}
                  </FormGroup>

                </Col>
                          
               
                



               

                   
                </Row>
                <Row className="mt-3">
 
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
            InVoiceSupplier // your normal supplier array
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

     <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  Discount Cent </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control " type="text"  {...register('discount', { required: true })} />
                            </InputGroup>
                            {errors.discount && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>


           
                    <Col sm="1">
                        <div className='text-end'>
                            <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTitle}</Btn>

                        </div>
                    </Col>
                </Row>

           
        </Form>
        </>
    )
}


export default Create
