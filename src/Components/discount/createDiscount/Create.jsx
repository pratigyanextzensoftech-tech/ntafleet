import React, { useState } from "react";
import Select from "react-select";

import {
  Row,
  Col,
  Form,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { useForm } from "react-hook-form";
import DatePickerInput from "../../Forms/FormControl/formInput/DatePickerInput";
import { useSupplier } from "../../../Hooks/Dropdowns";
import useCompany from "../../../Hooks/useCompany";
import DropDown from "../../Forms/FormControl/formInput/DropDown";
import InputText from "../../Forms/FormControl/formInput/InputText";
import axios from 'axios';
import { useCountry } from "../../../Hooks/Dropdowns";
import { toast } from "react-toastify";
import { discount_list as APINAME } from '../../../api';
const Create = ({ title, btnTitle,onDataAdded }) => {
  const { companies: companyOptions, loading: companyLoading } = useCompany();
  const {data: supplier } = useSupplier();
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
        <Row className="my-3">
          <Col xl="4"  md="6" sm="12">
            <DropDown
              name="company"
              label="Company"
              control={control}
              rules={{ required: "Company is required" }}
              placeholder="Select Company"
              // loading={companyLoading}
              options={companyOptions}
               menuPortalTarget={document.body}
              menuPosition="fixed"
                           styles={{

                menuPortal: base => ({

                  ...base,

                  zIndex: 99999

                })

              }}
            />
          </Col>
          <Col xl="4"  md="6" sm="12">
            <DatePickerInput
              name="startDate"
              control={control} // ✅ make sure this is passed
              label="Start Date"
              placeholder="Select start date" // ✅ fixed spelling
              errors={errors}
              required="start Date is required"
              portalId="root"
              popperPlacement="bottom-start"
            />
          </Col>
          <Col xl="4"  md="6" sm="12">
            <DatePickerInput
              name="endDate"
              control={control} // ✅ make sure this is passed
              label="End Date"
              placeholder="Select end date" // ✅ fixed spelling
              errors={errors}
              required="End Date is required"
              portalId="root"
              popperPlacement="bottom-start"
            />
          </Col>
       
          <Col xl="4"  md="6" sm="12">
            <DropDown
              name="country"
              label="Country"
              errors={errors}
              control={control}
              rules={{ required: "Country is required" }}
              placeholder="Select Country"
              // loading={companyLoading}
              autoSelectFirst={false}
              options={country}
               menuPortalTarget={document.body}

                                  menuPosition="fixed"

                                 styles={{

                menuPortal: base => ({

                  ...base,

                  zIndex: 99999

                })

              }}
              
            />
          </Col>
          <Col xl="4"  md="6" sm="12">
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
               menuPortalTarget={document.body}
                                  menuPosition="fixed"
                                 styles={{

                menuPortal: base => ({

                  ...base,

                  zIndex: 99999

                })

              }}
            />
          </Col>

          <Col xl="3"  md="6" sm="12"
          >
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

          <Col xl sm="1"  md="1">
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
