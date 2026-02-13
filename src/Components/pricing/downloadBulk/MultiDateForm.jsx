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
import DatePicker from "react-datepicker";
import { useSupplier } from "../../../Hooks/Dropdowns";
import { formatDate } from "../../../Hooks/Dropdowns";
const MultiDateForm = ({ title, btnTitle }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm();
    const {data:supplier}=useSupplier("6,3")

   
 const onSubmit = (data) => {
     const from=data.fromDate?formatDate(data.fromDate):"";
     const to=data.toDate?formatDate(data.toDate):"";
     const supplier=data.supplier?data.supplier.value:"";
  console.log(supplier,from,to)
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
                                  portalId="root"
                                popperPlacement="bottom-start"
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
                                  portalId="root"
                                popperPlacement="bottom-start"
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
                 <Col  xxl="3" xl="4"  md="6" sm="12">
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
                        options={supplier}
                        placeholder="Select supplier"
                        onChange={(selectedOption) =>
                        field.onChange(selectedOption)
                        }
                        value={field.value}
                          menuPortalTarget={document.body}
                          menuPosition="fixed"
                                 styles={{
                menuPortal: base => ({
                  ...base,
                  zIndex: 99999
                })
              }}
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
