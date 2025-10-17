import React, { useState } from 'react';
import { Row, Col, Form } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm } from 'react-hook-form';
import InputText from '../../Forms/FormControl/formInput/InputText';
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

        <Form className='px-2' noValidate='' onSubmit={handleSubmit(onSubmit)} >
            <Row>
                <Col sm="10">
                                 <InputText
            name="file"
            label="File"
            type="file"
            register={register}
            errors={errors}
            rules={{ required: "Required" }}
          />
                       
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
