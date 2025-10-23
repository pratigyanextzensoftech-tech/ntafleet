
import React, { Fragment } from 'react';
import { Row, Col, Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from "../../../AbstractElements";
import HeaderCard from '../../Common/Component/HeaderCard';
import InputText from '../../Forms/FormControl/formInput/InputText';
import { useForm } from 'react-hook-form';
const LinamarForm = () => {
    const {
        register,
        control,
        reset,
        handleSubmit,
        formState: { errors, isSubmitted, isValid },
    } = useForm();
    return (
        <Fragment >
            <div style={{ border: "1px solid #ccc", padding: "5px 5px", bprderRadius: "3px" }}>
                <div className='bg-primary p-2 my-3'>
                    <HeaderCard title="Add Linamar Esso Location   " />
                </div>

                <Form>
                    <Row>
                        <Col md="4">
                            <InputText
                                name="essoLoc"
                                label="Esso Location"
                                type="text"
                                register={register}
                                errors={errors}
                                rules={{ required: "Required" }}
                            />

                        </Col>
                        <Col md="4">
                            <InputText
                                name="flyingLoc"
                                label="Flying J Location"
                                type="text"
                                register={register}
                                errors={errors}
                                rules={{ required: "Required" }}
                            />

                        </Col>
                        <Col md="4">
                            <InputText
                                name="flyingJSite"
                                label="Flying J Site ID"
                                type="text"
                                register={register}
                                errors={errors}
                                rules={{ required: "Required" }}
                            />

                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <InputText
                                name="flyingJLOc"
                                label="Flying J Location ID"
                                type="text"
                                register={register}
                                errors={errors}
                                rules={{ required: "Required" }}
                            />

                        </Col>



                        <Col md={8}>
                            <div className='text-end'>
                                <Btn attrBtn={{ color: "primary", className: "m-r-15 ", type: "submit" }} >Add Linamar Esso Location</Btn>
                            </div>
                        </Col>
                    </Row>
                </Form>




            </div>
        </Fragment>
    );
};

export default LinamarForm;