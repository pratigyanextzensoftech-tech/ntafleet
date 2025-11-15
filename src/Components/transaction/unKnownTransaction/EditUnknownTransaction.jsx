import React, { useState,useEffect ,Fragment} from 'react';
import Select from 'react-select'
import {   optionscompany, Upload_Supplier,  currency,YesNo,InvoiceStatus } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Input, InputGroup, InputGroupText, Container,Card,CardBody } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import InputText from '../../Forms/FormControl/formInput/InputText';
import { useCountry } from '../../../Hooks/Dropdowns';
import { useLocation } from "react-router-dom";
const EditUnknownTransaction = () => {
     const { state } = useLocation();
  const rowData = state?.data;
    console.log("Received Edit Data:", rowData);
  const {data} =useCountry()
    const {
        register,

        control,
        reset,
        handleSubmit,
        formState: { errors, isSubmitted, isValid },
    } = useForm();

    const onSubmit = (data) => {

        console.log("Form Data:", data);  // ✅ This will print your inputs
        // alert("Form submitted successfully!");
      
    };
    return (
          <Fragment>
      <Breadcrumbs parent="Transaction" title="Edit Unknown Transaction " /> 
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Filter" />
              <CardBody>
        <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >
            <Row>
 <Col sm="3">
  <InputText
              name="card"
              label="Card No."
              type="text"
              register={register}
            />
                         
                        </Col>
                         <Col sm="3">
  <InputText
              name="card"
              label="Card No."
              type="text"
              register={register}
             
            />
               </Col>
             <Col sm="3">
             <InputText
              name="transDate"
              label="Tran Date"
              type="text"
              register={register}
             
            />
                         
                        </Col>
     <Col sm="3">
             <InputText
              name="transTime"
              label="Tran Time"
              type="text"
              register={register}
             
            />
                         
                        </Col>
                        </Row>
                          <Row>
 <Col sm="3">
  <InputText
              name="invoice"
              label="Invoice"
              type="text"
              register={register}
            />
                         
                        </Col>
                         <Col sm="3">
  <InputText
              name="unit"
              label="Unit"
              type="text"
              register={register}
             
            />
               </Col>
             <Col sm="3">
             <InputText
              name="drierName"
              label="Driver Name"
              type="text"
              register={register}
             
            />
                         
                        </Col>
     <Col sm="3">
             <InputText
              name="odometer"
              label="Odometer"
              type="text"
              register={register}
             
            />
                         
                        </Col>
                        </Row>
                         <Row>
 <Col sm="3">
  <InputText
              name="loc"
              label="Location Name"
              type="text"
              register={register}
            />
                         
                        </Col>
                         <Col sm="3">
  <InputText
              name="city"
              label="City"
              type="text"
              register={register}
             
            />
               </Col>
             <Col sm="3">
             <InputText
              name="stateProv"
              label="State Prov"
              type="text"
              register={register}
             
            />
                         
                        </Col>
    
                         <Col sm="3">
                            <FormGroup className="m-form__group">
                                <InputGroup >
                                    <InputGroupText>Country</InputGroupText>
                                    <Controller name="country"

                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={data}
                                                className="form-control p-0 border-0"
                                                placeholder="Select Currency"
                                            />
                                        )}
                                    />
                                </InputGroup>

                                {errors.currency && (
                                    <span className="text-danger">{errors.currency?.message}</span>
                                )}
                            </FormGroup>
                        </Col>
                        </Row>
                          <Row>
 <Col sm="3">
  <InputText
              name="fee"
              label="Fees"
              type="text"
              register={register}
            />
                         
                        </Col>
                         <Col sm="3">
  <InputText
              name="item"
              label="Item"
              type="text"
              register={register}
             
            />
               </Col>
             <Col sm="3">
             <InputText
              name="efs"
              label="EFS Unit Price"
              type="text"
              register={register}
             
            />
                         
                        </Col>
     <Col sm="3">
             <InputText
              name="tax"
              label="Tax Unit Price"
              type="text"
              register={register}
             
            />
                         
                        </Col>
                        </Row>
                              <Row>
 <Col sm="3">
  <InputText
              name="unitPrice"
              label="Unit Price"
              type="text"
              register={register}
            />
                         
                        </Col>
                         <Col sm="3">
  <InputText
              name="rackPrice"
              label="Rack Price"
              type="text"
              register={register}
             
            />
               </Col>
             <Col sm="3">
             <InputText
              name="qty"
              label="Qty"
              type="text"
              register={register}
             
            />
                         
                        </Col>
     <Col sm="3">
             <InputText
              name="discountCent"
              label="Discount Cent"
              type="text"
              register={register}
             
            />
                         
                        </Col>
                        </Row>
                            <Row>
 <Col sm="3">
  <InputText
              name="amount"
              label="Amt"
              type="text"
              register={register}
            />
                         
                        </Col>
                         <Col sm="3">
  <InputText
              name="taxAmt"
              label="Tax Amt"
              type="text"
              register={register}
             
            />
               </Col>
             <Col sm="3">
             <InputText
              name="db"
              label="Db"
              type="text"
              register={register}
             
            />
                         
                        </Col>
           <Col sm="3">
                            <FormGroup className="m-form__group">
                                <InputGroup >
                                    <InputGroupText>Currency</InputGroupText>
                                    <Controller name="currency"
                                        rules={{ required: "currency is required" }}

                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={currency}
                                                className="form-control p-0 border-0"
                                                placeholder="Select Currency"
                                            />
                                        )}
                                    />
                                </InputGroup>

                                {errors.currency && (
                                    <span className="text-danger">{errors.currency?.message}</span>
                                )}
                            </FormGroup>
                        </Col>
                       
                        </Row>
                        <Row>
                               <Col sm="3">
                            <FormGroup className="m-form__group">
                                <InputGroup >
                                    <InputGroupText>Supplier</InputGroupText>
                                <Controller
  name="supplier"
  control={control}
  rules={{ required: "Supplier is required" }}

  render={({ field }) => (
    <Select
      {...field}
      className="form-control p-0 border-0"
      placeholder="Select supplier"
      options={Upload_Supplier}
      onChange={(selectedOption) => field.onChange(selectedOption)}
      value={field.value}
    />
  )}
