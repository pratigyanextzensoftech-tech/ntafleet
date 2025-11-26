import React, { Fragment, useState } from "react";
import {
  Col,
  Row,
  Form,
  FormGroup,
  Container,
  Card,CardBody,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import {
  pricigSupplier,
  optionscompany,
} from "../../Forms/FormWidget/FormSelect2/OptionDatas";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { tableColumns,dummytabledata } from "../../../Data/Table/Defaultdata";
import DatePicker from "react-datepicker";
import { useCompany } from "../../../Hooks/Dropdowns";

const RackCentList = ({ title, btnTitle }) => {
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
                    <Col sm="3">
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
                  <Col sm="3">
                    <Row>
                      <FormGroup className="m-form__group">
                        <InputGroup>
                          <Col sm="3">
                            <InputGroupText>Pricing from Date</InputGroupText>
                          </Col>
                          <Col sm="9">
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
                  <Col sm="3">
                    <Row>
                      <FormGroup className="m-form__group">
                        <InputGroup>
                          <Col sm="3">
                            <InputGroupText>Pricing Upto Date</InputGroupText>
                          </Col>
                          <Col sm="9">
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

                  <Col sm="3">
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
  <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
 <DataTableComponent
          title="Pricing PDF List "
          tableData={dummytabledata}
          tableColumns={tableColumns}
        />
              </CardBody>
              </Card></Col>
              </Row ></Container>

    </Fragment>
  );
};

export default RackCentList;
