import React, { Fragment, useState } from "react";
import {
  Col,
  Row,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  Card,
  CardBody,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import {
  optionscountry,
  optionscompany,
  companyStatus,
} from "../../Forms/FormWidget/FormSelect2/OptionDatas";
import DatePicker from "react-datepicker";
import Select from "react-select";
import HeaderCard from "../../Common/Component/HeaderCard";
import { useCompany } from "../../../Hooks/Dropdowns";
const CompanyInfoForm = ({  btnTtitle, btnTtitle1,onSearch }) => {
  const {data:companyData}=useCompany()
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm();

 const onSubmit = (data) => {
const payload={
    company_id:data?.company?.value?data.company?.value:"",
    company_name:data?.company?.label?data?.company?.label:"",
    status:data.status?data?.status:"",
}
        console.log("Form Data:", data);  // ✅ This will print your inputs
                 if (onSearch) onSearch(payload);
    };
  return (
    <Fragment>
      <Form noValidate="" onSubmit={handleSubmit(onSubmit)}>
        <Row className="mt-3">
          <Col xl="4" md="6" sm="12">
            <FormGroup className="m-form__group">
              <InputGroup>
                <InputGroupText>Company</InputGroupText>
                <Controller
                  name="company"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={companyData}
                      className="form-control p-0 border-0"
                      placeholder="Select  Name"
                    />
                  )}
                />
              </InputGroup>

            
            </FormGroup>
          </Col>
          <Col xl="4" md="6" sm="12">
            <FormGroup className="m-form__group">
              <InputGroup>
                <InputGroupText>Company Status</InputGroupText>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={companyStatus}
                      className="form-control p-0 border-0"
                      placeholder="Select  Status"
                    />
                  )}
                />
              </InputGroup>

          
            </FormGroup>
          </Col>

          <Col xl="4" md="12" sm="12">
            <div className="text-end">
              <Btn
                attrBtn={{
                  color: "primary",
                  className: "m-r-15",
                  type: "submit",
                }}
              >
                {btnTtitle}
              </Btn>
              <button type="reset" onClick={reset} className="btn btn-secondary">{btnTtitle1}</button>
            </div>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};

export default CompanyInfoForm;
