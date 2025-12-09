import React, { useState,useEffect } from 'react';
import Select from 'react-select'
import { Reportcurrency,InvoiceStatus } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import InputText from '../../Forms/FormControl/formInput/InputText';
import { useSupplier,useItems } from '../../../Hooks/Dropdowns';
const UnknownTransaction = ({btnTitle,btnTitle1,onSearch}) => {
    const{data:supplier}=useSupplier("")
    const{data:items}=useItems()
  
    const {
        register,

        control,
        reset,
        handleSubmit,
        formState: { errors, isSubmitted, isValid },
    } = useForm();

    
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
        company_id: data.company?.value || "",
        currency: data.currency?.value || "",
        item: data.items?.value ,
        invoiced: data.status?.value || "",
        supplier_id:data.supplier.value || ""

      };
      console.log("✅ Full Form Data:", data);
      if (onSearch) onSearch(fullData); // ✅ trigger parent to refresh table
    };

   
    return (
        <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >
            
                    <Row>
                        <Col sm="3">
                            <Row>
                                <FormGroup className="m-form__group">
                                    <InputGroup>

                                        <Col sm="3">
                                            <InputGroupText>
                                                From
                                            </InputGroupText>
                                        </Col>
                                        <Col sm="9">
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
                        <Col sm="3">
                            <Row>
                                <FormGroup className="m-form__group">
                                    <InputGroup>
                                        <Col sm="3">
                                            <InputGroupText>
                                                To
                                            </InputGroupText>
                                        </Col>
                                        <Col sm="9">
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
                           <Col sm="3">
                            <InputText
                                                      name="stateProv"
                                                      label="State Prov"
                                                      type="text"
                                                      register={register}
                                                  />
                        </Col>
                             <Col sm="3">
                               <InputText
                            name="unitNo"
                            label="Unit"
                            type="text"
                            register={register}
                        />
       
                        </Col>
                       
                    </Row>
<Row>
 <Col sm="3">
                              <InputText
                            name="cardNo"
                            label="Card No."
                            type="text"
                            register={register}
                        />
      
                        </Col>
   
                         <Col sm="3">
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
                         <Col sm="3">
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
                        <Col sm="3">
                            <FormGroup className="m-form__group">
                                <InputGroup >
                                    <InputGroupText>Invoice Status</InputGroupText>
                                    <Controller name="status"

                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={InvoiceStatus}
                                                className="form-control p-0 border-0"
                                                placeholder="Select status"
                                            />
                                        )}
                                    />
                                </InputGroup>
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

  render={({ field }) => (
    <Select
      {...field}
      className="form-control p-0 border-0"
      placeholder="Select supplier"
      options={supplier}
      onChange={(selectedOption) => field.onChange(selectedOption)}
      value={field.value}
    />
  )}
/>

                                </InputGroup>

                               
                            </FormGroup>
                        </Col>
                          <Col sm="9">
                    <div className='text-end'>
                        <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTitle}</Btn>
                                 <button className='btn btn-secondary'>{btnTitle1}</button>

                    </div>
                </Col>
</Row>


              
         
           
           
            
           
        </Form>
    )
}


export default UnknownTransaction
