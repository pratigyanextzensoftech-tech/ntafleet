import React, { useState, Fragment } from "react";
import Select from "react-select";
import {
  InvoiceShow,
  InvoiceCategory,
} from "../Forms/FormWidget/FormSelect2/OptionDatas";
import {
  Row,
  Col,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { Btn } from "../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import { InvoiceType,useCountry,useSupplier } from "../../Hooks/Dropdowns";
import useCompany from "../../Hooks/useCompany";
import DatePicker from "react-datepicker";
const OwnerOperator = ({ title,onSearch }) => {
  const{data:country}=useCountry("1")
  const {data:supplier}=useSupplier("6,10")
  const invoiceTypes=InvoiceType("RG")
  const{companies}=useCompany()
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
                supplier_id: data && supplier ? supplier.value : "",
                    from: data.from ? formatDate(data.from): "",
                          to: data.to ? formatDate(data.to) : "",
                            company_id: data.company?.value || "",
                            country:data.country.label ||"",
                             invoice_type: data.invType.value?data.invType.value : "",
                          invcat:data?.category?.value||"",
                          show_hide:data?.show?.value?data?.show.value:"",
  
        }
        console.log(payload)
          if (onSearch) onSearch( payload );
  };

  
  return (
    <Fragment>
      <Row>
        <Col>
          <fieldset>
            <legend>{title}</legend>
            <Form noValidate="" onSubmit={handleSubmit(onSubmit)}>
              <Row className="my-3">
                <Col xxl="3"  xl="4"  md="6" sm="12">
                  <Row>
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <Col xs="3">
                          <InputGroupText>From</InputGroupText>
                        </Col>
                        <Col xs="9">
                          <Controller
                            name="from"
                            control={control}
                            render={({ field }) => (
                              <DatePicker
                                className={`form-control `}
                                selected={field.value}
                                id="from"
                                onChange={(date) => field.onChange(date)}
                                dateFormat="yyyy-MM-dd"
                                 portalId="root"
                                popperPlacement="bottom-start"

                              />
                            )}
                          />
                        </Col>
                      </InputGroup>

                  
                    </FormGroup>
                  </Row>
                </Col>
                <Col xxl="3"  xl="4"  md="6" sm="12">
                  <Row>
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <Col xs="3">
                          <InputGroupText>To</InputGroupText>
                        </Col>
                        <Col xs="9">
                          <Controller
                            name="to"
                            control={control}
                            render={({ field }) => (
                              <DatePicker
                                className={`form-control digits`}
                                selected={field.value}
                                 id="to"
                                onChange={(date) => field.onChange(date)}
                                dateFormat="yyyy-MM-dd"
                                 portalId="root"
                                popperPlacement="bottom-start"
                              />
                            )}
                          />
                        </Col>
                      </InputGroup>

                  
                    </FormGroup>
                                  </Row>

                </Col>

                <Col xxl="3"  xl="4"  md="6" sm="12">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>Supplier</InputGroupText>
                      <Controller
                        name="supplier"
                        control={control}
                        defaultValue={null}
                         render={({ field }) => {
                                                 // Auto select if only one option exists
                                                //  if (
                                                //    supplier?.length >= 1   &&
                                                //    field.value === null
                                                //  ) 
                                                //  {
                                                //    field.onChange(supplier[0]);
                                                //  }
                                                  
                                                 return (
                                                   <Select
                                                     {...field}
                                                  inputId="supplier_id"
                                                  name="supplier"
                                                     options={supplier}
                                                     className="form-control p-0 border-0"
                                                     placeholder="Select supplier"
                                                     value={field.value}
                                                     onChange={(val) => field.onChange(val)}
                                                       menuPortalTarget={document.body}
                          menuPosition="fixed"
                                 styles={{
                menuPortal: base => ({
                  ...base,
                  zIndex: 99999
                })
              }}
                                                   />
                                                 );
                                               }}
                      />
                    </InputGroup>

                  
                  </FormGroup>
                </Col>

                <Col xxl="3"  xl="4"  md="6" sm="12">
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
                              id="country"
                              name="country"
                            className="form-control p-0 border-0"
                            placeholder="Select Country"
                              menuPortalTarget={document.body}
                          menuPosition="fixed"
                                 styles={{
                menuPortal: base => ({
                  ...base,
                  zIndex: 99999
                })
              }}
                          />
  )}}
                      />
                    </InputGroup>

                  </FormGroup>
                </Col>
              
                <Col xxl="3"  xl="4"  md="6" sm="12">
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
                                                   field.onChange(invoiceTypes[0]);
                                                 }
                                                  
                                                 return ( 
                          <Select
                            {...field}
                            options={invoiceTypes}
                             id="invoice_type"
                             name="invoiceType"
                            className="form-control p-0 border-0"
                              menuPortalTarget={document.body}
                          menuPosition="fixed"
                                 styles={{
                menuPortal: base => ({
                  ...base,
                  zIndex: 99999
                })
              }}
                          />
                        )}
                      }
                      />
                    </InputGroup>
                  
                  </FormGroup>
                </Col>

                <Col xxl="3"  xl="4"  md="6" sm="12">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>Company</InputGroupText>
                      <Controller
                        name="company"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={companies}
                           id="company_id"
                            name="company"
                            className="form-control p-0 border-0"
                            placeholder="Select Company "
                              menuPortalTarget={document.body}
                          menuPosition="fixed"
                                 styles={{
                menuPortal: base => ({
                  ...base,
                  zIndex: 99999
                })
              }}
                          />
                        )}
                      />
                    </InputGroup>

                   
                  </FormGroup>
                </Col>

                <Col xxl="3"  xl="4"  md="6" sm="12">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>Invoice Category</InputGroupText>
                      <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={InvoiceCategory}
                            className="form-control p-0 border-0"
                                   value={field.value}              // IMPORTANT for controlled select
        onChange={(val) => field.onChange(val)}
           id="invcat"
           name="invcat"
          menuPortalTarget={document.body}
                          menuPosition="fixed"
                                 styles={{
                menuPortal: base => ({
                  ...base,
                  zIndex: 99999
                })
              }}
                          />
                        )}
                      />
                    </InputGroup>

                 
                  </FormGroup>
                </Col>

                <Col xxl="3"  xl="4"  md="6" sm="12">
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
                             id="show_hide"
                             name="invoiceShow"
                            className="form-control p-0 border-0"
                                   value={field.value}              // IMPORTANT for controlled select
        onChange={(val) => field.onChange(val)}
          menuPortalTarget={document.body}
                          menuPosition="fixed"
                                 styles={{
                menuPortal: base => ({
                  ...base,
                  zIndex: 99999
                })
              }}
                          />
                        )}
                      />
                    </InputGroup>

                
                  </FormGroup>
                </Col>
              <Col xxl="3"  xl="4"  md="6" sm="12" className="text-end ms-auto">
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
                    type: "reset",
                  }}
                >
                  Reset
                </Btn>
              </Col>
              </Row>
            </Form>
          </fieldset>
        </Col>
      </Row>
    </Fragment>
  );
};
export default OwnerOperator;
