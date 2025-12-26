import React, { useState } from "react";
import Select from "react-select";
import {
  optionscompany,
  discountSheetCheckBox,
} from "../../Forms/FormWidget/FormSelect2/OptionDatas";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import HeaderCard from "../../Common/Component/HeaderCard";
import DropDown from "../../Forms/FormControl/formInput/DropDown";
import DatePickerInput from "../../Forms/FormControl/formInput/DatePickerInput";
import useCompany from "../../../Hooks/useCompany";
import InputText from "../../Forms/FormControl/formInput/InputText";
import axios from 'axios';
import { toast } from "react-toastify";
import { discount_sheet as APINAME } from '../../../api';
const DiscountSheet = ({ title, btnTitle, onDataAdded}) => {
  const [selectedValues, setSelectedValues] = useState([]);
  
  const { companies: companyOptions, loading: companyLoading } = useCompany();

  const {
    register,
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
      defaultValues: {
    flying_j: 0,
    petro: 0,
    ta_petro: 0,
    esso: 0,
  }
  });
const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
  };
   const onSubmit = (formData) => {

     const payload = {
      company_id:formData.company.value,
      company_name:formData.company.label,
      start_date:formatDate(formData.startDate),
      end_date:formatDate(formData.endDate),
      es_disc_ca_usd:formData.discountCanada,
      f_disc_ca_usd:formData.discountUSA,
   f_disc_ca_cad: formData.Flyingdiscount,
   p_disc_ca_usd: formData.Petrodiscount,
   ta_disc_us_usd: formData.TaPetrodiscount,
   f_usa_cent:0,
   f_canada_cent:0,
   p_canada_cent:0,
   ta_usa_cent:0,
   ta_usa_cent:0,
   es_canada_cent:0,
   ta_petro:formData.ta_petro ? 1: 0,
   esso:formData.esso ? 1 : 0,
   petro:formData.petro ? 1 : 0,
  flying_j:formData.flying_j ? 1 : 0,
   retail_total_usd:0,
   retail_total_cad:0,
   total_usd:0,
  total_cad:0,
  litres:0,
  gallons:0,
  discount_usd:0,
  discount_cad:0,
  tr_count_ca:0,
  tr_count_usa:0,
  f_retail_us_usd:0,
  f_total_us_usd:0,
  f_retail_us_cad:0,
  f_total_us_cad:0,
  f_disc_us_usd:0,
  f_disc_us_cad:0,
  f_us_litres:0,
  f_us_gallons:0,
  f_us_tr_count:0,
  f_retail_ca_usd:0,
  f_total_ca_usd:0,
  f_retail_ca_cad:0,
  f_total_ca_cad:0,
  f_ca_litres:0,
  f_ca_gallons:0,
  f_ca_tr_count:0,
  p_retail_ca_usd:0,
  p_retail_ca_usd:0,
  p_total_ca_usd:0,
  p_retail_ca_cad:0,
  p_total_ca_cad:0,
  p_disc_ca_cad:0,
  p_ca_litres:0,
  p_ca_gallons:0,
  p_ca_tr_count:0,
  ta_retail_us_usd:0,
  ta_total_us_usd:0,
  ta_retail_us_cad:0,
  ta_total_us_cad:0,
  ta_disc_us_cad:0,
  ta_us_litres:0,
  ta_us_gallons:0,
  ta_us_tr_count:0,
  es_retail_ca_usd:0,
  es_total_ca_usd:0,
  es_retail_ca_cad:0,
  es_retail_ca_cad:0,
  es_total_ca_cad:0,
  es_disc_ca_cad:0,
  es_ca_litres:0,
  es_ca_gallons:0,
  es_ca_tr_count:0,
    id:0,
    dated:new Date(),
// added_on:new Date(),
idby:localStorage.getItem("userId")
     }
     console.log(payload);
     
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

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    setSelectedValues((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((item) => item !== value);
      }
    });
  };

  return (
    <>
      
      <Form noValidate="" onSubmit={handleSubmit(onSubmit)}>
        <Row className="mt-3">
          <Col sm="3">
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
          <Col sm="3">
            <DatePickerInput
              name="startDate"
              control={control} // ✅ make sure this is passed
              label="Start Date"
              placeholder="Select start date" // ✅ fixed spelling
              errors={errors}
              required="start Date is required"
            />
          </Col>
          <Col sm="3">
            <DatePickerInput
              name="endDate"
              control={control} // ✅ make sure this is passed
              label="End Date"
              placeholder="Select end date" // ✅ fixed spelling
              errors={errors}
              required="End Date is required"
            />
          </Col>

          <Col sm="3">
            <InputText
              name="discountCanada"
              label="ESSO Discount Cent (Canada)"
              type="number"
              register={register}
              errors={errors}
              rules={{ required: "Esso Discount is required" }}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col sm="3">
            <InputText
              name="discountUSA"
              label="Flying J Discount Cent (USA) "
              type="text"
              register={register}
              errors={errors}
              rules={{ required: " Required" }}
            />
          </Col>

          <Col sm="3">
            <InputText
              name="Flyingdiscount"
              label=" Flying J Discount Cent (Canada) "
              type="text"
              register={register}
              errors={errors}
              rules={{ required: " Required" }}
            />
          </Col>
          <Col sm="3">
            <InputText
              name="Petrodiscount"
              label=" Petro Discount Cent (Canada)  "
              placeholder=" "
              type="text"
              register={register}
              errors={errors}
              rules={{ required: " Required" }}
            />
          </Col>
          <Col sm="3">
            <InputText
              name="TaPetrodiscount"
              label=" Ta-Petro & Love Discount Cent (USA)  "
              placeholder=" "
              type="text"
              register={register}
              errors={errors}
              rules={{ required: " Required" }}
            />
          </Col>
        </Row>
        <Row>
   <Col sm="2">
  <div >
   <input type="checkbox" {...register("flying_j")} />
<Label className="ms-2">Exclude Flying J</Label>

  </div>
</Col>

<Col sm="2">
  <div>
    <input
      type="checkbox"
      {...register("petro")}
      
    />
    <Label className="ms-2">Exclude Petro</Label>
  </div>
</Col>

<Col sm="2">
  <div >
    <input
      type="checkbox"
      {...register("ta_petro")}
    />
    <Label className="ms-2">Exclude Ta-Petro & Love</Label>
  </div>
</Col>

<Col sm="2">
  <div >
    <input
      type="checkbox"
      {...register("esso")}
    />
    <Label className="ms-2">Exclude ESSO</Label>
  </div>
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
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default DiscountSheet;
