import React, { useState,useEffect } from 'react';
import Select from 'react-select'
import {   invoiceType,Reportcurrency } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import { supplierById } from '../../../api';
import { toast } from "react-toastify";
import { useCompany,useItems } from '../../../Hooks/Dropdowns';
import axios from 'axios';
import InputText from '../../Forms/FormControl/formInput/InputText';
const ViewEfs = ({btnTitle,btnTitle1,onSearch}) => {
    const[supplierData,setSupplierData]=useState([])
    const {data:company}=useCompany()
    const {data:items}=useItems()
    const {
        register,
        control,
        reset,
        setValue,
        handleSubmit,
        formState: { errors, isSubmitted, isValid },
    } = useForm();
useEffect(() => {

  axios
    .get(`${supplierById}/1`)
    .then((res) => {
      const formatted = res.data.map((s) => ({
        value: s.id,
        label: s.supplier_name,
      }));

      setSupplierData(formatted);

      // ⭐ Automatically set default supplier based on type
   
        setValue("supplier", formatted[0]); // no default for no-type
      
    })
    .catch((err) => console.log(err));
}, [setValue]);

  const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
            2,
            "0"
        )}-${String(d.getDate()).padStart(2, "0")}`;
    };
 const onSubmit = (data) => {
      const fullData = {
        // ...data,
        from: data.from ? formatDate(data.from): "",
        to: data.to ? formatDate(data.to) : "",
        state_prov:data.stateProv?data.stateProv:"",
        unit:data.unitNo?data?.unitNo:"",
        card_no:data?.cardNo?data.cardNo:"",
        company_id: data?.company?.value || "",
        currency: data?.currency?.value || "",
        item: data?.items?.value ,
        invoice_type: data?.type?.value || "",
        supplier_id:data.supplier?.value || "" 
      };
      console.log("✅ Full Form Data:", data);
      if (onSearch) onSearch(fullData); // ✅ trigger parent to refresh table
    };


    return (
        <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >
                    <Row>
                        <Col xxl="3" md="6" sm="12">
                            <Row>
                                <FormGroup className="m-form__group">
                                    <InputGroup>
                                        <Col  xs="3">
                                            <InputGroupText>
                                                From
                                            </InputGroupText>
                                        </Col>
                                        <Col xs="9">
                                            <Controller
                                                name="from"
                                                control={control}
                                                render={({ field }) => (
                                                    <DatePicker
                                                        className={`form-control `}
                                                        selected={field.value}
                                                        onChange={(date) => field.onChange(date)}
                                                        dateFormat="yyyy-MM-dd"

                                                    />
                                                )}
                                            /></Col>
                                    </InputGroup>
                                </FormGroup>
                            </Row>
                        </Col>
                        <Col xxl="3" md="6" sm="12">
                            <Row>
                                <FormGroup className="m-form__group">
                                    <InputGroup>
                                        <Col   xs="3">

                                            <InputGroupText>
                                                To
                                            </InputGroupText>
                                        </Col>
                                        <Col xs="9">

                                            <Controller
                                                name="to"
                                                control={control}
                                                render={({ field }) => (
                                                    <DatePicker
                                                        className={`form-control digits`}
                                                        selected={field.value}
                                                        onChange={(date) => field.onChange(date)}
                                                         dateFormat="yyyy-MM-dd"

                                                    />
                                                )}
                                            />
                                        </Col>
                                    </InputGroup>
                                </FormGroup>
                            </Row>
                        </Col>
                           <Col xxl="3" md="6" sm="12">
                             <InputText
                                                      name="stateProv"
                                                      label="State Prov"
                                                      type="text"
                                                      register={register}
                                                  />
                        </Col>
                             <Col xxl="3" md="6" sm="12">
                               <InputText
                            name="unitNo"
                            label="Unit"
                            type="text"
                            register={register}
                        />
                        </Col>
                     
                    </Row>
<Row>
 <Col  xxl="3" md="6" sm="12">
                         <InputText
                            name="cardNo"
                            label="Card No."
                            type="text"
                            register={register}
                        />
                        </Col>
   <Col  xxl="3" md="6" sm="12">
                            <FormGroup className="m-form__group">
                                <InputGroup >
                                    <InputGroupText>Company</InputGroupText>
                                    <Controller name="company"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={company}
                                                className="form-control p-0 border-0"
                                                placeholder="Select Company "
                                            />
                                        )}
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                         <Col  xxl="3" md="6" sm="12">
                            <FormGroup className="m-form__group">
                                <InputGroup >
                                    <InputGroupText>Currency</InputGroupText>
                                    <Controller name="currency"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={Reportcurrency}
                                                className="form-control p-0 border-0"
                                                placeholder="Select Currency"
                                            />
                                        )}
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                         <Col  xxl="3" md="6" sm="12">
                            <FormGroup className="m-form__group">
                                <InputGroup >
                                    <InputGroupText>Items</InputGroupText>
                                    <Controller name="items"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={items}
                                                className="form-control p-0 border-0"
                                                placeholder="Select Items"
                                            />
                                        )}
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
</Row>
<Row>
    
                         <Col  xxl="3" md="6" sm="12">
                            <FormGroup className="m-form__group">
                                <InputGroup >
                                    <InputGroupText>Invoice Type</InputGroupText>
                                    <Controller name="type"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={invoiceType}
                                                className="form-control p-0 border-0"
                                                placeholder="Select type"
                                            />
                                        )}
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                              <Col  xxl="3" md="6" sm="12">
                                          <FormGroup className="m-form__group">
                                            <InputGroup>
                                              <InputGroupText>Supplier</InputGroupText>
                                             
                                             <Controller
                          name="supplier"
                          control={control}
                          defaultValue={null}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={supplierData}
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
                          <Col xxl="6" md="12" sm="12">
                    <div className='text-end'>
                        <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTitle}</Btn>
                                 <button className='btn btn-secondary'>{btnTitle1}</button>

                    </div>
                </Col>
</Row>


              
         
           
           
            
           
        </Form>
    )
}


export default ViewEfs
