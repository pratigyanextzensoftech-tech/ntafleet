
import React, { Fragment } from 'react';
import { Row, Col, Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from "../../../AbstractElements";
import HeaderCard from '../../Common/Component/HeaderCard';
import { optionsPrimary } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Controller,useForm } from 'react-hook-form';
import Select from 'react-select'
import { type } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
const SecondaryMenu = () => {
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
                <HeaderCard title="Add Secondary Menu " />
            </div>
            <Form>
                <Row>
                          <Col sm="4">
                        <Row>
                            <FormGroup className="m-form__group">
                                <InputGroup>

                                    <Col sm="4">
                                        <InputGroupText>
                                              Primary Menu 
                                        </InputGroupText>
                                    </Col>
                                    <Col sm="8">
                                       
                                         <Controller
                                                                           name="primaryMenu"
                                                                           rules={{ required: "Menu is required" }}
                                       
                                                                           control={control}
                                                                           render={({ field }) => (
                                                                               <Select
                                                                                   {...field}
                                                                                   options={optionsPrimary}
                                                                                   className="form-control p-0 border-0"
                                                                                   placeholder="Select Menu"
                                                                               />
                                                                           )}
                                                                       />
                                                                  </Col>




                                </InputGroup>

                                 {errors.primaryMenu && (
                                <span className="text-danger">{errors.primaryMenu?.message}</span>
                            )}
                            </FormGroup>
                        </Row>
                    </Col>
                    <Col md="4">
                        <FormGroup className=" m-form__group">
                            <InputGroup>
                                <InputGroupText> Menu Name</InputGroupText>
                                <Input className="form-control" type="text" />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md="4">
                        <FormGroup className=" m-form__group">
                            <InputGroup>
                                <InputGroupText>Menu Link</InputGroupText>
                                <Input className="form-control" type="text" />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                   
                                    </Row>
<Row>
     <Col md="4">
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
                        <Col md={8}>
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

export default SecondaryMenu;