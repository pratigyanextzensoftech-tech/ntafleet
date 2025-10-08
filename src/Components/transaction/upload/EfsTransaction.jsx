import React, { Fragment, useState } from 'react'
import { Col, Row, Form, FormGroup, InputGroup, InputGroupText,  Input } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { optionscountry } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import HeaderCard from '../../Common/Component/HeaderCard';
const EfsTransaction = ({ title, btnTitle,type }) => {
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
            <div style={{ border: "1px solid #ccc", padding: "5px 5px", bprderRadius: "3px", marginBottom: "10px" }}>

                <div className='bg-primary p-2 my-3'>
                    <HeaderCard title={title} />

                </div>
                <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >
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
                        <Col sm="4" className='px-0' >
                            <Row><Col className='pe-0' sm="3"> <InputGroupText >File</InputGroupText>
                            </Col>
                                <Col className='px-0' sm="9">
                                    <Input style={{ border: "1px solid #ccc" }} className="form-control w-100c " type="file" />

                                </Col>
                            </Row>


                        </Col>
                        <Col sm="4">
                            <div className='text-end'>
                                <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTitle}</Btn>
                            </div>
                        </Col>
                    </Row>

                </Form>

            </div>
        </Fragment>
    )
}

export default EfsTransaction
