import React, { Fragment, useState } from "react";
import Select from "react-select";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import axios from "axios";
import { toast } from "react-toastify";

import {
  useCompany,
  useCountry,
  useSupplier,
  InvoiceType,
} from "../../../Hooks/Dropdowns";
import Loader from "../../../Layout/Loader";
const RackToRetail = ({
  btnTitle,
  type,
  supplier_ids,
  company_list,
  country_id,
  invoice_type,
  invoice_type_dropdown,
  owner_operator_invoice,
  invoice_category_dropdown,
  cust_inv_type,
  cust_inv_dropdown,
  ul_owner_operator_invoice,
  invoice_creation,
  ta_retail_invoice,
  suplier_list,
  country_list,
  defaultSupplierValue,
  api_name,
}) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [loading, setLoading] = useState(false);

  const { data: country } = useCountry(country_id);
     const countries = [
   { value:"All", label: "All Country" }, // 👈 static option
    ...country,
  ];
  const { data: supplierData } = useSupplier(supplier_ids);
  const { data: companies } = useCompany(
    invoice_creation,
    ta_retail_invoice,
    owner_operator_invoice,
    cust_inv_type,
    ul_owner_operator_invoice
  );

  const invoiceTypes = InvoiceType(invoice_type);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const onSubmit = (data) => {
    let companyValue = "";

    if (Array.isArray(data.selectedCompanies)) {
      if (data.selectedCompanies.includes("All Company")) {
        companyValue = "All";
      } else {
        companyValue = data.selectedCompanies.join(",");
      }
    }

    setLoading(true);

    const basePayload = {
      company_id:
        company_list === "checkbox"
          ? companyValue
          : data.company?.value?.toString(),

      invoice_creation: invoice_creation || "",
      supplier_id: data.supplier.value,
      country_id: data.country.value,
      from: formatDate(data.start),
      to: formatDate(data.end),
      invoice_type: data.invoice_type
        ? data.invoice_type.value
        : invoice_type,
    };

    axios
      .post(api_name, basePayload, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        toast.success(res.data.message);
        reset();
        setLoading(false)
      })
      .catch((err) => {
        toast.error("Something went wrong");
                setLoading(false)

      })
      .finally(() => setLoading(false));

    console.log("Final Payload Sent =>", basePayload);
  };

  const handleCheckboxChange = (value, field) => {
    const allValues = companies.map((c) => c.value);
    const companyValues = allValues.filter((v) => v !== "All Company");

    let updated = [...selectedValues];

    if (value === "All Company") {
      if (updated.includes("All Company")) {
        updated = [];
      } else {
        updated = ["All Company", ...companyValues];
      }
    } else {
      if (updated.includes(value)) {
        updated = updated.filter((v) => v !== value);
      } else {
        updated.push(value);
      }

      const onlyCompanies = updated.filter((v) => v !== "All Company");
      const isAllSelected = companyValues.every((v) =>
        onlyCompanies.includes(v)
      );

      if (isAllSelected) {
        updated = ["All Company", ...companyValues];
      } else {
        updated = updated.filter((v) => v !== "All Company");
      }
    }

    setSelectedValues(updated);
    field.onChange(updated);
  };

  return (
    <Fragment>
      {loading && <Loader loading={true} />}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          {/* START DATE */}
          <Col xl="3" md="6" sm="12">
            <FormGroup>
              <InputGroup>
                <Col xs="4">
                  <InputGroupText>Start</InputGroupText>
                </Col>
                <Col xs="8">
                  <Controller
                    name="start"
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
                </Col>
              </InputGroup>
              {errors.start && (
                <span className="text-danger">{errors.start.message}</span>
              )}
            </FormGroup>
          </Col>

          {/* END DATE */}
          <Col xl="3" md="6" sm="12">
            <FormGroup>
              <InputGroup>
                <Col xs="3">
                  <InputGroupText>End</InputGroupText>
                </Col>
                <Col xs="9">
                  <Controller
                    name="end"
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
                </Col>
              </InputGroup>
              {errors.end && (
                <span className="text-danger">{errors.end.message}</span>
              )}
            </FormGroup>
          </Col>

          {/* SUPPLIER */}
          {suplier_list !== false && (
            <Col xl="3" md="6" sm="12">
              <FormGroup>
                <InputGroup>
                  <InputGroupText>Supplier</InputGroupText>
                  <Controller
                    name="supplier"
                    control={control}
                    rules={{ required: "Supplier is required" }}
                    defaultValue={null}
                    render={({ field }) => {
                      if (supplierData?.length === 1 && !field.value) {
                        field.onChange(supplierData[0]);
                      }
                      return (
                        <Select
                          {...field}
                          options={supplierData}
                          placeholder="Select Supplier"
                          className="form-control p-0 border-0"
                        />
                      );
                    }}
                  />
                </InputGroup>
                {errors.supplier && (
                  <span className="text-danger">
                    {errors.supplier.message}
                  </span>
                )}
              </FormGroup>
            </Col>
          )}

          {/* COUNTRY */}
          {suplier_list !== false && (
            <Col xl="3" md="6" sm="12">
              <FormGroup>
                <InputGroup>
                  <InputGroupText>Country</InputGroupText>
                  <Controller
                    name="country"
                    rules={{ required: "Country is required" }}
                    control={control}
                    defaultValue={null}
                    render={({ field }) => {
                      if (country?.length === 1 && !field.value) {
                        field.onChange(country[0]);
                      }
                      return (
                        <Select
                          {...field}
                          options={countries}
                          placeholder="Select Country"
                          className="form-control p-0 border-0"
                        />
                      );
                    }}
                  />
                </InputGroup>
                {errors.country && (
                  <span className="text-danger">
                    {errors.country?.message}
                  </span>
                )}
              </FormGroup>
            </Col>
          )}
        </Row>

        {/* COMPANY CHECKBOX */}
        {company_list === "checkbox" && (
          <Row>
            <Col xs="12">
              <fieldset>
                <legend>Choose Company</legend>

                <Controller
                  name="selectedCompanies"
                  control={control}
                  rules={{ required: "Select at least one company" }}
                  render={({ field }) => (
                    <Row>
                      {/* ALL Company */}
                      <Col xl="4" md="6" sm="12">
                        <div className="checkbox checkbox-dark">
                          <input
                            type="checkbox"
                            id="checkbox-0"
                            value="All Company"
                            checked={selectedValues.includes("All Company")}
                            onChange={() =>
                              handleCheckboxChange("All Company", field)
                            }
                          />
                          <Label for="checkbox-0" className="ms-2">
                            All Company
                          </Label>
                        </div>
                      </Col>

                      {companies.map((item, index) => (
                        <Col xl="4" md="6" xs="12" key={index}>
                          <div className="checkbox checkbox-dark">
                            <input
                              type="checkbox"
                              id={`checkbox-${index + 1}`}
                              value={item.value}
                              checked={selectedValues.includes(item.value)}
                              onChange={() =>
                                handleCheckboxChange(item.value, field)
                              }
                            />
                            <Label
                              for={`checkbox-${index + 1}`}
                              className="ms-2"
                            >
                              {item.label}
                            </Label>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  )}
                />
              </fieldset>
            </Col>
          </Row>
        )}

        {/* SUBMIT */}
        <Row className="my-2">
          <Col>
            <div className="text-end">
              <Btn
                attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }}
              >
                {btnTitle}
              </Btn>
            </div>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};

export default RackToRetail;
