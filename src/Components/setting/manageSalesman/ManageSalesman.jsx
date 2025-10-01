
import React, { Fragment } from 'react';
import { Row, Col, Card, CardBody, Form, FormGroup, Label, Input, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from "../../../AbstractElements";
import HeaderCard from '../../Common/Component/HeaderCard';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import Select from 'react-select'
import { companyLoginAccess,userStatus } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata';
const ManageSalesman = () => {
    return (
        <Fragment >
            {/* <div style={{border:"1px solid #ccc",padding:"5px 5px",bprderRadius:"3px"}}> */}
                        <div  className='bg-primary p-2 my-3'>
                <HeaderCard title="Add Sales Man  " />
                </div>
               
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