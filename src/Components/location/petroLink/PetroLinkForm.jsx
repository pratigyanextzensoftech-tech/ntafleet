
import React, { Fragment } from 'react';
import { Row, Col, Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from "../../../AbstractElements";

const PetroLinkForm = () => {
    return (
        <Fragment >
            <div style={{border:"1px solid #ccc",padding:"5px 5px",bprderRadius:"3px"}}>
                       
               
                    <Form>
                        <Row>
                            <Col md="4">
                                <FormGroup className=" m-form__group">
                                    <InputGroup>
                                        <InputGroupText>Esso Location</InputGroupText>
                                        <Input className="form-control" type="text"  />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col md="4">
                                <FormGroup className=" m-form__group">
                                    <InputGroup>
                                        <InputGroupText>Esso City</InputGroupText>
                                        <Input className="form-control" type="text"  />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col md="4">
                                <FormGroup className=" m-form__group">
                                    <InputGroup>
                                        <InputGroupText>Esso State</InputGroupText>
                                        <Input className="form-control" type="text"  />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <InputGroup className="mb-3">
                                    <InputGroupText>Petro Location</InputGroupText>
                                    <Input className="form-control" type="text"  />
                                </InputGroup>
                            </Col>
                            
                            <Col md="4">
                                <FormGroup className=" m-form__group">
                                    <InputGroup>
                                        <InputGroupText>Petro City</InputGroupText>
                                        <Input className="form-control" type="text"  />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                           
                             <Col md="4">
                                <FormGroup className=" m-form__group">
                                    <InputGroup>
                                        <InputGroupText>Petro State</InputGroupText>
                                        <Input className="form-control" type="text"  />
                                    </InputGroup>
                                </FormGroup>
                            </Col>

                      
                 </Row>
                   <Row>
                        <Col md={12}>
                         <div className='text-end'>
                                <Btn attrBtn={{ color: "primary", className: "m-r-15 ", type: "submit" }} >Add Location</Btn>
                </div>
                        </Col>
                        </Row>
                                  </Form>
                

               
          
</div>
        </Fragment>
    );
};

export default PetroLinkForm;