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
const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
  };
    const onSubmit = (data) => {
        console.log("Form Data:", data);  // ✅ This will print your inputs
        // alert("Form submitted successfully!");
    };
    return (
        <fieldset className='inputField'>
            <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >
                <Row className="mt-3">
                    <Col xl="9"  md="8" sm="12">
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
                    <Col   xl="3"  md="4" sm="12">
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
