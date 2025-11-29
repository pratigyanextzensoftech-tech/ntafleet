import React, { useState } from 'react';
import Select from 'react-select'
import { Row, Col, Form, FormGroup, InputGroup, InputGroupText, Card, CardBody } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import DatePickerInput from '../../Forms/FormControl/formInput/DatePickerInput';
const UpdateEssoCent = ({ btnTitle }) => {


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
                            <DatePickerInput
                                name="pricingDate"
                                control={control}              // ✅ make sure this is passed
                                label="Pricing  Date "
                                errors={errors}
                                required="Required"
                            />
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
