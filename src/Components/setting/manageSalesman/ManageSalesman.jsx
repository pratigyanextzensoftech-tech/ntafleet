
import React, { Fragment } from 'react';
import { Row, Col, Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from "../../../AbstractElements";
const ManageSalesman = () => {
    return (
        <Fragment >
                    <Form>
                        <Row>
                            <Col md="4">
                                <FormGroup className=" m-form__group">
                                    <InputGroup>
                                        <InputGroupText>Name</InputGroupText>
                                        <Input className="form-control" type="text"  />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col md="4">
                                <FormGroup className=" m-form__group">
                                    <InputGroup>
                                        <InputGroupText>Email</InputGroupText>
                                        <Input className="form-control" type="text"  />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col md="4">
                                <FormGroup className=" m-form__group">
                                    <InputGroup>
                                        <InputGroupText>Phone</InputGroupText>
                                        <Input className="form-control" type="number"  />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={8}>
                                <InputGroup className="mb-3">
                                    <InputGroupText>Address</InputGroupText>
                                    <Input className="form-control" type="text"  />
                                </InputGroup>
                            </Col>
                            
                           
                           
                            

                        
                        <Col md={4}>
                         <div className='text-end'>
                                <Btn attrBtn={{ color: "primary", className: "m-r-15 ", type: "submit" }} >Add Sales Man</Btn>
                </div>
                        </Col>
                 </Row>
                                  </Form>
                

               
          
{/* </div> */}
        </Fragment>
    );
};

export default ManageSalesman;