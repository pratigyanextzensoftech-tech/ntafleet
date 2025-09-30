import React, { Fragment,useState } from 'react'
import {  Col, Row, Form, FormGroup, InputGroup, InputGroupText,Card,CardBody } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { useForm,Controller } from 'react-hook-form';
import {  optionscountry,optionscompany, companyStatus } from '../Forms/FormWidget/FormSelect2/OptionDatas';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import HeaderCard from '../Common/Component/HeaderCard';
const CompanyInfoForm = ({title,btnTtitle,btnTtitle1}) => {
     
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
    <Fragment>
      <Card >
        <CardBody>
      <HeaderCard title={title}/>
                <Form noValidate='' onSubmit={handleSubmit(onSubmit)}>

       <Row className="mt-3">
                <Col sm="4">
                  <FormGroup className="m-form__group">
                    <InputGroup >
                      <InputGroupText>Company</InputGroupText>
                      <Controller name="company" 
                        rules={{ required: "company Name is required" }}
                      
                         control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={optionscompany}
                            className="form-control p-0 border-0"
                            placeholder="Select Company Name"
                          />
                        )}
                      />
                    </InputGroup>

                    {errors.company && (
                      <span className="text-danger">{errors.company?.message}</span>
                    )}
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <FormGroup className="m-form__group">
                    <InputGroup >
                      <InputGroupText>Company Status</InputGroupText>
                      <Controller
                        name="status"
                        rules={{ required: "Status is required" }}
                        control={control}
                        
                        render={({ field }) => (
                          <Select
                            {...field}
                         options={ companyStatus}
                            className="form-control p-0 border-0"
                            placeholder="Select Company Status"
                          />
                        )}
                      />
                    </InputGroup>

                    {errors.status && (
                      <span className="text-danger">{errors.status?.message}</span>
                    )}
                  </FormGroup>
                </Col>

              <Col sm={4}>
                    <div className='text-end'>
                                             <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTtitle}</Btn>
                                               <button className='btn btn-secondary'>{btnTtitle1}</button>
                                         </div>

                </Col>
              </Row>
        
              </Form>
              </CardBody>
      </Card>
    </Fragment>
  )
}

export default CompanyInfoForm
