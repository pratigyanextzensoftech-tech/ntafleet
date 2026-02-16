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
import DropDown from "../../Forms/FormControl/formInput/DropDown";
import {
  useCompany,
  useItems,
  formatDate,
  useSupplierAll,
} from "../../../Hooks/Dropdowns";

const ViewForm = ({ btnTitle, btnTitle1, onSearch }) => {
  const [selectedValues, setSelectedValues] = useState([]);

  const { data: companyOptions } = useCompany();
  const { data: items } = useItems();
  const { data: supplier } = useSupplierAll();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      from: null,
      to: null,
      state_prov: "",
      unit: "",
      card_no: "",
      company: "",
      currency: null,
      items: null,
      status: null,
      invoice_type: null,
      supplier: [],
    },
  });

  const onSubmit = (data) => {
    const fullData = {
      supplier_id: selectedValues.join(","),
      from: data.from ? formatDate(data.from) : "",
      to: data.to ? formatDate(data.to) : "",
      state_prov: data.state_prov || "",
      unit: data.unit || "",
      card_no: data.card_no || "",
      company_id: data.company?.value || "",
      currency: data.currency?.label || "",
      item: data.items?.label || "",
      invoiced: data.status?.value || "",
      invoice_type: data.invoice_type?.value || "",
    };

    if (onSearch) onSearch(fullData);
  };

  const handleReset = () => {
    reset();
    setSelectedValues([]);
    onSearch?.({});
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* Supplier Checkboxes */}
      <Controller
        name="supplier"
        control={control}
        render={({ field }) => {
          const { onChange } = field;

          const handleSupplierChange = (e) => {
            const val = String(e.target.value);
            const checked = e.target.checked;

            // Select ALL
            if (val === "All") {
              if (checked) {
                const allValues = supplier.map((s) => String(s.value));
                setSelectedValues(allValues);
                onChange(allValues);
              } else {
                setSelectedValues([]);
                onChange([]);
              }
              return;
            }

            // Individual toggle
            setSelectedValues((prev) => {
              const updated = prev.includes(val)
                ? prev.filter((v) => v !== val)
                : [...prev, val];

              onChange(updated);
              return updated;
            });
          };

          const allSelected = selectedValues.length === supplier.length;

          return (
            <fieldset className="inputField">
              <legend>
                Choose Supplier
                <span className="ms-3">
                  <input
                    id="supplier-all"
                    type="checkbox"
                    value="All"
                    checked={allSelected}
                    onChange={handleSupplierChange}
                  />
                  <Label for="supplier-all" className="ms-1">
                    Select All
                  </Label>
                </span>
              </legend>
                                <Row  className="chk">

                {supplier.map((item, index) => (
                  <Col key={index} xxl="3"  xl="4" md="4" sm="6">
                    <div className="checkbox checkbox-dark">
                      <input
                        id={`supplier-checkbox-${index}`}
                        type="checkbox"
                        value={String(item.value)}
                        checked={selectedValues.includes(String(item.value))}
                        onChange={handleSupplierChange}
                      />
                      <Label
                        for={`supplier-checkbox-${index}`}
                        className="ms-2"
                      >
                        {item.label}
                      </Label>
                    </div>
                  </Col>
                ))}
                  </Row>

              {errors.supplier && (
                <span className="text-danger">{errors.supplier.message}</span>
              )}
            </fieldset>
          );
        }}
      />
<Row>
      {/* Row 1 */}
        <Col xxl="3"  xl="4" md="6" sm="12">
          <FormGroup>
            <InputGroup>
              <Col xs="3">
                <InputGroupText>From</InputGroupText>
              </Col>
              <Col xs="9">
                <Controller
                  name="from"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      className="form-control"
                       id="from"
                      selected={field.value}
                      onChange={field.onChange}
                      dateFormat="yyyy-MM-dd"
                    />
                  )}
                />
              </Col>
            </InputGroup>
          </FormGroup>
        </Col>

        <Col xxl="3"  xl="4" md="6" sm="12">
          <FormGroup>
            <InputGroup>
              <Col xs="3">
                <InputGroupText>To</InputGroupText>
              </Col>
              <Col xs="9">
                <Controller
                  name="to"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      className="form-control"
                      selected={field.value}
                      onChange={field.onChange}
                       id="to"
                      dateFormat="yyyy-MM-dd"
                    />
                  )}
                />
              </Col>
            </InputGroup>
          </FormGroup>
        </Col>

        <Col xxl="3"  xl="4" md="6" sm="12">
          <FormGroup>
            <InputGroup>
              <InputGroupText>State Prov</InputGroupText>
              <Controller
                name="state_prov"
                control={control}
                render={({ field }) => <Input {...field} type="text" />}
              />
            </InputGroup>
          </FormGroup>
        </Col>

        <Col xxl="3"  xl="4" md="6" sm="12">
          <FormGroup>
            <InputGroup>
              <InputGroupText>Unit</InputGroupText>
              <Controller
                name="unit"
                control={control}
                render={({ field }) => <Input {...field} type="text" />}
              />
            </InputGroup>
          </FormGroup>
        </Col>

      {/* Row 2 */}
        <Col xxl="3"  xl="4" md="6" sm="12">
          <FormGroup>
            <InputGroup>
              <InputGroupText>Card No.</InputGroupText>
              <Controller
                name="card_no"
                control={control}
                render={({ field }) => <Input {...field} type="text" />}
              />
            </InputGroup>
          </FormGroup>
        </Col>

        <Col xxl="3"  xl="4" md="6" sm="12">
          <DropDown
            name="company"
            label="Company"
            control={control}
            options={companyOptions}
          />
        </Col>

        <Col xxl="3"  xl="4" md="6" sm="12">
          <DropDown
            name="currency"
            label="Currency"
            control={control}
            options={currency}
          />
       
        </Col>

        <Col xxl="3"  xl="4" md="6" sm="12">
          <DropDown
            name="items"
            label="Items"
            control={control}
            options={items}
          />
        </Col>

      {/* Row 3 */}
        <Col xxl="3"  xl="4" md="6" sm="12">
          <DropDown
            name="status"
            label="Invoice Status"
            control={control}
            options={InvoiceStatus}
          />
        </Col>

        <Col xxl="3"  xl="4" md="6" sm="12">
          <DropDown
            name="invoice_type"
            label="Invoice Type"
            control={control}
            options={invoiceType}
          />
        </Col>

        <Col xxl="6" md="12" sm="12" className="text-end">
          <Btn attrBtn={{ color: "primary", type: "submit" }}>{btnTitle}</Btn>
          <button
            type="button"
            className="btn btn-secondary ms-2"
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
