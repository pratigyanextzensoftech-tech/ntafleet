import React, { useState } from "react";
import { Row, Col, Form } from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import DropDown from "../../Forms/FormControl/formInput/DropDown";
import DatePickerInput from "../../Forms/FormControl/formInput/DatePickerInput";
import useCompany from "../../../Hooks/useCompany";

const DownloadEssoCentForm = ({ btnTitle, Data, onChange }) => {
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
      <Form noValidate="" onSubmit={handleSubmit(onSubmit)}>
        <Row className="mt-3">
          <Col sm="3">
            <DropDown
              name="company"
              label="Company"
              control={control}
              id="company_id"
              placeholder="All Company" 
              options={companyOptions}
            />
          </Col>

          <Col sm="4">
            <Row>
              <DatePickerInput
                id="start_date"
                name="fromDate"
                control={control}
                label="Pricing Form Date"
              />
            </Row>
          </Col>

          <Col sm="4">
            <Row>
              <DatePickerInput
                id="end_date"
                name="uptoDate"
                control={control}
                label="Pricing Upto Date"
              />
            </Row>
          </Col>
          <Col sm="1">
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
