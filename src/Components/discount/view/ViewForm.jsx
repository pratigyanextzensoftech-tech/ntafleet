import React, { useState } from "react";
import Select from "react-select";
import {
  checkBoxData,
  optionscountry,
  optionscompany,
  customizedTypeType,
  invoiceType1,
  InvoiceCategory,
  InvoiceShow,
  viewDiscountsupplier,
} from "../../Forms/FormWidget/FormSelect2/OptionDatas";
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
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import HeaderCard from "../../Common/Component/HeaderCard";
import DropDown from "../../Forms/FormControl/formInput/DropDown";
import DatePickerInput from "../../Forms/FormControl/formInput/DatePickerInput";
import useCompany from "../../../Hooks/useCompany";
import useSupplier from "../../../Hooks/useSupplier";
const ViewForm = ({ title, btnTitle, btnTitle1 }) => {
  const { companies: companyOptions, loading: companyLoading } = useCompany();
  const { supplier, loading, error } = useSupplier();
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data); // ✅ This will print your inputs
    // alert("Form submitted successfully!");
  };

  return (
    <> 
      <Form noValidate="" onSubmit={handleSubmit(onSubmit)}>
        <Row className="mt-3">
          <Col sm="4">
            <DropDown
              name="company"
              label="Company"
              control={control}
              errors={errors}
              rules={{ required: "Company is required" }}
              placeholder="Select Company"
              // loading={companyLoading}
              options={companyOptions}
            />
          </Col>
          <Col sm="4">
            <DatePickerInput
              name="startDate"
              control={control} // ✅ make sure this is passed
              label="Start Date"
              placeholder="Select start date" // ✅ fixed spelling
              errors={errors}
              required="start Date is required"
            />
          </Col>
          <Col sm="4">
            <DatePickerInput
              name="endDate"
              control={control} // ✅ make sure this is passed
              label="End Date"
              placeholder="Select end date" // ✅ fixed spelling
              errors={errors}
              required="End Date is required"
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col sm="4">
            <DropDown
              name="country"
              label="Country"
              errors={errors}
              control={control}
              rules={{ required: "Country is required" }}
              placeholder="Select Country"
              // loading={companyLoading}
              options={optionscountry}
            />
          </Col>
          <Col sm="4">
            <DropDown
              name="supplier"
              label="Supplier"
              errors={errors}
              control={control}
              rules={{ required: "supplier is required" }}
              placeholder="Select supplier"
              // loading={companyLoading}
              options={viewDiscountsupplier}
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
                {btnTitle}
              </Btn>
              <button className="btn btn-secondary">{btnTitle1}</button>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ViewForm;
