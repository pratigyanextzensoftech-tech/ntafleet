import React, { useState,useEffect ,Fragment} from 'react';
import Select from 'react-select'
import {   optionscompany, Upload_Supplier,  currency,YesNo,InvoiceStatus,cardStatus } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Input, InputGroup, InputGroupText, Container,Card,CardBody } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import InputText from '../../Forms/FormControl/formInput/InputText';
import { useCountry } from '../../../Hooks/Dropdowns';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import { fual_card as APINAME } from "../../../api"; // your fuel card API endpoint
import { useCompany,useSupplier } from '../../../Hooks/Dropdowns';
const Index = () => {
   
      const{data:supplierOption}=useSupplier()
     const { state } = useLocation();
     
  const rowData = state?.data;
    console.log("Received Edit Data:", rowData);
  const {data} =useCompany()
    const {
        register,

        control,
        reset,
        handleSubmit,
        formState: { errors, isSubmitted, isValid },
    } = useForm();
 useEffect(() => {
  if (rowData) {
    console.log(rowData);

    reset({
      cardNo: rowData.card_no,
      policyNo: rowData.policy,
      unitNo: rowData.unit_number,
      pinNo: rowData.pin_number,
      driverName: rowData.driver_name,
      driverMobile: rowData.d_mobile1,
      driverMobile2: rowData.d_mobile2,
     
  company: {
    value: rowData.company_id,
    label: rowData.company_name
  },
  supplier: {
    value: rowData.supplier_id,
    label: rowData.supplier_name
  },
  cardStatus: {
    value: rowData.status,
    label: rowData.status
  },

// SELECT needs full object
    });
  }
}, [rowData, reset]);

   const onSubmit = (formData) => {
                        console.log("Form Data:", formData);  // ✅ This will print your inputs

     const payload = {
    card_no: formData.cardNo,
    policy:formData.policyNo,
    unit_number:formData.unitNo,
    pin_number:formData.pinNo,
company_id:formData.company.value,
supplier_id:formData.supplier.value,
driver_name:formData.driverName,
d_mobile1:formData.driverMobile,
d_mobile2:formData.driverMobile2,
status:formData.cardStatus.label,
supplier_name:formData.supplier.label,
cardno:"",
company_name:formData.company.label,
update_otp:"",

     }
    axios.post(APINAME,payload)
    .then((res)=>{
        console.log(res);
       
          toast.success("Update successfully!");

   reset({
    
      cardNo: "",
      policyNo:"",
      unitNo: "",
      pinNo: "",
      driverName: "",
      driverMobile: "",
      driverMobile2: "",
     
  company: {
    value: "",
    label: ""
  },
  supplier: {
    value: "",
    label: ""
  },
  cardStatus: {
    value:"",
    label: ""
  },

// SELECT needs full object
    
   });

        // if (onDataAdded) onDataAdded();
    })
    .catch((err)=>{
        console.log(err);
          toast.error(err.message);
    })
        
  }
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
                <Row className="mt-3">
                     <Col sm='4'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  Card Number </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="number"  {...register('cardNo')} />
                            </InputGroup>
                           
                          </FormGroup>
                        </Col>
                     <Col sm='4'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  Policy Number </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="number"  {...register('policyNo')} />
                            </InputGroup>
                           
                          </FormGroup>
                        </Col>
                     <Col sm='4'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  Unit Number  </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="number"  {...register('unitNo')} />
                            </InputGroup>
                           
                          </FormGroup>
                        </Col>
                   </Row>
                   <Row>
                       <Col sm='4'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  Pin Number </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="number"  {...register('pinNo')} />
                            </InputGroup>
                     
                          </FormGroup>
                        </Col>
                  
                 
         <Col sm="4">
                        <FormGroup className="m-form__group">
                            <InputGroup >
                                <InputGroupText>Company</InputGroupText>
                                <Controller name="company"

                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={data}
                                            className="form-control p-0 border-0"
                                            placeholder="Select Company Name"
                                          
     value={field.value}
      onChange={(val) => field.onChange(val)}
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
                      <InputGroupText>Supplier</InputGroupText>
                      <Controller
                        name="supplier"
                        
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                                 options={
               supplierOption // your normal supplier array
            }
                            className="form-control p-0 border-0"
                            placeholder="Select supplier"
                           value={field.value}
      onChange={(val) => field.onChange(val)}
                          />
                        )}
                      />
                    </InputGroup>

                   
                  </FormGroup>
                </Col>
       </Row>  
        <Row >
                     <Col sm='4'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  Driver Name </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('driverName')} />
                            </InputGroup>
                       
                          </FormGroup>
                        </Col>
                     <Col sm='4'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  Driver Mobile 1  </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('driverMobile')} />
                            </InputGroup>
                           
                          </FormGroup>
                        </Col>
                     <Col sm='4'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>   Driver Mobile 2 </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('driverMobile2')} />
                            </InputGroup>
                           
                          </FormGroup>
                        </Col>
                   </Row>           
<Row>
       <Col sm="4">
                  <FormGroup className="m-form__group">
                    <InputGroup >
                      <InputGroupText>Card Status</InputGroupText>
                      <Controller
                        name="cardStatus"
                        
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                                 options={
               cardStatus // your normal supplier array
            }
                            className="form-control p-0 border-0"
                            placeholder="Select Card Status"
                                value={field.value}
      onChange={(val) => field.onChange(val)}
                          />
                        )}
                      />
                    </InputGroup>

                  
                  </FormGroup>
                </Col>
                       <Col sm="8">

<div className='text-end'>
                            <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >Update</Btn>

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


export default Index
