
import React, { Fragment } from 'react';
import { Row, Col, Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from "../../../AbstractElements";
import HeaderCard from '../../Common/Component/HeaderCard';
import Select from 'react-select'
import { Controller,useForm } from 'react-hook-form';
import { optionscountry } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
const ViewCityForm = () => {
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
                <HeaderCard title="Add City     " />
                </div>
               
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col md="3">
                                <FormGroup className=" m-form__group">
                                    <InputGroup>
                                        <InputGroupText>City Name</InputGroupText>
                                        <Input className="form-control" type="text"  />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                              <Col md="3">
                               <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>Country</InputGroupText>
                       <Controller
                        name="country"
                                                rules={{ required: "country is required" }}

                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={optionscountry}
                            className="form-control p-0 border-0"
                            placeholder="Select Country"
                          />
                        )}
                      />
                    </InputGroup>

                    {errors.country && (
                      <span className="text-danger">{errors.country?.message}</span>
                    )}
                  </FormGroup>
                            </Col>
                         <Col md="3">
                               <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>City</InputGroupText>
                       <Controller
                        name="city"
                                                rules={{ required: "city is required" }}

                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={optionscountry}
                            className="form-control p-0 border-0"
                            placeholder="Select City"
                          />
                        )}
                      />
                    </InputGroup>

                    {errors.city && (
                      <span className="text-danger">{errors.city?.message}</span>
                    )}
                  </FormGroup>
                            </Col>
                       <Col md={3}>
                         <div className='text-end'>
                                <Btn attrBtn={{ color: "primary", className: "m-r-15 ", type: "submit" }} >Add City</Btn>
                </div>
                        </Col>
                      
                        </Row>
                       </Form>
                

               
          
</div>
        </Fragment>
    );
};

export default ViewCityForm;