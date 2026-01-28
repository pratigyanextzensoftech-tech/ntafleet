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
import { supplier } from "../../Forms/FormWidget/FormSelect2/OptionDatas";
import HeaderCard from "../../Common/Component/HeaderCard";
import DatePicker from "react-datepicker";
const UploadEssoGroupRackForm = ({ title, btnTitle }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm();

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
            <Form
              className="px-2"
              noValidate=""
              onSubmit={handleSubmit(onSubmit)}
            >
              <Row className="mt-3 ">
                <Col xl="4"  md="6" sm="12">
               <Row>
                    <FormGroup className="m-form__group">      
                      <InputGroup>
                        <Col xs="4">
                          <InputGroupText>Pricing Date</InputGroupText>
                        </Col>
                        <Col xs="8">
                          <Controller
                            name="pricingDate"
                            control={control}
                            rules={{ required: " Required" }}
                            render={({ field }) => (
                              <DatePicker
                                className={`form-control `}
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
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
                  <Col  xl="4"  md="6" sm="12">
                                    <Row className='mb-3'>
                                      <Col xs="3" className="pe-0">
                                        <InputGroupText>CSV File</InputGroupText>
                                      </Col>
                
                                      <Col xs="9" className="px-0">
                                        <Input
                                          style={{ border: "1px solid #ccc" }}
                                          className="form-control"
                                          type="file"
                                          {...register("csvFile")}
                                        />
                                      </Col>
                                    </Row>
                                  </Col>

                <Col className="ms-auto"  xl="4"  md="6" sm="12">
                  <div className="text-end">
                    <Btn
                      attrBtn={{
                        color: "primary",
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

export default UploadEssoGroupRackForm;
