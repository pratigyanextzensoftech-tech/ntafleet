
// import React, { Fragment } from 'react';
// import { Row, Col, Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
// import { Btn } from "../../../AbstractElements";
// import HeaderCard from '../../Common/Component/HeaderCard';
// import { Controller } from 'react-hook-form';
// import { useForm } from 'react-hook-form';
// const EssoCityForm = () => {
//     return (
//         <Fragment >
//             <div style={{border:"1px solid #ccc",padding:"5px 5px",bprderRadius:"3px"}}>
                       
//                  <div  className='bg-primary p-2 my-3'>
//                 <HeaderCard title="Add Group  City " />
//                 </div>
//                     <Form >
//                         <Row>
                            
//                             <Col md="3">
                         
//                                 <FormGroup className=" m-form__group">
//                                       <FormGroup className="m-form__group">
//                     <InputGroup >
//                       <InputGroupText>Group Name</InputGroupText>
//                    <Controller name="GroupName" 
//                         rules={{ required: "Required" }}
                      
//                          control={control}
//                         render={({ field }) => (
//                           <Select
//                             {...field}
//                             options={InVoiceSupplier}
//                             className="form-control p-0 border-0"
//                             placeholder="Select Group Name"
//                           />
//                         )}
//                       />
//                     </InputGroup>

//                     {errors.GroupName && (
//                       <span className="text-danger">{errors.GroupName?.message}</span>
//                     )}
//                   </FormGroup>
//                                 </FormGroup>
//                             </Col>
//                             <Col md="3">
//                                 <FormGroup className=" m-form__group">
//                                     <InputGroup>
//                                         <InputGroupText>City Name</InputGroupText>
//                                         <Input className="form-control" type="text"  />
//                                     </InputGroup>
//                                 </FormGroup>
//                             </Col>
//                              <Col md="3">
//                                 <FormGroup className=" m-form__group">
//                                     <InputGroup>
//                                         <InputGroupText>Site(6 Digit)</InputGroupText>
//                                         <Input className="form-control" type="text"  />
//                                     </InputGroup>
//                                 </FormGroup>
//                             </Col>
//                               <Col md="3">
//                                 <FormGroup className=" m-form__group">
//                                     <InputGroup>
//                                         <InputGroupText>Site(5 Digit)</InputGroupText>
//                                         <Input className="form-control" type="text"  />
//                                     </InputGroup>
//                                 </FormGroup>
//                             </Col>
//                             </Row>
//                             <Row>
//                           <Col md={12}>
//                          <div className='text-end'>
//                                 <Btn attrBtn={{ color: "primary", className: "m-r-15 ", type: "submit" }} >Add Group City</Btn>
//                 </div>
//                         </Col>
//                         </Row>
                      
//                                   </Form>
                

               
          
// </div>
//         </Fragment>
//     );
// };

// export default EssoCityForm;