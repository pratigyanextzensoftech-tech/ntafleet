import React, { useState } from 'react';
import { Row, Col, Form,  Input, InputGroupText } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
const Upload = ({ btnTitle }) => {
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

        <Form noValidate='' onSubmit={handleSubmit(onSubmit)} >
            <Row>
                <Col sm="10">
                    <Row>
                        <Col className='px-0' sm="2">

                            <InputGroupText className='h-100'>Select File</InputGroupText>
                        </Col>
                        <Col className='px-0' sm="10">

                            <Input style={{ border: "1px solid #ccc" }} className="form-control w-100c " type="file" />
                        </Col>
                    </Row>
                </Col>
                <Col sm="2" >
                    <div className='text-end'>
                        <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTitle}</Btn>
                    </div>
                </Col>
            </Row>

        </Form>
    )
}


export default Upload
