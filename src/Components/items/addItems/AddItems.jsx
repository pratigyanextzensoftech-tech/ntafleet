import React, { useState } from 'react';
import Select from 'react-select'
import {  optionscompany,companyLoginAccess } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText, Container } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
const AddItems = ({btnTitle}) => {
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
               <Col sm='3'>
                                        <FormGroup className=" m-form__group">
                                          <InputGroup>
                                            <InputGroupText>Item Name </InputGroupText>
                                            <input style={{border:"1px solid #ccc"}} className="form-control " type="text"  {...register('Name', { required: true })} />
                                          </InputGroup>
                                          {errors.name && (
                                            <span className="text-danger"> Required</span>
                                          )}
                                        </FormGroup>
                                      </Col>
         <Col sm="3">
                        <FormGroup className="m-form__group">
                            <InputGroup >
                                <InputGroupText>Discount Applied</InputGroupText>
                                <Controller name="discount"
                                    rules={{ required: " Required" }}

                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={companyLoginAccess}
                                            className="form-control p-0 border-0"
                                            placeholder="Select d"
                                        />
                                    )}
                                />
                            </InputGroup>

                            {errors.discount && (
                                <span className="text-danger">{errors.discount?.message}</span>
                            )}
                        </FormGroup>
                    </Col>

         <Col sm="3">
                        <FormGroup className="m-form__group">
                            <InputGroup >
                                <InputGroupText>Tax Applied</InputGroupText>
                                <Controller name="tax"
                                    rules={{ required: " Required" }}

                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={companyLoginAccess}
                                            className="form-control p-0 border-0"
                                            placeholder="Select Tax Applied"
                                        />
                                    )}
                                />
                            </InputGroup>

                            {errors.tax && (
                                <span className="text-danger">{errors.tax?.message}</span>
                            )}
                        </FormGroup>
                    </Col>
                   
                                        <Col sm="3">

<div className='text-end'>
                            <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTitle}</Btn>

                        </div>
                        </Col>
            
                </Row>
           


        </Form>
    )
}


export default AddItems
