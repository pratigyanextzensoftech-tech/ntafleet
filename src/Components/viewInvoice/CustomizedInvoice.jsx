import React, { Fragment } from "react";
import Select from "react-select";
import {
  
  InvoiceCategory,
  InvoiceShow,
  customizedTypeType
} from "../Forms/FormWidget/FormSelect2/OptionDatas";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupText,
  Container,
} from "reactstrap";
import { InvoiceType, useCompany,useCountry,useSupplier } from "../../Hooks/Dropdowns";

import { Btn } from "../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";

const CustomizedInvoice = ({ title,onSearch }) => {
   const{data:country}=useCountry()
    const {data:supplier}=useSupplier("3,6")
    const invoiceTypes=InvoiceType("")
    const{data:company}=useCompany()
  const {
    register,
    control,
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
      const payload={
                supplier_id:data?.supplier?.value || "",
                  from: data.from ? formatDate(data.from): "",
                        to: data.to ? formatDate(data.to) : "",
                          company_id: data?.company?.value || "",
                          country:data?.country?.label ||"",
                           invoice_type: data?.invType?.value || "",
                        invcat:data?.invCat?.value||"",
                        show_hide:data?.show?.value?data?.show?.value:"",
                        cust_inv_type:data?.customised?.value?data?.customised?.value:"",
  
  
      }
      console.log("payload:", payload);
      if (onSearch) onSearch(payload );
      // here you can trigger API call and show table data
    };

  return (
    <Fragment>
      <Row>
        <Col>
          <fieldset>
            <legend>{title}</legend>
            <Form noValidate="" onSubmit={handleSubmit(onSubmit)}>
              <Row className="mt-3">
                <Col sm="3">
                  <Row>
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <Col sm="3">
                          <InputGroupText>From</InputGroupText>
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
                          />
                        </Col>
                      </InputGroup>

                   
                    </FormGroup>
                  </Row>
                </Col>
                <Col sm="3">
                  <Row>
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <Col sm="3">
                          <InputGroupText>To</InputGroupText>
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
                               <FormGroup className="m-form__group">
                                 <InputGroup>
                                   <InputGroupText>Supplier</InputGroupText>
                                   <Controller
                                     name="supplier"
                                     control={control}
                                     defaultValue={null}
                                      render={({ field }) => {
                                                              // Auto select if only one option exists
                                                         
                                                               
                                                              return (
                                                                <Select
                                                                  {...field}
                                                                  options={supplier}
                                                                  className="form-control p-0 border-0"
                                                                  placeholder="Select supplier"
                                                                  value={field.value}
                                                                  onChange={(val) => field.onChange(val)}
                                                                />
                                                              );
                                                            }}
                                   />
                                 </InputGroup>
             
                               
                               </FormGroup>
                             </Col>
                   <Col sm="3">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>Country</InputGroupText>
                      <Controller
                        name="country"
                        control={control}
                        defaultValue={null}

  render={({ field }) => {
                                                 // Auto select if only one option exists
                                                 if (
                                                   country?.length === 1   &&
                                                   field.value === null
                                                 ) {
                                                   field.onChange(country[0]);
                                                 }
                                                  
                                                 return (                        <Select
                            {...field}
                            options={country}
                            className="form-control p-0 border-0"
                            placeholder="Select Country"
                          />
  )}}
                      />
                    </InputGroup>

                  </FormGroup>
                </Col>
              
             <Col sm="3">
                             <FormGroup className="m-form__group">
                               <InputGroup>
                                 <InputGroupText>Invoice Type</InputGroupText>
                                 <Controller
                                   name="invType"
                                   control={control}
                                     defaultValue={null}
           
                                 render={({ field }) => {
                                                            // Auto select if only one option exists
                                                            if (
                                                              invoiceTypes?.length === 1   &&
                                                              field.value === null
                                                            ) {
                                                              field.onChange(invoiceTypes);
                                                            }
                                                             
                                                            return ( 
                                     <Select
                                       {...field}
                                       options={invoiceTypes}
                                       className="form-control p-0 border-0"
                                     />
                                   )}
                                 }
                                 />
                               </InputGroup>
                             
                             </FormGroup>
                           </Col>

                 <Col sm="3">
                           <FormGroup className="m-form__group">
                             <InputGroup>
                               <InputGroupText>Company</InputGroupText>
                               <Controller
                                 name="company"
                                 control={control}
                                 render={({ field }) => (
                                   <Select
                                     {...field}
                                     options={company}
                                     className="form-control p-0 border-0"
                                     placeholder="Select Company Name"
                                   />
                                 )}
                               />
                             </InputGroup>
         
                            
                           </FormGroup>
                         </Col>
                <Col sm="3">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>Customised Type</InputGroupText>
                      <Controller
                        name="customised"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={customizedTypeType}
                            className="form-control p-0 border-0"
                          />
                        )}
                      />
                    </InputGroup>

                   
                  </FormGroup>
                </Col>
                <Col sm="3">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>Invoice Category</InputGroupText>
                      <Controller
                        name="invCat"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={InvoiceCategory}
                            className="form-control p-0 border-0"
                          />
                        )}
                      />
                    </InputGroup>

                  
                  </FormGroup>
                </Col>
               
                <Col sm="3">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>Invoice(Show/Hide) </InputGroupText>
                      <Controller
                        name="show"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={InvoiceShow}
                            className="form-control p-0 border-0"
                          />
                        )}
                      />
                    </InputGroup>

                  
                  </FormGroup>
                </Col>
                <Col sm="9">
                  <div className="text-end">
                    <Btn
                      attrBtn={{
                        color: "primary",
                        className: "m-r-15",
                        type: "submit",
                      }}
                    >
                      Search Data
                    </Btn>
                    <Btn
                      attrBtn={{
                        color: "primary",
                        className: "m-r-15",
                        type: "submit",
                      }}
                    >
                      Reset
                    </Btn>
                  </div>
                </Col>
              </Row>
            </Form>
          </fieldset>
        </Col>
      </Row>
    </Fragment>
  );
};

export default CustomizedInvoice;
