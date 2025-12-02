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
import { pricing_pdf as APINAME } from "../../../api";
import { useCompany, useSupplier } from "../../../Hooks/Dropdowns";
import InputText from "../../Forms/FormControl/formInput/InputText";
const SinglePdfCommon = ({
  title,
  btnTtitle,
  onDataAdded,
  supplier_id,
  invoice_type,
  tax,
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

  const onSubmit = (formData) => {
    console.log("Form Data:", formData); // ✅ This will print your inputs
    const payload = {
      company_id: formData.Company.value,
      company_name: formData.Company.label,
      pricing_date: formData.pricingDate,
      testing_email: formData.email,
      supplier: formData.supplier.label,
      entry_count: 0,
      mail_on: new Date(),
      mailby: 0,
      added_on: new Date(),
      // added_on:new Date(),
      idby: localStorage.getItem("userId"),
    };
    axios
      .post(APINAME, payload)
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
                        render={({ field }) => {
                          const options =
                            supplier_id === "1" ? pricigSupplier : supplierData;
                          return (
                            <Select
                              {...field}
                              className="form-control p-0 border-0"
                              options={options}
                              placeholder="Select supplier"
                              onChange={(selectedOption) =>
                                field.onChange(selectedOption)
                              }
                              value={field.value || options?.[0] || null} // 👈 Auto-select first option
                            />
                          );
                        }}
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
