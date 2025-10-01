
import React, { Fragment } from 'react';
import { Row, Col, Card, CardBody, Form, FormGroup, Label, Input, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from "../../../AbstractElements";
import HeaderCard from '../../Common/Component/HeaderCard';
import { Controller,useForm } from 'react-hook-form';
import Select from 'react-select'
import { type } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
const PrimaryMenu = () => {
     const {
            register,
            control,
            reset,
            handleSubmit,
            formState: { errors, isSubmitted, isValid },
        } = useForm();
    return (
        <Fragment >
            <div style={{border:"1px solid #ccc",padding:"5px 5px",bprderRadius:"3px"}}>       
             <div className='bg-primary p-2 my-3'>
                <HeaderCard title="Add Primary Menu   " />
            </div>
            <Form>
                <Row>
                    <Col md="3">
                        <FormGroup className=" m-form__group">
                            <InputGroup>
                                <InputGroupText> Menu Name</InputGroupText>
                                <Input className="form-control" type="text" />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup className=" m-form__group">
                            <InputGroup>
                                <InputGroupText>Menu Link</InputGroupText>
                                <Input className="form-control" type="text" />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup className="m-form__group">
                    <InputGroup >
                      <InputGroupText>Type</InputGroupText>
                      <Controller
                        name="type"
                                                rules={{ required: "Type is required" }}

                                                control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
     options={
            type
            }
                            className="form-control p-0 border-0"
                            placeholder="Select  Type"
                          />
                        )}
                      />
                    </InputGroup>

                    {errors.type && (
                      <span className="text-danger">{errors.type?.message}</span>
                    )}
                  </FormGroup>
                    </Col>
                     <Col md={3}>
                                             <div className='text-end'>
                                                    <Btn attrBtn={{ color: "primary", className: "m-r-15 ", type: "submit" }} >Add Menu</Btn>
                                    </div>
                                            </Col>
                </Row>
               
            </Form>
            </div>
        </Fragment>
    );
};

export default PrimaryMenu;