/>

                                </InputGroup>

                                {errors.supplier && (
                                    <span className="text-danger">{errors.supplier?.message}</span>
                                )}
                            </FormGroup>
                        </Col>
                         <Col sm="3">
                            <FormGroup className="m-form__group">
                                <InputGroup >
                                    <InputGroupText>Company</InputGroupText>
                                    <Controller name="company"

                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={optionscompany}
                                                className="form-control p-0 border-0"
                                                placeholder="Select company"
                                            />
                                        )}
                                    />
                                </InputGroup>

                                {errors.status && (
                                    <span className="text-danger">{errors.status?.message}</span>
                                )}
                            </FormGroup>
                        </Col>
                        
                  
                         <Col sm="3">
                            <FormGroup className="m-form__group">
                                <InputGroup >
                                    <InputGroupText>Rack Invoice</InputGroupText>
                                    <Controller name="rackInvoice"

                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={YesNo}
                                                className="form-control p-0 border-0"
                                                placeholder="Select Rack Invoice"
                                            />
                                        )}
                                    />
                                </InputGroup>

                                {errors.items && (
                                    <span className="text-danger">{errors.items?.message}</span>
                                )}
                            </FormGroup>
                        </Col>
                          <Col sm="3">
             <InputText
              name="conversationRate"
              label="Conversion Rate"
              type="text"
              register={register}
             
            />
                         
                        </Col>
                    
</Row>
                    <Row>
                    
                
                      
                             <Col sm="3">
                            <FormGroup className="m-form__group">
                                <InputGroup >
                                    <InputGroupText>Invoiced Status</InputGroupText>
                                    <Controller name="currency"
                                        rules={{ required: "currency is required" }}

                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={InvoiceStatus}
                                                className="form-control p-0 border-0"
                                                placeholder="Select Currency"
                                            />
                                        )}
                                    />
                                </InputGroup>

                                {errors.currency && (
                                    <span className="text-danger">{errors.currency?.message}</span>
                                )}
                            </FormGroup>
                        </Col>
                       
                    </Row>

<Row>
      
                       
                          <Col sm="9">
                    <div className='text-end'>
                        <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >Update Transactions</Btn>

                    </div>
                </Col>
</Row> 
        </Form>
        </CardBody>
          </Card>
          </Col>
          </Row>
          </Container>
          </Fragment>
    )
}


export default EditUnknownTransaction
