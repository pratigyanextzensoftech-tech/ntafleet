import React, { Fragment, useState,useEffect } from "react";
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
  supplier,
  Customized_Supplier,
  Upload_Supplier,
} from "../../Forms/FormWidget/FormSelect2/OptionDatas";
import { supplierById } from "../../../api";
import axios from "axios";
const UploadForm = ({ title, btnTitle, type }) => {
   const[supplierData,setSupplierData]=useState([])
  
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm();
  const getParamsByType = () => {
  switch (type) {
    case "esso":
      return "6";

    case "ta-petro":
      return "3";
       case "esso-mobil":
      return "9";
       case "irving":
      return "5";
       case "ultramar":
      return "10";
    default:
      return "4"; // no type → hit default API
  }
};
useEffect(() => {
  const params = getParamsByType();


  axios
    .get(`${supplierById}/${params}`)
    .then((res) => {
      const formatted = res.data.map((s) => ({
        value: s.id,
        label: s.supplier_name,
      }));

      setSupplierData(formatted);

      // ⭐ Automatically set default supplier based on type
      if (type === "esso") {
        setValue("supplier", formatted[0]); // pick first data
      } else if (type === "ta-petro") {
        setValue("supplier",  formatted[0]);
      }  else  if(type=="esso-mobil"){
        setValue("supplier", formatted[0]); // no default for no-type
      }
      else if(type=='irving'){
                setValue("supplier", formatted[0]); // no default for no-type
      }
      else if(type=='ultramar'){
                        setValue("supplier", formatted[0]); // no default for no-type

      }
      else{
             setValue("supplier",formatted[0] ); // no default for no-type

      }
    })
    .catch((err) => console.log(err));
}, [type, setValue]);

  const onSubmit = (data) => {
    console.log("Form Data:", data); // ✅ This will print your inputs
    // alert("Form submitted successfully!");
  };
  return (
    <Fragment>
      <Row>
        <Col>
          <fieldset>
            <legend>{title}</legend>
            <Form noValidate="" onSubmit={handleSubmit(onSubmit)}>
              <Row className="mt-3">
                <Col sm="4">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>Supplier</InputGroupText>
                      <Controller
                                           name="supplier"
                                           rules={{ required: "supplier is required" }}
                   
                                           control={control}
                                           render={({ field }) => (
                                             <Select
                                               {...field}
                                               options={
                                                 supplierData
                                               }
                                               className="form-control p-0 border-0"
                                               placeholder="Select supplier"
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
                <Col sm="4" className="px-0">
                  <Row>
                    <Col className="pe-0" sm="3">
                      {" "}
                      <InputGroupText>File</InputGroupText>
                    </Col>
                    <Col className="px-0" sm="9">
                      <Input
                        style={{ border: "1px solid #ccc" }}
                        className="form-control w-100c "
                        type="file"
                      />
                    </Col>
                  </Row>
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
          </fieldset>
        </Col>
      </Row>
    </Fragment>
  );
};

export default UploadForm;
