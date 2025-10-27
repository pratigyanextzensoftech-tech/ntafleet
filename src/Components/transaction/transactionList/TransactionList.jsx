import React, { useState } from "react";
import Select from "react-select";
import {
  optionscompany,
  Upload_Supplier,
  currency,
} from "../../Forms/FormWidget/FormSelect2/OptionDatas";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
const TransactionList = ({ btnTitle, btnTitle1 }) => {
  const {
    register,

    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data); // ✅ This will print your inputs
    // alert("Form submitted successfully!");
  };

  return (
    <Form noValidate="" onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col sm="3">
          <Row>
            <FormGroup className="m-form__group">
              <InputGroup>
                <Col sm="3">
                  <InputGroupText>From</InputGroupText>
                </Col>
                <Col sm="9">
                  <Controller
                    name="from"
                    control={control}
                  
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

              {errors.from && (
                <span className="text-danger">{errors.from.message}</span>
              )}
            </FormGroup>
          </Row>
        </Col>
        <Col sm="3">
          <Row>
            <FormGroup className="m-form__group">
              <InputGroup>
                <Col sm="3">
                  <InputGroupText>To</InputGroupText>
                </Col>
                <Col sm="9">
                  <Controller
                    name="to"
                    control={control}
                  
                    render={({ field }) => (
                      <DatePicker
                        className={`form-control digits`}
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                      />
                    )}
                  />
                </Col>
              </InputGroup>

              {errors.to && (
                <span className="text-danger">{errors.to.message}</span>
              )}
            </FormGroup>
          </Row>
        </Col>
        <Col sm="3">
          <FormGroup className=" m-form__group">
            <InputGroup>
              <InputGroupText>Start Prov </InputGroupText>
              <Input className="form-control" type="text" />
            </InputGroup>
          </FormGroup>
        </Col>
        <Col sm="3">
          <FormGroup className=" m-form__group">
            <InputGroup>
              <InputGroupText>Unit </InputGroupText>
              <Input className="form-control" type="text" />
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm="3">
          <FormGroup className=" m-form__group">
            <InputGroup>
              <InputGroupText> Card No.</InputGroupText>
              <Input className="form-control" type="text" />
            </InputGroup>
          </FormGroup>
        </Col>
        <Col sm="3">
          <FormGroup className="m-form__group">
            <InputGroup>
              <InputGroupText>Company</InputGroupText>
              <Controller
                name="company"
               
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={optionscompany}
                    className="form-control p-0 border-0"
                    placeholder="Select Company Name"
                  />
                )}
              />
            </InputGroup>

            {errors.company && (
              <span className="text-danger">{errors.company?.message}</span>
            )}
          </FormGroup>
        </Col>
        <Col sm="3">
          <FormGroup className="m-form__group">
            <InputGroup>
              <InputGroupText>Currency</InputGroupText>
              <Controller
                name="currency" 
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={currency}
                    className="form-control p-0 border-0"
                    placeholder="Select Currency"
                  />
                )}
              />
            </InputGroup>  
          </FormGroup>
        </Col>
        <Col sm="3">
          <FormGroup className="m-form__group">
            <InputGroup>
              <InputGroupText>Items</InputGroupText>
              <Controller
                name="items" 
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={optionscompany}
                    className="form-control p-0 border-0"
                    placeholder="Select Items"
                  />
                )}
              />
            </InputGroup> 
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm="3">
          <FormGroup className="m-form__group">
            <InputGroup>
              <InputGroupText>Invoice Status</InputGroupText>
              <Controller
                name="status"
               
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={optionscompany}
                    className="form-control p-0 border-0"
                    placeholder="Select status"
                  />
                )}
              />
            </InputGroup> 
          </FormGroup>
        </Col>
        <Col sm="3">
          <FormGroup className="m-form__group">
            <InputGroup>
              <InputGroupText>Supplier</InputGroupText>
              <Controller
                name="supplier"
                control={control}
                rules={{ required: "Supplier is required" }}
                defaultValue={Upload_Supplier[2]}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="form-control p-0 border-0"
                    placeholder="Select supplier"
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption)
                    }
                    value={field.value}
                  />
                )}
              />
            </InputGroup>

            {errors.supplier && (
              <span className="text-danger">{errors.supplier?.message}</span>
            )}
          </FormGroup>
        </Col>
        <Col sm="6">
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
            <button className="btn btn-secondary">{btnTitle1}</button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default TransactionList;
