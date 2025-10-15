import React, { useState } from "react";
import Select from "react-select";
import {
  chooseSupplierCheckBox,
  InvoiceStatus,
  invoiceType,
  currency,
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
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import ItemsDropDown from "../../Forms/FormControl/formInput/ItemsDropDown";
import CompanyDropDown from "../../Forms/FormControl/formInput/CompanyDropDown";

const ViewForm = ({ btnTitle, btnTitle1, onSearch }) => {
  const [selectedValues, setSelectedValues] = useState([]);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      from: null,
      to: null,
      startProv: "",
      unit: "",
      cardNo: "",
      company: null,
      currency: null,
      items: null,
      status: null,
      type: null,
    },
  });

  const onSubmit = (data) => {
    const fullData = {
      ...data,
      suppliers: selectedValues,
      company: data.company?.label || "",
      currency: data.currency?.label || "",
      items: data.items?.label || "",
      status: data.status?.label || "",
      type: data.type?.label || "",
      from: data.from ? data.from.toISOString().split("T")[0] : "",
      to: data.to ? data.to.toISOString().split("T")[0] : "",
    };

    console.log("✅ Full Form Data:", fullData);
    if (onSearch) onSearch(fullData); // ✅ trigger parent to refresh table
  };

  const handleReset = () => {
    reset();
    setSelectedValues([]);
    if (onSearch) onSearch({}); // ✅ reload all data
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedValues((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* ✅ Supplier Checkboxes */}
      <fieldset className="inputField my-3 py-3">
        <legend className="legend">Choose Supplier Check All</legend>
        <Row>
          {chooseSupplierCheckBox.map((item, index) => (
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
      </fieldset>

      {/* ✅ Row 1: Dates + StartProv + Unit */}
      <Row>
        <Col sm="3">
          <FormGroup>
            <InputGroup>
              <InputGroupText>From</InputGroupText>
              <Controller
                name="from"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    className="form-control"
                    selected={field.value}
                    onChange={field.onChange}
                    dateFormat="yyyy-MM-dd"
                  />
                )}
              />
            </InputGroup>
          </FormGroup>
        </Col>

        <Col sm="3">
          <FormGroup>
            <InputGroup>
              <InputGroupText>To</InputGroupText>
              <Controller
                name="to"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    className="form-control"
                    selected={field.value}
                    onChange={field.onChange}
                    dateFormat="yyyy-MM-dd"
                  />
                )}
              />
            </InputGroup>
          </FormGroup>
        </Col>

        <Col sm="3">
          <FormGroup>
            <InputGroup>
              <InputGroupText>State Prov</InputGroupText>
              <Controller
                name="startProv"
                control={control}
                render={({ field }) => (
                  <Input {...field} type="text" className="form-control" />
                )}
              />
            </InputGroup>
          </FormGroup>
        </Col>

        <Col sm="3">
          <FormGroup>
            <InputGroup>
              <InputGroupText>Unit</InputGroupText>
              <Controller
                name="unit"
                control={control}
                render={({ field }) => (
                  <Input {...field} type="text" className="form-control" />
                )}
              />
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>

      {/* ✅ Row 2: Card No, Company, Currency, Items */}
      <Row>
        <Col sm="3">
          <FormGroup>
            <InputGroup>
              <InputGroupText>Card No.</InputGroupText>
              <Controller
                name="cardNo"
                control={control}
                render={({ field }) => (
                  <Input {...field} type="text" className="form-control" />
                )}
              />
            </InputGroup>
          </FormGroup>
        </Col>

        <Col sm="3">
          <CompanyDropDown name="company" control={control} />
        </Col>

        <Col sm="3">
          <FormGroup>
            <InputGroup>
              <InputGroupText>Currency</InputGroupText>
              <Controller
                name="currency"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={currency}
                    placeholder="Select Currency"
                    className="form-control p-0 border-0"
                    onChange={(val) => field.onChange(val)}
                  />
                )}
              />
            </InputGroup>
          </FormGroup>
        </Col>

        <Col sm="3">
          <ItemsDropDown name="items" control={control} />
        </Col>
      </Row>

      {/* ✅ Row 3: Status, Type, and Buttons */}
      <Row>
        <Col sm="3">
          <FormGroup>
            <InputGroup>
              <InputGroupText>Invoice Status</InputGroupText>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={InvoiceStatus}
                    placeholder="Select Status"
                    className="form-control p-0 border-0"
                    onChange={(val) => field.onChange(val)}
                  />
                )}
              />
            </InputGroup>
          </FormGroup>
        </Col>

        <Col sm="3">
          <FormGroup>
            <InputGroup>
              <InputGroupText>Invoice Type</InputGroupText>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={invoiceType}
                    placeholder="Select Type"
                    className="form-control p-0 border-0"
                    onChange={(val) => field.onChange(val)}
                  />
                )}
              />
            </InputGroup>
          </FormGroup>
        </Col>

        <Col sm="6" className="text-end">
          <Btn
            attrBtn={{ color: "primary", type: "submit", className: "m-r-15" }}
          >
            {btnTitle}
          </Btn>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
          >
            {btnTitle1}
          </button>
        </Col>
      </Row>
    </Form>
  );
};

export default ViewForm;
