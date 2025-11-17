import React, { Fragment, useState } from "react";
import {
  Col,
  Row,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import {
  Upload_Supplier,
  optionscompany,
  TaxOption,
} from "../../Forms/FormWidget/FormSelect2/OptionDatas";
import HeaderCard from "../../Common/Component/HeaderCard";
import DatePicker from "react-datepicker";
import axios from 'axios';
import { toast } from "react-toastify";
import { ul_pricing_pdf as APINAME } from '../../../api';
import useCompany from "../../../Hooks/useCompany";
import InputText from "../../Forms/FormControl/formInput/InputText";
const UltramarPdf = ({ title, btnTtitle ,onDataAdded}) => {
  const {companies}=useCompany()
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm();


 const onSubmit = (formData) => {
                        console.log("Form Data:", formData);  // ✅ This will print your inputs

     const payload = {
      company_id:formData.company.value,
      company_name:formData.company.label,
      pricing_date:formData.pricingDate,
      testing_email:formData.email,
    supplier:formData.supplier.label,
    entry_count:0,
  mail_on:new Date(),
  mailby:0,
    added_on:new Date(),
// added_on:new Date(),
idby:sessionStorage.getItem("userId")
     }
    axios.post(APINAME,payload)
    .then((res)=>{
        console.log(res);
          toast.success("Add successfully!");
   reset();

        if (onDataAdded) onDataAdded();
    })
    .catch((err)=>{
        console.log(err);
          toast.error(err.message);
    })
        };
  return (
    <Fragment>
      <Row>
        <Col>
          <fieldset>
            <legend>{title}</legend>
            <Form
              className="px-2"
              noValidate=""
              onSubmit={handleSubmit(onSubmit)}
            >
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
                            options={companies}
                            className="form-control p-0 border-0"
                            placeholder="Select a country"
                          />
                        )}
                      />
                    </InputGroup>

                    {errors.company && (
                      <span className="text-danger">
                        {errors.company.message}
                      </span>
                    )}
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <Row>
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <Col sm="3">
                          <InputGroupText>Pricing Date</InputGroupText>
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
                          />
                        </Col>
                      </InputGroup>

                      {errors.pricingDate && (
                        <span className="text-danger">
                          {errors.pricingDate.message}
                        </span>
                      )}
                    </FormGroup>
                  </Row>
                </Col>
                <Col sm="4">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>Supplier</InputGroupText>
                      <Controller
                        name="supplier"
                        control={control}
                        rules={{ required: "Supplier is required" }}
                        defaultValue={Upload_Supplier[7]}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="form-control p-0 border-0"
                            placeholder="Select supplier"
                            onChange={(selectedOption) =>
                              field.onChange(selectedOption)
                            }
                            value={field.value}
                          />
                        )}
                      />
                    </InputGroup>

                    {errors.supplier && (
                      <span className="text-danger">
                        {errors.supplier?.message}
                      </span>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm="4">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>Tax Option</InputGroupText>
                      <Controller
                        name="taxOption"
                        control={control}
                        rules={{ required: "Tax Option is required" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="form-control p-0 border-0"
                            options={TaxOption}
                            placeholder="Select Option"
                            onChange={(selectedOption) =>
                              field.onChange(selectedOption)
                            }
                            value={field.value}
                          />
                        )}
                      />
                    </InputGroup>

                    {errors.taxOption && (
                      <span className="text-danger">
                        {errors.taxOption?.message}
                      </span>
                    )}
                  </FormGroup>
                </Col>
                <Col sm="4">
                   <InputText
                              name="email"
                              label="Testing Email"
                              type="text"
                              register={register}
                             
                            />
                </Col>
                <Col sm="4">
                  <div className="text-end">
                    <Btn
                      attrBtn={{
                        color: "primary",
                        className: "m-r-15",
                        type: "submit",
                      }}
                    >
                      {btnTtitle}
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

export default UltramarPdf;
