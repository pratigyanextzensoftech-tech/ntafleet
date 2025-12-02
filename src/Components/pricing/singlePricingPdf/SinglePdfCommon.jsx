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
  pricigSupplier,
  optionscompany,
} from "../../Forms/FormWidget/FormSelect2/OptionDatas";
import HeaderCard from "../../Common/Component/HeaderCard";
import DatePicker from "react-datepicker";
import CompanyDropDown from "../../Forms/FormControl/formInput/DropDown";
import axios from "axios";
import { toast } from "react-toastify";
import { useCompany, useSupplier } from "../../../Hooks/Dropdowns";
import InputText from "../../Forms/FormControl/formInput/InputText";
const SinglePdfCommon = ({
  title,
  btnTtitle,
  onDataAdded,
  supplier_id,
  invoice_type,
  supplier,
  tax,
  api_name
}) => {
  const { data: companies } = useCompany("", invoice_type);
  const { data: supplierData } = useSupplier(supplier_id);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted, isValid },
  } = useForm();
 const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  console.log( {supplierData});
  
  const onSubmit = (formData) => {
    console.log("Form Data:", formData); // ✅ This will print your inputs
    const payload = {
      company_id: formData.Company.value,
      // company_name: formData.Company.label,
      pricing_date: formData.pricingDate?formatDate(formData.pricingDate) :"",
      testing_email: formData.email,
      supplier_id: formData.supplier.value,
      supplier:   supplier_id === "1" ?formData.supplier.value:"",
      invoice_type: invoice_type?invoice_type:""  , 
    tax: tax?tax:"No"
    };
    console.log(payload)
    axios
      .post(api_name, payload)
      .then((res) => {
        console.log(res);
        toast.success("Add successfully!");
        reset();
        if (onDataAdded) onDataAdded();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
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
                  <CompanyDropDown
                    label="Company"
                    name="Company"
                    options={companies}
                    control={control}
              rules={{ required: "Company is required" }}
               errors={errors}

                  />
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
                                className={`form-control digits`}
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                                dateFormat="yyyy-MM-dd"
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
        defaultValue={null} // RHF default
        render={({ field }) => {
          const options =
            supplier_id === "1" ? pricigSupplier : supplierData;

          // ✔ If no value selected, return first option as default
          const currentValue = field.value || options?.[0] || null;

          // ✔ Inform RHF of the default value (ONLY when empty)
          if (!field.value && options?.length > 0) {
            field.onChange(options[0]);
          }

          return (
            <Select
              {...field}
              className="form-control p-0 border-0"
              options={options}
              placeholder="Select supplier"
              value={currentValue}
              onChange={(selected) => field.onChange(selected)}
            />
          );
        }}
      />
    </InputGroup>

    {errors.supplier && (
      <span className="text-danger">{errors.supplier?.message}</span>
    )}
  </FormGroup>
</Col>

              </Row>
              <Row>
                <Col sm="4">
                  <InputText
                    name="email"
                    label="Testing Email"
                    type="text"
                    register={register}
                  />
                </Col>
                <Col sm="8">
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

export default SinglePdfCommon;
