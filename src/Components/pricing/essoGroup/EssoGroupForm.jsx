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
import {
  DiscountType,
  optionscompany,
} from "../../Forms/FormWidget/FormSelect2/OptionDatas";
import HeaderCard from "../../Common/Component/HeaderCard";
import DatePicker from "react-datepicker";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { dummytabledata, tableColumns } from "../../../Data/Table/Defaultdata";
import { useCompany } from "../../../Hooks/Dropdowns";
const EssoGroupForm = ({ title, btnTitle, tabletitle }) => {
  const {data:company}=useCompany()
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
                <Col  xxl="3" xl="4"  md="6" sm="12">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>Company</InputGroupText>
                      <Controller
                        name="company"
                        control={control}
                        rules={{ required: "company is required" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={company}
                            className="form-control p-0 border-0"
                            placeholder="Select a country"
                          />
                        )}
                      />
                    </InputGroup>

                    {errors.company && (
                      <span className="text-danger">
                        {errors.company.message}
                      </span>
                    )}
                  </FormGroup>
                </Col>

                <Col  xxl="3" xl="4"  md="6" sm="12">
                  <Row>
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <Col  xs="5">
                          <InputGroupText>Pricing from Date</InputGroupText>
                        </Col>
                        <Col xs="7">
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
                <Col  xxl="3" xl="4"  md="6" sm="12">
                  <Row>
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <Col xs="5">
                          <InputGroupText>Pricing Upto Date</InputGroupText>
                        </Col>
                        <Col xs="7">
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

                <Col className="ms-auto"  xxl="3" xl="4"  md="6" sm="12">
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
      <DataTableComponent
        title={tabletitle}
        tableData={dummytabledata}
        tableColumns={tableColumns}
      />
    </Fragment>
  );
};

export default EssoGroupForm;
