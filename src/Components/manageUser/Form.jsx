
// import React, { Fragment } from 'react';
// import { Row, Col, Card, CardBody, Form, FormGroup, Label, Input, InputGroup, InputGroupText } from 'reactstrap';
// import { BasicInputGroups } from '../../Constant';
// import { Btn } from "../../AbstractElements";
// import {add_user} from '../../Constant'
// import HeaderCard from '../Common/Component/HeaderCard';
// import Select from 'react-select'
// import { companyLoginAccess,userStatus } from '../Forms/FormWidget/FormSelect2/OptionDatas';
// const FormComponent = () => {
//     return (
//         <Fragment>
//                 <HeaderCard title="Manage User" />
//                <div className='p-2 my-3 bg-primary '>
//                 <HeaderCard title="Add User "/>
//             </div>
//                     <Form>
//                         <Row>
//                             <Col md="4">
//                                 <FormGroup className=" m-form__group">
//                                     <InputGroup>
//                                         <InputGroupText>Name</InputGroupText>
//                                         <Input className="form-control" type="text"  />
//                                     </InputGroup>
//                                 </FormGroup>
//                             </Col>
//                             <Col md="4">
//                                 <FormGroup className=" m-form__group">
//                                     <InputGroup>
//                                         <InputGroupText>Email</InputGroupText>
//                                         <Input className="form-control" type="text"  />
//                                     </InputGroup>
//                                 </FormGroup>
//                             </Col>
//                             <Col md="4">
//                                 <FormGroup className=" m-form__group">
//                                     <InputGroup>
//                                         <InputGroupText>Phone</InputGroupText>
//                                         <Input className="form-control" type="number"  />
//                                     </InputGroup>
//                                 </FormGroup>
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col md={4}>
//                                 <InputGroup className="mb-3">
//                                     <InputGroupText>Company</InputGroupText>
//                                     <Input className="form-control" type="text"  />
//                                 </InputGroup>
//                             </Col>
//                             <Col md={4}>
//                                 <InputGroup className="mb-3">
//                                     <InputGroupText>Password</InputGroupText>
//                                     <Input className="form-control" type="password"  />
//                                 </InputGroup>
//                             </Col>
                           
                           
//                             <Col md={4}>
//                                 <InputGroup className="mb-3">
//                                     <InputGroupText>User Status</InputGroupText>
//                                                                                        <Select options={userStatus}   className="form-control p-0 border-0"                                                                    />
//                                 </InputGroup>
//                             </Col>

//                         </Row>
//                         <Row>
//                             <Col md={4}>
//                                 <InputGroup className="mb-3">
//                                     <InputGroupText>Company Login Access</InputGroupText>
                                  
//                                                     <Select options={companyLoginAccess}   className="form-control p-0 border-0"                                                                    />

               
              
//                                               </InputGroup>
//                             </Col>

                   
//                                             <Col md={8}>

//                 <div className='text-end'>
//                                 <Btn attrBtn={{ color: "primary", className: "m-r-15 ", type: "submit" }} >{add_user}</Btn>
//                 </div>
//                 </Col>
//                                  </Row>
//                                   </Form>
            
                               

               
          

//         </Fragment>
//     );
// };

// export default FormComponent;