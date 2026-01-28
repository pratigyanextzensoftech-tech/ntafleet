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
import { Upload_Supplier } from "../../Forms/FormWidget/FormSelect2/OptionDatas";
import HeaderCard from "../../Common/Component/HeaderCard";
import DatePicker from "react-datepicker";

const MultiDateForm = ({ title, btnTitle }) => {
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
              <Row className="mt-3">
                <Col xxl="3"  xl="4"  md="6" sm="12">
                  <Row>
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <Col xs="4">
                          <InputGroupText>From Date</InputGroupText>
                        </Col>
                        <Col xs="8">
                          <Controller
                            name="fromDate"
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

                      {errors.fromDate && (
                        <span className="text-danger">
                          {errors.fromDate.message}
                        </span>
                      )}
                    </FormGroup>
                  </Row>
                </Col>
                <Col xxl="3"  xl="4"  md="6" sm="12">
                  <Row>
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <Col xs="4">
                          <InputGroupText>To Date</InputGroupText>
                        </Col>
                        <Col xs="8">
                          <Controller
                            name="toDate"
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

                      {errors.toDate && (
                        <span className="text-danger">
                          {errors.toDate.message}
                        </span>
                      )}
                    </FormGroup>
                  </Row>
                </Col>
                <Col xxl="3"  xl="4"  md="6" sm="12">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>Supplier</InputGroupText>
                      <Controller
                        name="supplier"
                        control={control}
                        rules={{ required: "Supplier is required" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="form-control p-0 border-0"
                            placeholder="Select supplier"
                            options={Upload_Supplier}
                            onChange={(selectedOption) =>
                              field.onChange(selectedOption)
                            }
                            value={field.value}
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

                <Col className="ms-auto" xxl="3"  xl="4"  md="6" sm="12">
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

export default MultiDateForm;
