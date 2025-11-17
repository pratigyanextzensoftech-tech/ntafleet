import React from "react";
import Select from "react-select";
import { InVoiceSupplier } from "../../Forms/FormWidget/FormSelect2/OptionDatas";

import {
  Row,
  Col,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import HeaderCard from "../../Common/Component/HeaderCard";
import InputText from "../../Forms/FormControl/formInput/InputText";
import DropDown from "../../Forms/FormControl/formInput/DropDown";
import useSupplier from "../../../Hooks/useSupplier";
import axios from 'axios';
import { toast } from "react-toastify";
import { zero_discount as APINAME } from '../../../api';
const ZeroDiscount = ({ title, btnTitle,onDataAdded }) => {
  const { supplier } = useSupplier();
 
 const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
 
 const onSubmit = (formData) => {
                        console.log("Form Data:", formData);  // ✅ This will print your inputs

     const payload = {
      state:formData.state,
      city:formData.city,
   loc_id: formData.location,
    supplier_id:formData.supplier.value,
    id:0,
    dated:new Date(),
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
    <> 
      <Form noValidate="" onSubmit={handleSubmit(onSubmit)}>
        <Row className="mt-3">
          <Col sm="3">
            <InputText
              name="state"
              label="State"
              type="text"
              register={register}
              errors={errors}
              rules={{ required: "State is required" }}
            />
          </Col>
          <Col sm="3">
            <InputText
              name="city"
              label=" City Name "
              type="text"
              register={register}
              errors={errors}
              rules={{ required: "City is required" }}
            />
          </Col>
          <Col sm="3">
            <InputText
              name="location"
              label=" Location #(6 Digit)"
              type="text"
              register={register}
              errors={errors}
              rules={{ required: "Required" }}
            />
          </Col>
          <Col sm="3">
            <DropDown
              name="supplier"
              label="Supplier"
              errors={errors}
              control={control}
              rules={{ required: "supplier is required" }}
              placeholder="Select supplier"
              // loading={companyLoading}
              options={supplier}
            />
          </Col>
        </Row>

        <Row>
          <Col sm="12">
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

export default ZeroDiscount;
