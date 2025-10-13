import React, { Fragment, useState } from 'react'
import { Col, Row, Form, FormGroup, InputGroup, InputGroupText,  Input } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { DiscountType,optionscompany } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import HeaderCard from '../../Common/Component/HeaderCard';
import DatePicker from 'react-datepicker'
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata';

const LoveRackCentList = ({ title, btnTitle }) => {
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

                <div className='bg-primary p-2 my-3'>
                    <HeaderCard title={title} />

                </div>
                <Form className='px-2' noValidate='' onSubmit={handleSubmit(onSubmit)}  >
                                <div style={{ border: "1px solid #ccc", padding: "5px 5px", bprderRadius: "3px", marginBottom: "10px" }}>

                    <Row className="mt-3">
                      <Col sm="4">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>Company</InputGroupText>
                      <Controller
                        name="company"
                        control={control}
                        rules={{ required: "company is required" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={optionscompany}
                            className="form-control p-0 border-0"
                            placeholder="Select a country"
                          />
                        )}
                      />

                    </InputGroup>

                    {errors.company && (
                      <span className="text-danger">{errors.company.message}</span>
                    )}
                  </FormGroup>
                </Col>
                           <Col sm="4">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>Discount Type</InputGroupText>
                      <Controller
                        name="discountType"
                        control={control}
                        rules={{ required: "  Required" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={DiscountType}
                            className="form-control p-0 border-0"
                            placeholder="Select Discount Type"
                          />
                        )}
                      />

                    </InputGroup>

                    {errors.discountType && (
                      <span className="text-danger">{errors.discountType.message}</span>
                    )}
                  </FormGroup>
                </Col>
             <Col sm="4">
                                                    <Row>
                                                        <FormGroup className="m-form__group">
                                                            <InputGroup>
                        
                                                                <Col sm="3">
                                                                    <InputGroupText>

                                             from  Date                                                       
                                                         </InputGroupText>
                                                                </Col>
                                                                <Col sm="9">
                                                                    <Controller
                                                                        name="pricingDate"
                                                                        control={control}
                                                                        rules={{ required: " Required" }}
                                                                        render={({ field }) => (
                                                                            <DatePicker
                                                                                className={`form-control `}
                                                                                selected={field.value}
                                                                                onChange={(date) => field.onChange(date)}
                                                                            />
                                                                        )}
                                                                    /></Col>
                        
                        
                        
                        
                                                            </InputGroup>
                        
                                                            {errors.pricingDate && (
                                                                <span className="text-danger">{errors.pricingDate.message}</span>
                                                            )}
                                                        </FormGroup>
                                                    </Row>
                             </Col>
                                  <Col sm="4">
                                                    <Row>
                                                        <FormGroup className="m-form__group">
                                                            <InputGroup>
                        
                                                                <Col sm="3">
                                                                    <InputGroupText>

                                             Upto  Date                                                       
                                                         </InputGroupText>
                                                                </Col>
                                                                <Col sm="9">
                                                                    <Controller
                                                                        name="pricingDate"
                                                                        control={control}
                                                                        rules={{ required: " Required" }}
                                                                        render={({ field }) => (
                                                                            <DatePicker
                                                                                className={`form-control `}
                                                                                selected={field.value}
                                                                                onChange={(date) => field.onChange(date)}
                                                                            />
                                                                        )}
                                                                    /></Col>
                        
                        
                        
                        
                                                            </InputGroup>
                        
                                                            {errors.pricingDate && (
                                                                <span className="text-danger">{errors.pricingDate.message}</span>
                                                            )}
                                                        </FormGroup>
                                                    </Row>
                             </Col>
                                                    
                          
                                                                   <Col sm="8">
                            <div className='text-end'>
                                <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTitle}</Btn>
                            </div>
                        </Col>
                    </Row>                                     
            </div>

                </Form>
<div className='my-5'>
                <DataTableComponent title="Rack Cent List" tableData={dummytabledata} tableColumns={tableColumns}/>
</div>
        </Fragment>
    )
}

export default LoveRackCentList
