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
import { useCountry } from "../../Hooks/Dropdowns";
import { useSupplier, formatDate } from "../../Hooks/Dropdowns";
import useCompany from "../../Hooks/useCompany";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
const ViewInvoiceForm = ({ title, onSearch }) => {
  const { data: supplier } = useSupplier("");
  const { companies } = useCompany();

  const [selectedValues, setSelectedValues] = useState([]);
  const [selectAll, setSelectAll] = useState(true);
  const { data: country } = useCountry();
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      supplier: [], // supplier default (we will populate after load)
      from: null, // date
      to: null, // date
      company: null, // react-select
      country: null, // react-select
      invoiceType: invoiceType[0] || null,
      category: InvoiceCategory[0] || null,
      invoiceShow: InvoiceShow[0] || null,
    },
  });

  useEffect(() => {
    if (supplier.length > 0) {
      setSelectedValues(supplier.map((item) => item.value));
    }
  }, [supplier]);

  const onSubmit = (data) => {
    const payload = {
      supplier_id: selectedValues.join(",") || "",
      from: data.from ? formatDate(data.from) : "",
      to: data.to ? formatDate(data.to) : "",
      company_id: data?.company?.value || "",
      country: data?.country?.label || "",
      invoice_type: data?.invoiceType?.value || "",
      invcat: data?.category?.value || "",
      show_hide: data?.invoiceShow?.value ? data?.invoiceShow?.value : "",
    };
    console.log("payload:", payload);
    console.log("Selected Suppliers:", selectedValues);
    if (onSearch) onSearch(payload);
    // here you can trigger API call and show table data
  };

  const handleReset = () => {
    reset();
    setSelectedValues(supplier.map((item) => item.value));
    setSelectAll(true);
  };

  return (
    <Fragment>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xs="12">
            <Controller
              name="supplier"
              control={control}
              render={({ field }) => {
                const { onChange } = field;

                const handleSupplierChange = (e) => {
                  const val = Number(e.target.value);
                  const checked = e.target.checked;

                  // Select ALL
                  if (val === 0) {
                    if (checked) {
                      const allValues = supplier.map((s) => s.value);
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
                          value={0}
                          checked={allSelected}
                          onChange={handleSupplierChange}
                        />
                        <Label for="supplier-all" className="ms-1">
                          Select All
                        </Label>
                      </span>
                    </legend>

                    <Row className="chk">
                      {supplier.map((item, index) => (
                        <Col key={index} xxl="3" xl="4" md="6" sm="12">
                          <div className="checkbox checkbox-dark">
                            <input
                              id={`supplier-checkbox-${index}`}
                              type="checkbox"
                              value={item.value}
                              checked={selectedValues.includes(item.value)}
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
                      <span className="text-danger">
                        {errors.supplier.message}
                      </span>
                    )}
                  </fieldset>
                );
              }}
            />
          </Col>

          <Col xxl="3" xl="4" md="6" sm="12">
            <Row>
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
                          portalId="root"
                          popperPlacement="bottom-start"
                        />
                      )}
                    />
                  </Col>
                </InputGroup>
              </FormGroup>
            </Row>
          </Col>
          <Col xxl="3" xl="4" md="6" sm="12">
            <Row>
              <FormGroup className="m-form__group">
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
                          className={`form-control digits`}
                          selected={field.value}
                          onChange={(date) => field.onChange(date)}
                          dateFormat="yyyy-MM-dd"
                          id="to"
                          portalId="root"
                          popperPlacement="bottom-start"
                        />
                      )}
                    />
                  </Col>
                </InputGroup>
              </FormGroup>
            </Row>
          </Col>

          <Col xxl="3" xl="4" md="6" sm="12">
            <FormGroup>
              <InputGroup>
                <InputGroupText>Company</InputGroupText>
                <Controller
                  name="company"
                  id="company_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={companies}
                      className="form-control p-0 border-0"
                      
                      placeholder="Select Company"
                      menuPortalTarget={document.body}
                      menuPosition="fixed"
                      styles={{
                        menuPortal: (base) => ({
                          ...base,
                          zIndex: 99999,
                        }),
                      }}
                    />
                  )}
                />
              </InputGroup>
            </FormGroup>
          </Col>

          <Col xxl="3" xl="4" md="6" sm="12">
            <FormGroup>
              <InputGroup>
                <InputGroupText>Country</InputGroupText>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={country}
                      className="form-control p-0 border-0"
                       id="country"
                      placeholder="Select Country"
                      menuPortalTarget={document.body}
                      menuPosition="fixed"
                      styles={{
                        menuPortal: (base) => ({
                          ...base,
                          zIndex: 99999,
                        }),
                      }}
                    />
                  )}
                />
              </InputGroup>
            </FormGroup>
          </Col>

          <Col xxl="3" xl="4" md="6" sm="12">
            <FormGroup>
              <InputGroup>
                <InputGroupText>Invoice Type</InputGroupText>
                <Controller
                  name="invoiceType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={invoiceType}
                      className="form-control p-0 border-0"
                       id="invoice_type"
                      menuPortalTarget={document.body}
                      menuPosition="fixed"
                      styles={{
                        menuPortal: (base) => ({
                          ...base,
                          zIndex: 99999,
                        }),
                      }}
                    />
                  )}
                />
              </InputGroup>
            </FormGroup>
          </Col>

          <Col xxl="3" xl="4" md="6" sm="12">
            <FormGroup>
              <InputGroup>
                <InputGroupText>Invoice Category</InputGroupText>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={InvoiceCategory}
                      className="form-control p-0 border-0"
                       id="invcat"
                      menuPortalTarget={document.body}
                      menuPosition="fixed"
                      styles={{
                        menuPortal: (base) => ({
                          ...base,
                          zIndex: 99999,
                        }),
                      }}
                    />
                  )}
                />
              </InputGroup>
            </FormGroup>
          </Col>

          <Col xxl="3" xl="4" md="6" sm="12">
            <FormGroup>
              <InputGroup>
                <InputGroupText>Invoice (Show/Hide)</InputGroupText>
                <Controller
                  name="invoiceShow"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={InvoiceShow}
                      className="form-control p-0 border-0"
                      menuPortalTarget={document.body}
                       id="show_hide"
                      menuPosition="fixed"
                      styles={{
                        menuPortal: (base) => ({
                          ...base,
                          zIndex: 99999,
                        }),
                      }}
                    />
                  )}
                />
              </InputGroup>
            </FormGroup>
          </Col>

          <Col xxl="3" xl="4" md="6" sm="12" className="text-end ms-auto">
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
              className=" btn btn-primary"
              onClick={handleReset}
            >
              Reset
            </button>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};

export default ViewInvoiceForm;
