
import React, { Fragment } from 'react';
import { Row, Col, Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from "../../../AbstractElements";
import HeaderCard from '../../Common/Component/HeaderCard';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { InVoiceSupplier } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import Select from 'react-select'
const EssoCityForm = ({ title }) => {
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

        <Fragment>
            <Row>
                <Col>
                    <fieldset>
                        <legend>{title}</legend>
                        <Form >
                            <Row>

                                <Col xxl="4"  md="6" sm="12">

                                    <FormGroup className=" m-form__group">
                                        <FormGroup className="m-form__group">
                                            <InputGroup >
                                                <InputGroupText>Group Name</InputGroupText>
                                                <Controller name="GroupName"
                                                    rules={{ required: "Required" }}

                                                    control={control}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            options={InVoiceSupplier}
                                                            className="form-control p-0 border-0"
                                                            placeholder="Select Group "
                                                        />
                                                    )}
                                                />
                                            </InputGroup>

                                            {errors.GroupName && (
                                                <span className="text-danger">{errors.GroupName?.message}</span>
                                            )}
                                        </FormGroup>
                                    </FormGroup>
                                </Col>
                                <Col xxl="4"  md="6" sm="12">
                                    <FormGroup className=" m-form__group">
                                        <InputGroup>
                                            <InputGroupText>City Name</InputGroupText>
                                            <Input className="form-control" type="text" />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                                <Col  xxl="4"  md="6" sm="12">
                                    <FormGroup className=" m-form__group">
                                        <InputGroup>
                                            <InputGroupText>Site(6 Digit)</InputGroupText>
                                            <Input className="form-control" type="text" />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                                <Col  xxl="4"  md="6" sm="12">
                                    <FormGroup className=" m-form__group">
                                        <InputGroup>
                                            <InputGroupText>Site(5 Digit)</InputGroupText>
                                            <Input className="form-control" type="text" />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                           
                                <Col  xxl="8"  md="12" sm="12">
                                    <div className='text-end'>
                                        <Btn attrBtn={{ color: "primary", className: "m-r-15 ", type: "submit" }} >Add Group City</Btn>
                                    </div>
                                </Col>
                            </Row>

                        </Form>
                    </fieldset>
                </Col>
            </Row>
        </Fragment>

    );
};

export default EssoCityForm;