import React, { Fragment, useEffect, useState } from "react";
import Select from "react-select";
import {
  optionscountry,
  invoiceType,
  InvoiceCategory,
  InvoiceShow,
} from "../Forms/FormWidget/FormSelect2/OptionDatas";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { Btn } from "../../AbstractElements";
import useSupplier from "../../Hooks/useSupplier";
import useCompany from "../../Hooks/useCompany";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";

const ViewInvoiceForm = ({ title,onSearch  }) => {
  const { supplier } = useSupplier();
  const { companies } = useCompany();

  const [selectedValues, setSelectedValues] = useState([]);
  const [selectAll, setSelectAll] = useState(true);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ✅ When suppliers load, mark all as checked by default
  useEffect(() => {
    if (supplier.length > 0) {
      setSelectedValues(supplier.map((item) => item.value));
    }
  }, [supplier]);

  // ✅ Handle individual checkbox change
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    setSelectedValues((prev) => {
      if (checked) {
        const newSelected = [...prev, value];
        if (newSelected.length === supplier.length) {
          setSelectAll(true);
        }
        return newSelected;
      } else {
        setSelectAll(false);
        return prev.filter((item) => item !== value);
      }
    });
  };

  // ✅ Handle "Select All" checkbox
  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    if (checked) {
      setSelectedValues(supplier.map((item) => item.value));
    } else {
      setSelectedValues([]);
    }
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    console.log("Selected Suppliers:", selectedValues);
     if (onSearch) onSearch({ ...data, suppliers: selectedValues });
    // here you can trigger API call and show table data
  };

  const handleReset = () => {
    reset();
    setSelectedValues(supplier.map((item) => item.value));
    setSelectAll(true);
  };

  return (
    <Fragment>
      <Form  noValidate onSubmit={handleSubmit(onSubmit)}>
        <fieldset  className="inputField mt-3">
          <legend className="legend ">
            <div className="d-flex align-items-center gap-2">
              Choose Supplier
              <div className="checkbox checkbox-dark ms-3">
                <input
                  id="selectAll"
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
                <Label for="selectAll" className="ms-1">
                  Select All
                </Label>
              </div>
            </div>
          </legend>

          <Row>
            {supplier.map((item, index) => (
              <Col sm="3" key={index}>
                <div className="checkbox checkbox-dark">
                  <input
                    id={`checkbox-${index}`}
                    type="checkbox"
                    value={item.value}
                    checked={selectedValues.includes(item.value)}
                    onChange={handleCheckboxChange}
                  />
                  <Label for={`checkbox-${index}`} className="ms-2">
                    {item.label}
                  </Label>
                </div>
              </Col>
            ))}
          </Row>

          {/* ✅ Rest of your form remains unchanged */}
          <Row className="mt-3">
            <Col sm="3">
              <FormGroup>
                <InputGroup>
                  <InputGroupText>From</InputGroupText>
                  <Controller
                    name="from"
                    control={control}
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                      <DatePicker
                        className="form-control"
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                      />
                    )}
                  />
                </InputGroup>
                {errors.from && (
                  <span className="text-danger">{errors.from.message}</span>
                )}
              </FormGroup>
            </Col>

            <Col sm="3">
              <FormGroup>
                <InputGroup>
                  <InputGroupText>To</InputGroupText>
                  <Controller
                    name="to"
                    control={control}
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                      <DatePicker
                        className="form-control"
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                      />
                    )}
                  />
                </InputGroup>
                {errors.to && (
                  <span className="text-danger">{errors.to.message}</span>
                )}
              </FormGroup>
            </Col>

            <Col sm="3">
              <FormGroup>
                <InputGroup>
                  <InputGroupText>Company</InputGroupText>
                  <Controller
                    name="company"
                    control={control}
                    rules={{ required: "Company Name is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={companies}
                        className="form-control p-0 border-0"
                        placeholder="Select Company"
                      />
                    )}
                  />
                </InputGroup>
                {errors.company && (
                  <span className="text-danger">{errors.company.message}</span>
                )}
              </FormGroup>
            </Col>

            <Col sm="3">
              <FormGroup>
                <InputGroup>
                  <InputGroupText>Country</InputGroupText>
                  <Controller
                    name="country"
                    control={control}
                    rules={{ required: "Country is required" }}
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
                  <span className="text-danger">{errors.country.message}</span>
                )}
              </FormGroup>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col sm="3">
              <FormGroup>
                <InputGroup>
                  <InputGroupText>Invoice Type</InputGroupText>
                  <Controller
                    name="invoiceType"
                    control={control}
                    rules={{ required: "Invoice Type is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={invoiceType}
                        className="form-control p-0 border-0"
                      />
                    )}
                  />
                </InputGroup>
              </FormGroup>
            </Col>

            <Col sm="3">
              <FormGroup>
                <InputGroup>
                  <InputGroupText>Invoice Category</InputGroupText>
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={InvoiceCategory}
                        className="form-control p-0 border-0"
                      />
                    )}
                  />
                </InputGroup>
              </FormGroup>
            </Col>

            <Col sm="3">
              <FormGroup>
                <InputGroup>
                  <InputGroupText>Invoice (Show/Hide)</InputGroupText>
                  <Controller
                    name="invoiceShow"
                    control={control}
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={InvoiceShow}
                        className="form-control p-0 border-0"
                      />
                    )}
                  />
                </InputGroup>
              </FormGroup>
            </Col>

            <Col sm="3" className="text-end">
              <Btn
                attrBtn={{
                  color: "primary",
                  className: "m-r-15",
                  type: "submit",
                }}
              >
                Search Data
              </Btn>
              <button
                type="button"
                className="m-r-15 btn btn-primary"
                onClick={handleReset}
              >
                Reset
              </button>
            </Col>
          </Row>
        </fieldset>
      </Form>
    </Fragment>
  );
};

export default ViewInvoiceForm;
