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
import { useCountry,useSupplier,useCompany } from '../../../Hooks/Dropdowns';
import { useLocation } from "react-router-dom";
import { transactions } from '../../../api';
import axios from 'axios';

import { toast } from 'react-toastify'; 
const EditUnknownTransaction = () => {
     const { state } = useLocation();
  const rowData = state?.data;
    console.log("Received Edit Data:", rowData);
  const {data} =useCountry()
  const {data:supplierData}=useSupplier()
  const {data:CompanyData}=useCompany()
    const {
        register,

        control,
        reset,
        handleSubmit,
        formState: { errors, isSubmitted, isValid },
    } = useForm();
useEffect(() => {
  if ( rowData) {
    console.log(rowData)
    const selectedCountry = data?.find(
          (item) => item.label === rowData.country
        );
       const selectedCurrency = currency?.find(
          (item) => 
            item.label === rowData.currency

        ); 
const selectedSupplier = supplierData?.find(
          (item) => item.label === rowData.supplier_name
        );
        
        const selectedCompany = CompanyData?.find(
          (item) => item.label === rowData.company_name
        );
          const selectedRackInvoice = YesNo?.find(
          (item) => item.label === rowData.retail_invoice
        );
        const invoiceStatus=InvoiceStatus?.find(
          (item) => item.value == rowData.inv == 0 ? "Invoiced" : "Not Invoiced"
        );
    reset({
      card1: rowData.card_no,
      card2: rowData.cardNumber,
      transDate: rowData.tran_date,
      transTime: rowData.tran_time,
      invoice: rowData.invoice,
      unit: rowData.unit,
      drierName: rowData.driver_name,
      odometer: rowData.odometer,
      loc: rowData.location_name,
      city: rowData.city,
      stateProv: rowData.state_prov,
      fee: rowData.fees,
      item: rowData.item,
      efs: rowData.efs_unit_price,
      tax: rowData.tax_unit_price,
      unitPrice: rowData.unit_price,
      rackPrice: rowData.retail_price,
      qty: rowData.qty,
      discountCent: rowData.discount_cent,
      amount: rowData.amt,
      taxAmt: rowData.tax_amt,
      db : rowData.db,
      rackInvoice: selectedRackInvoice,
      conversationRate: rowData.rate,
      status: invoiceStatus,
      
      supplier: 
    { value: rowData.supplier_id ,label: rowData.supplier_name }
  ,

         company: {
          value:rowData.company_id ,
          label: rowData.company_name
         },
         currency:{
          value:selectedCurrency ?selectedCurrency.value:null,
          label:rowData.currency
         },
         country:{
            value:selectedCountry ?selectedCountry.value:null,
          label:rowData.country
         }
        // company_login:{
        //    value: companylogin.value,
        //   label: companylogin.label
        // }
    });
  }
}, [ rowData]);
   
const onSubmit = (formData) => {
    
     const payload = {
  card_no: formData.card1,
  cardNumber: formData.card2,

  tran_date: formData.tranDate,
   tran_time: formData.tranTime,

  invoice: formData.invoice,
  unit: formData.unit,
  driver_name: formData.driverName,
  odometer: formData.odometer,

  location_name : formData.locationName,
  city: formData.city,
  state_prov : formData.stateProv,
  country: formData.country.label,

  fees: formData.fees,
  item: formData.item,
  efs_unit_price : formData.efsUnitPrice,
   tax_unit_price : formData.taxUnitPrice,
  unit_price : formData.unitPrice,
  retail_price : formData.retailPrice,

  qty: formData.qty,
 discount_cent  : formData.discountCent,

  amount: formData.amt,        // reversed
  tax_amt : formData.taxAmount,

  db: formData.db,
  currency: formData.currency?.label,
  supplier_name: formData.supplier.label,
  supplier_id: formData.supplier.value,
  company_id: formData.company?.value,
  company_name: formData.company?.label,
  rackInvoice: formData.rackInvoice.label,

  rate: formData.rate,
  status: formData.status,
};
console.log(payload)
        
          axios.put(`${transactions}/${rowData.id}`, payload)
        .then((res) => {
          toast.success(" updated successfully!");
        reset( {
  card1: "",
  card2: "",
  transDate: "",
  transTime: "",
  invoice: "",
  unit: "",
  drierName: "",
  odometer: "",
  loc: "",
  city: "",
  stateProv: "",
  country: "",
  fee: "",
  item: "",
  efs: "",
  tax: "",
  unitPrice: "",
  rackPrice: "",
  qty: "",
  discountCent: "",
  amount: "",
  taxAmt: "",
  db: "",
  currency: "",
  supplier: "",
  company: "",
  rackInvoice: "",
  conversationRate: "",
  status: "",
})
        })
        .catch((err) => {
          toast.error("Update failed!");
          console.error(err);
        });
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
            <Row>
 <Col sm="3">
  <InputText
              name="card1"
              label="Card No."
              type="text"
              register={register}
            />
                         
                        </Col>
                         <Col sm="3">
  <InputText
              name="card2"
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
                                                options={data.filter((_,i)=>i!==0)}

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
      options={supplierData}
      value={field.value}   // ✅ FIXED
      onChange={(val) => field.onChange(val)}
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
                                                options={CompanyData}
                                                className="form-control p-0 border-0"
                                                placeholder="Select company"
                                                  value={field.value}   // ✅ FIXED
                                             onChange={(val) => field.onChange(val)}
                                            />
                                        )}
                                    />
                                </InputGroup>

                                {errors.status && (
                                    <span className="text-danger">{errors.company?.message}</span>
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
                                    <Controller name="status"
                                        rules={{ required: "currency is required" }}

                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={InvoiceStatus}
                                                className="form-control p-0 border-0"
                                                placeholder="Select currency"
                                                  value={field.value}   // ✅ FIXED
                                                  onChange={(val) => field.onChange(val)}
                                            />
                                        )}
                                    />
                                </InputGroup>

                                {errors.status && (
                                    <span className="text-danger">{errors.status?.message}</span>
                                )}
                            </FormGroup>
                        </Col>
                           <Col sm="9">
                    <div className='text-end'>
                        <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >Update Transactions</Btn>

                    </div>
                </Col>
                    </Row>

<Row>
      
                       
                      
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
