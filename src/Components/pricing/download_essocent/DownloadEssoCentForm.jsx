import React, { useState } from "react";
import { Row, Col, Form } from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import DropDown from "../../Forms/FormControl/formInput/DropDown";
import DatePickerInput from "../../Forms/FormControl/formInput/DatePickerInput";
import useCompany from "../../../Hooks/useCompany";

const DownloadEssoCentForm = ({ btnTitle, Data, onChange,title }) => {
  const [selectedValues, setSelectedValues] = useState([]);
  // const [showMessage, setShowMessage] = useState(true);
  const { companies: companyOptions, loading: companyLoading } = useCompany();
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm();

  const onSubmit = (data) => {
    const payload = {
      company_id: data.company ? data.company.value : "",
      from_date: data.fromDate
        ? new Date(data.fromDate).toISOString().split("T")[0]
        : "",
      upto_date: data.uptoDate
        ? new Date(data.uptoDate).toISOString().split("T")[0]
        : "",
    };
    onChange(payload.company_id, payload.from_date, payload.upto_date);

  };
  return (
    <fieldset className="inputField">
        <legend>{title}</legend>
      <Form noValidate="" onSubmit={handleSubmit(onSubmit)}>
        <Row className="mt-3">
          <Col  xl="4"   sm="12">
            <DropDown
              name="company"
              label="Company"
              control={control}
              id="company_id"
              placeholder="All Company" 
              options={companyOptions}
            />
          </Col>

          <Col   xl="4"   sm="12">
            <Row>
              <DatePickerInput
                id="start_date"
                name="fromDate"
                control={control}
                label="Pricing Form Date"
              />
            </Row>
          </Col>

          <Col   xl="4"   sm="12">
            <Row>
              <DatePickerInput
                id="end_date"
                name="uptoDate"
                control={control}
                label="Pricing Upto Date"
              />
            </Row>
          </Col>
          <Col className="ms-auto"  xl="4"   sm="12">
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
