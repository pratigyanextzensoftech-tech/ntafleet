import React, { useState } from "react";
import Select from "react-select";
import {
  chooseSupplierCheckBox,
  optionscompany,
  invoiceType,
  currency,
  customizedTypeType,
  optionscountry,
} from "../../Forms/FormWidget/FormSelect2/OptionDatas";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupText,
  Card,
  CardBody,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
const UpdateUnitForm = ({ btnTitle }) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [showMessage, setShowMessage] = useState(true);

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
    if (isValid) {
      setShowMessage(false); // hide only when form is completely valid
    }
  };
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    setSelectedValues((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((item) => item !== value);
      }
    });
  };
  return (
    <Form noValidate="" onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col sm="4">
          <FormGroup className="m-form__group">
            <InputGroup>
              <InputGroupText>Company</InputGroupText>
              <Controller
                name="company"
                rules={{ required: "company Name is required" }}
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
        <Col sm="4">
          <Row>
            <FormGroup className="m-form__group">
              <InputGroup>
                <Col sm="4">
                  <InputGroupText>Start</InputGroupText>
                </Col>
                <Col sm="8">
                  <Controller
                    name="start"
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

              {errors.start && (
                <span className="text-danger">{errors.start.message}</span>
              )}
            </FormGroup>
          </Row>
        </Col>
        <Col sm="4">
          <Row>
            <FormGroup className="m-form__group">
              <InputGroup>
                <Col sm="3">
                  <InputGroupText>End</InputGroupText>
                </Col>
                <Col sm="9">
                  <Controller
                    name="end"
                    control={control}
                    rules={{ required: "Required" }}
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

              {errors.end && (
                <span className="text-danger">{errors.end.message}</span>
              )}
            </FormGroup>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col sm="4">
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
                    options={optionscountry}
                    className="form-control p-0 border-0"
                    placeholder="Select Country"
                  />
                )}
              />
            </InputGroup>

            {errors.country && (
              <span className="text-danger">{errors.country?.message}</span>
            )}
          </FormGroup>
        </Col>

        <Col sm="4">
          <FormGroup className="m-form__group">
            <InputGroup>
              <InputGroupText>What Update </InputGroupText>
              <Controller
                name="update"
                rules={{ required: "company Name is required" }}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={customizedTypeType}
                    className="form-control p-0 border-0"
                  />
                )}
              />
            </InputGroup>
            {errors.update && (
              <span className="text-danger">{errors.update.message}</span>
            )}
          </FormGroup>
        </Col>
        <Col sm="4">
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
  );
};

export default UpdateUnitForm;
