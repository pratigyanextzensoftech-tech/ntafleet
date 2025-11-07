import React, { useState } from "react";
import Select from "react-select";

import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupText,
  Card,
  CardBody,
} from "reactstrap";
import { esso_rack } from "../../../api";

import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import InputText from "../../Forms/FormControl/formInput/InputText";
import { toast } from "react-toastify";
import axios from "axios";
const DownloadEssoCentForm = ({ btnTitle,handleAdd }) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [showMessage, setShowMessage] = useState(true);

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm();

const onSubmit = async (formData) => {
  console.log(formData)
  const payload={
    name:formData.name,
    val:formData.value,
    rack:formData.ord,
    ord:formData.rack
  }
   try {
     
        const res = await axios.post(esso_rack, payload);
        console.log("✅ User Added:", res.data);
        toast.success("User added successfully!");
  
       
      }
  
    
    catch (error) {
      console.error("❌ Error submitting form:", error);
      toast.error("Something went wrong!");
    }
    handleAdd(formData)


};
  return (
    <fieldset className="inputField">
      <Form noValidate="" onSubmit={handleSubmit(onSubmit)}>
        <Row className="mt-3">
          <Col sm="3">
            <InputText
              name="name"
              label="Name"
              type="text"
              register={register}
              errors={errors}
              rules={{ required: "Name is required" }}
            />
          </Col>

          <Col sm="2">
            <InputText
              name="value"
              label="Value"
              type="text"
              register={register}
              errors={errors}
              rules={{ required: "Required" }}
            />
          </Col>

          <Col sm="2">
            <InputText
              name="ord"
              label="Ord"
              type="text"
              register={register}
              errors={errors}
              rules={{ required: "Required" }}
            />
          </Col>
         
          <Col sm="2">
            <InputText
              name="rack"
              label="Rack"
              type="text"
              register={register}
              errors={errors}
              rules={{ required: "Required" }}
            />
          </Col>
          <Col sm="2">
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
    </fieldset>
  );
};

export default DownloadEssoCentForm;
