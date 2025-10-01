
import React, { Fragment } from 'react';
import { Row, Col, Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from "../../../AbstractElements";
import HeaderCard from '../../Common/Component/HeaderCard';

const LinamarForm = () => {
    return (
        <Fragment >
            <div style={{border:"1px solid #ccc",padding:"5px 5px",bprderRadius:"3px"}}>
                        <div  className='bg-primary p-2 my-3'>
                <HeaderCard title="Add Linamar Esso Location   " />
                </div>
               
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
                                        <InputGroupText>Flying J Location</InputGroupText>
                                        <Input className="form-control" type="text"  />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col md="4">
                                <FormGroup className=" m-form__group">
                                    <InputGroup>
                                        <InputGroupText>Flying J Site ID</InputGroupText>
                                        <Input className="form-control" type="number"  />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <InputGroup className="mb-3">
                                    <InputGroupText>Flying J Location ID</InputGroupText>
                                    <Input className="form-control" type="text"  />
                                </InputGroup>
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