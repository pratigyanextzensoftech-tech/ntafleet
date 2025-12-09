import React, { useState,useEffect } from "react";
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
import axios from "axios";
import { toast } from "react-toastify";
import { discount_list as APINAME } from "../../../api"; // ✅ Your API endpoint
import { useCountry } from "../../../Hooks/Dropdowns";
import { supplierById } from "../../../api";
const ViewForm = ({ title, btnTitle, btnTitle1,onSearch }) => {
  const { companies: companyOptions, loading: companyLoading } = useCompany();
  const {data:country}=useCountry()
    const[supplierData,setSupplierData]=useState([])
  
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
      .get(`${supplierById}/1,5,4`)
      .then((res) => {
        const formatted = res.data.map((s) => ({
          value: s.id,
          label: s.supplier_name,
        }));
  
        setSupplierData(formatted);
          setValue("supplier", null); // no default for no-type
      })
      .catch((err) => console.log(err));
  }, [ setValue]);
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
      company_id:formData?.company?.value?formData?.company.value:"",
      company_name:formData?.company?.label?formData?.company?.label:"",
   end_date: formatDate(formData.endDate),
    start_date:formatDate(formData.startDate),
    country:formData?.country?.label?formData?.country?.label:"",
supplier_id:formData?.supplier?.value?formData?.supplier?.value:"",
supplier_name:formData?.supplier?.label?formData?.supplier?.label:"",
discount_amt_us:formData?.discount?formData?.discount:"",
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
     if (onSearch) onSearch(payload);
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
             
            />
          </Col>
          <Col sm="4">
            <DatePickerInput
              name="endDate"
              control={control} // ✅ make sure this is passed
              label="End Date"
              placeholder="Select end date" // ✅ fixed spelling
             
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col sm="4">
            <DropDown
              name="country"
              label="Country"
              control={control}
              setValue={setValue}
            
              placeholder="Select Country"
              // loading={companyLoading}
              options={country}

/>
          </Col>
          <Col sm="4">
            <DropDown
              name="supplier"
              label="Supplier"
              control={control}
              setValue={setValue}
              placeholder="Select supplier"
              // loading={companyLoading}
              options={supplierData}
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
              <button type="button" onClick={reset} className="btn btn-secondary">{btnTitle1}</button>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ViewForm;
