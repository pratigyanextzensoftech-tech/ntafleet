
import React, { Fragment } from 'react';
import { Row, Col, Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from "../../../AbstractElements";
import HeaderCard from '../../Common/Component/HeaderCard';

const CountryForm = () => {
    return (
        <Fragment >
            <div style={{border:"1px solid #ccc",padding:"5px 5px",bprderRadius:"3px"}}>
                        <div  className='bg-primary p-2 my-3'>
                <HeaderCard title="Add Country    " />
                </div>
               
                    <Form>
                        <Row>
                            <Col md="8">
                                <FormGroup className=" m-form__group">
                                    <InputGroup>
                                        <InputGroupText>Country</InputGroupText>
                                        <Input className="form-control" type="text"  />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col md="4">
                              <div className='text-end'>
                                <Btn attrBtn={{ color: "primary", className: "m-r-15 ", type: "submit" }} >Add Country</Btn>
                </div>
                            </Col>
                           
                        </Row>
                      
                                  </Form>
                

               
          
</div>
        </Fragment>
    );
};

export default CountryForm;