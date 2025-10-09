import React, { useState } from 'react';
import Select from 'react-select'
import { Row, Col, Form, FormGroup, InputGroup, InputGroupText, Card, CardBody } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
const UpdateEssoCent = ({btnTitle}) => {
    

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
<fieldset className='inputField'>
        <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >
           
               
                    <Row className="mt-3">
                      




                        <Col sm="6">
                                                    <Row>
                                                        <FormGroup className="m-form__group">
                                                            <InputGroup>
                        
                                                                <Col sm="3">
                                                                    <InputGroupText>

                                            Pricing  Date                                                       
                                                         </InputGroupText>
                                                                </Col>
                                                                <Col sm="9">
                                                                    <Controller
                                                                        name="pricingDate"
                                                                        control={control}
                                                                        rules={{ required: " Required" }}
                                                                        render={({ field }) => (
                                                                            <DatePicker
                                                                                className={`form-control `}
                                                                                selected={field.value}
                                                                                onChange={(date) => field.onChange(date)}
                                                                            />
                                                                        )}
                                                                    /></Col>
                        
                        
                        
                        
                                                            </InputGroup>
                        
                                                            {errors.pricingDate && (
                                                                <span className="text-danger">{errors.pricingDate.message}</span>
                                                            )}
                                                        </FormGroup>
                                                    </Row>
                             </Col>
 
                           
  <Col sm="6">
                    <div className='text-end'>
                        <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTitle}</Btn>

                    </div>
                </Col>
                    </Row>

                  




           
         
          
           
        </Form>
        </fieldset>
    )
}


export default UpdateEssoCent
