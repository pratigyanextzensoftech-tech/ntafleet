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
  InVoiceSupplier,
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
import DatePicker from "react-datepicker";
import DatePickerInput from "../../Forms/FormControl/formInput/DatePickerInput";
import useSupplier from "../../../Hooks/useSupplier";
import useCompany from "../../../Hooks/useCompany";
import HeaderCard from "../../Common/Component/HeaderCard";
import DropDown from "../../Forms/FormControl/formInput/DropDown";
import SupplierDropDown from "../../Forms/FormControl/formInput/SupplierDropDown";
import InputText from "../../Forms/FormControl/formInput/InputText";
import axios from 'axios';
import { useCountry } from "../../../Hooks/Dropdowns";
import { toast } from "react-toastify";
import { discount_list as APINAME } from '../../../api';
const Create = ({ title, btnTitle,onDataAdded }) => {
  const { companies: companyOptions, loading: companyLoading } = useCompany();
  const { supplier, loading, error } = useSupplier();
  const {data:country}=useCountry()

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
 const onSubmit = (formData) => {
                        console.log("Form Data:", formData);  // ✅ This will print your inputs

     const payload = {
      company_id:formData.company.value,
      company_name:formData.company.label,
   end_date: formatDate(formData.endDate),
    start_date:formatDate(formData.startDate),
    country:formData.country.label,
supplier_id:formData.supplier.value,
supplier_name:formData.supplier.label,
discount_amt_us:formData.discount,
// discount_amt_us:0,
discount_ca:0,
total_ca:0,
retail_total_ca:0,
fuel_unit_ca:0,
fuel_unit_ca_disc_free:0,
discount_amt_ca:0,
discount_us:0,
total_us:0,
retail_total_us:0,
fuel_unit_us:0,
fuel_unit_us_disc_free:0,
added_by:localStorage.getItem("userId"),
added_on:new Date()
     }
    axios.post(APINAME,payload)
    .then((res)=>{
        console.log(res);
       
          toast.success("Add successfully!");
 reset();

    // ✅ Immediately update UI
    if (onDataAdded) onDataAdded(res.data);
   reset();

        // if (onDataAdded) onDataAdded();
    })
    .catch((err)=>{
        console.log(err);
          toast.error(err.message);
    })
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
              autoSelectFirst={false}
              options={country.filter((_,i)=>i!==0)}
            />
          </Col>
          <Col sm="4">
            <DropDown
              name="supplier"
              label="Supplier"
              errors={errors}
              control={control}
              autoSelectFirst={true}
              rules={{ required: "supplier is required" }}
              placeholder="Select supplier"
              // loading={companyLoading}
              options={supplier}
            />
          </Col>

          <Col sm="3">
            <InputText
              name="discount"
              label="Discount Cent"
              placeholder="Enter discount"
              type="number"
              register={register}
              errors={errors}
              rules={{ required: "Discount is required" }}
            />
          </Col>

          <Col sm="1">
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
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Create;
