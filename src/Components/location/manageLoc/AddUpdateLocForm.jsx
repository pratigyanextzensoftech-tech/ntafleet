
import React, { Fragment } from 'react';
import { Row, Col, Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from "../../../AbstractElements";
import HeaderCard from '../../Common/Component/HeaderCard';
import Select from 'react-select'
import { Controller,useForm } from 'react-hook-form';
import { InVoiceSupplier } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
const AddUpdateLocForm = () => {
     const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitted, isValid },
      } = useForm();
    
      const onSubmit = (data) => {
        console.log("Form Data:", data);  // ✅ This will print your inputs
        // alert("Form submitted successfully!");
       
      };   
    return (
        <Fragment >
            <div style={{border:"1px solid #ccc",padding:"5px 5px",bprderRadius:"3px"}}>
                        <div  className='bg-primary p-2 my-3'>
                <HeaderCard title="Add Location" />
                </div>
               
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col md="4">
                                <FormGroup className=" m-form__group">
                                    <InputGroup>
                                        <InputGroupText>Location ID</InputGroupText>
                                        <Input className="form-control" type="text"  />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col md="4">
                                <FormGroup className=" m-form__group">
                                    <InputGroup>
                                        <InputGroupText>EFS Location ID</InputGroupText>
                                        <Input className="form-control" type="text"  />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                              <Col md={4}>
                                <InputGroup className="mb-3">
                                    <InputGroupText>Location Name</InputGroupText>
                                    <Input className="form-control" type="text"  />
                                </InputGroup>
                            </Col>
                      
                        </Row>
                        <Row>
                           <Col md={4}>
                                <InputGroup className="mb-3">
                                    <InputGroupText>State</InputGroupText>
                                    <Input className="form-control" type="text"  />
                                </InputGroup>
                            </Col>
                             <Col md={4}>
                                <InputGroup className="mb-3">
                                    <InputGroupText>City</InputGroupText>
                                    <Input className="form-control" type="text"  />
                                </InputGroup>
                            </Col>
                           
                                 <Col md="4">
                              <FormGroup className="m-form__group">
                    <InputGroup >
                      <InputGroupText>Supplier</InputGroupText>
                   <Controller name="supplier" 
                        rules={{ required: "Required" }}
                      
                         control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={InVoiceSupplier}
                            className="form-control p-0 border-0"
                            placeholder="Select Supplier"
                          />
                        )}
                      />
                    </InputGroup>

                    {errors.supplier && (
                      <span className="text-danger">{errors.supplier?.message}</span>
                    )}
                  </FormGroup>
                            </Col>
                            

                        
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

export default AddUpdateLocForm;