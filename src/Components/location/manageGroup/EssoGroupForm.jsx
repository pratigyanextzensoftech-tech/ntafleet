
import React, { Fragment } from 'react';
import { Row, Col, Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from "../../../AbstractElements";
import HeaderCard from '../../Common/Component/HeaderCard';

const EssoGroupForm = ({title}) => {
    return (

        <Fragment>
            <Row>
                <Col>
                    <fieldset>
                        <legend>{title}</legend>
                        <Form>
                            <Row>
                                <Col xl="4"  md="6" sm="12">
                                    <FormGroup className=" m-form__group">
                                        <InputGroup>
                                            <InputGroupText>Group Name</InputGroupText>
                                            <Input className="form-control" type="text" />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                                <Col xl="4"  md="6" sm="12">
                                    <FormGroup className=" m-form__group">
                                        <InputGroup>
                                            <InputGroupText>Group Prov</InputGroupText>
                                            <Input className="form-control" type="text" />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                                <Col xl="4"  md="12" sm="12">
                                    <div className='text-end'>
                                        <Btn attrBtn={{ color: "primary", className: "m-r-15 ", type: "submit" }} >Add Group</Btn>
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

export default EssoGroupForm;