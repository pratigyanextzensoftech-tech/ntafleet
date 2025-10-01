import React, { useState } from 'react';
import Select from 'react-select'
import {  optionscompany,companyLoginAccess } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText, Container } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
const PetroForm = ({btnTitle,btnTitle1}) => {
    const [selectedValues, setSelectedValues] = useState([]);
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

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;

        setSelectedValues(prev => {
            if (checked) {
                return [...prev, value];
            } else {
                return prev.filter(item => item !== value);
            }
        });
    }
    return (

        <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >
                <Row className="mt-3">
               <Col sm='4'>
                                         <Row>
                                       
                                       
                                                                   <Col className='px-0' sm="2">
                                       
                                                                       <InputGroupText className='h-100'>File</InputGroupText>
                                                                   </Col>
                                                                   <Col className='px-0' sm="10">
                                       
                                                                       <Input style={{border:"1px solid #ccc"}} className="form-control w-100c " type="file" />
                                                                   </Col>
                                                                                               </Row>
                                      </Col>
         <Col sm="4">
                        <Row>
                            <FormGroup className="m-form__group">
                                <InputGroup>

                                    <Col sm="3">
                                        <InputGroupText>
                                             Date 
                                        </InputGroupText>
                                    </Col>
                                    <Col sm="9">
                                        <Controller
                                            name="date"
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

                                {errors.date && (
                                    <span className="text-danger">{errors.date.message}</span>
                                )}
                            </FormGroup>
                        </Row>
                    </Col>

         <Col sm="3">
                       
                   
                   

<div className='text-end'>
                            <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTitle}</Btn>
                                                             <button className='btn btn-secondary'>{btnTitle1}</button>

                        </div>
             </Col>
                </Row>
           


        </Form>
    )
}


export default PetroForm
