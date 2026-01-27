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
import {useCountry} from '../../../Hooks/Dropdowns'
import { supplierById } from "../../../api";

const EfsTransaction = ({ title, btnTitle, type }) => {
  const {data:country }=useCountry()
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm();
 useEffect(() => {
    if (!country || country.length === 0) return;
      // Clear value if normal dropdown
   setValue("country", country[2]);   
  }, [type, country]);
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
              <Row className="my-3">
                <Col xl="4"   md="6" sm="12">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>Country</InputGroupText>
                      <Controller
                        name="country"
                        rules={{ required: "country is required" }}
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={country}
                            className="form-control p-0 border-0"
                            placeholder="Select Country"
                          />
                        )}
                      />
                    </InputGroup>

                    {errors.country && (
                      <span className="text-danger">
                        {errors.country?.message}
                      </span>
                    )}
                  </FormGroup>
                </Col>
                      <Col xl="4" md="6" sm="12">
             <FormGroup>
               <InputGroup>
                 <InputGroupText>File</InputGroupText>
                 <Input
                   type="file"
                   className="form-control"
                   style={{ border: "1px solid #ccc" }}
                 />
               </InputGroup>
             </FormGroup>
           </Col>
                <Col xl="4"   md="12" sm="12">
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

export default EfsTransaction;
