import React, { Fragment, useState } from "react";
import {
  Col,
  Row,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  Label,
} from "reactstrap";
import { Btn } from "../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import Select from "react-select";
import {
  useCompany,
  useCountry,
  useSupplier,
  InvoiceType,
} from "../../Hooks/Dropdowns";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../../Layout/Loader";
import { InvoiceCategory,customizedTypeType } from "../Forms/FormWidget/FormSelect2/OptionDatas";
const CreateInvoiceCommon = ({
  title,
  btnTtitle,
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
  // const [supplierData, setSupplierData] = useState([]);

  const { data: country } = useCountry(country_id);
  const { data: supplierData } = useSupplier(supplier_ids);
  const { data: companies } = useCompany( 
    invoice_creation,
    ta_retail_invoice,
    owner_operator_invoice,
    cust_inv_type,
    ul_owner_operator_invoice, 
  );
  const invoiceTypes = InvoiceType(invoice_type);
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const [selectedValues, setSelectedValues] = useState([]);
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const onSubmit = (data) => {
     let companyValue = "";
   if (Array.isArray(data.selectedCompanies)) {
  if (data.selectedCompanies.includes("All Company")) {
    companyValue = "All";   // 🔥 If ALL is selected
  } else {
    companyValue = data.selectedCompanies.join(",");  // 🔥 Convert array → string
  }
}
    setLoading(true);
    const basePayload = {
      company_id:company_list==="checkbox"? companyValue : data.company.value.toString() ,
      invoice_creation: invoice_creation ? invoice_creation : "",
      supplier_id: data.supplier.value,
      country_id: data.country.value,
      from: data.startDate ? formatDate(data.startDate) : "",
      to: data.endDate ? formatDate(data.endDate) : "",
      invoice_type: data.invoice_type ? data.invoice_type.value : invoice_type,
    };

    // axios
    //   .post(api_name, basePayload, {
    //     headers: { "Content-Type": "application/json" },
    //   })
    //   .then((res) => {
    //     toast.success(res.data.message);
    //     reset();
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     toast.error(err);
    //     setLoading(false);
    //   });

    console.log("Final Payload Sent =>", basePayload);
  };

  const handleCheckboxChange = (value, field) => {
    
    const allValues = companies.map((c) => c.value); // all possible
    const companyValues = allValues.filter((v) => v !== "All Company"); // only companies
    let updated = [...selectedValues];

    if (value === "All Company") {
      // ✅ Clicked ALL → toggle everything
      if (updated.includes("All Company")) {
        updated = []; // unselect all
      } else {
        updated = ["All Company", ...companyValues]; // select all
      }
    } else {
      // ✅ Clicked a normal company
      if (updated.includes(value)) {
        updated = updated.filter((v) => v !== value);
      } else {
        updated.push(value);
      }

      // If all companies are selected, add ALL
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
      <Row>
        <Col>
          <fieldset>
            <legend>{title}</legend>
            <Form noValidate="" onSubmit={handleSubmit(onSubmit)}>
              <Row className="mt-3">
                {company_list === "list" && (
                  <Col sm="4">
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
                              options={companies}
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
                )}

                <Col sm="4">
                  <FormGroup className="m-form__group">
                    <Row>
                      <InputGroup>
                        <Col sm="3">
                          <InputGroupText>Start Date</InputGroupText>
                        </Col>
                        <Col sm="9">
                          <Controller
                            name="startDate"
                            control={control}
                            rules={{ required: "Start Date is required" }}
                            render={({ field }) => (
                              <DatePicker
                                placeholderText="Select start date"
                                className={`form-control `}
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                               dateFormat="yyyy-MM-dd"

                              />
                            )}
                          />
                        </Col>
                      </InputGroup>
                      {errors.startDate && (
                        <span className="text-danger">
                          {errors.startDate.message}
                        </span>
                      )}
                    </Row>
                  </FormGroup>
                </Col>

                <Col sm="4">
                  <FormGroup className={`m-form__group  `}>
                    <Row>
                      <InputGroup>
                        <Col sm="3">
                          <InputGroupText>End Date</InputGroupText>
                        </Col>
                        <Col sm="9">
                          <Controller
                            name="endDate"
                            control={control}
                            rules={{ required: "End Date is required" }}
                            render={({ field }) => (
                              <DatePicker
                                placeholderText="Select end date"
                                className={`form-control digits`}
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                               dateFormat="yyyy-MM-dd"

                              />
                            )}
                          />
                        </Col>
                      </InputGroup>
                      {errors.endDate && (
                        <span className="text-danger">
                          {errors.endDate.message}
                        </span>
                      )}
                    </Row>
                  </FormGroup>
                </Col>
                {suplier_list!== false &&(
         <Col sm="4">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>Supplier</InputGroupText>

                      <Controller
                        name="supplier"
                        control={control}
                        rules={{ required: "Supplier is required" }}
                        defaultValue={null}
                        render={({ field }) => {
                          // Auto select if only one option exists
                          if (
                            supplierData?.length === 1   &&
                            field.value === null
                          ) {
                            field.onChange(supplierData[0]);
                          }
                           
                          return (
                            <Select
                              {...field}
                              options={supplierData}
                              className="form-control p-0 border-0"
                              placeholder="Select supplier"
                              value={field.value}
                              onChange={(val) => field.onChange(val)}
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
        {suplier_list!== false &&(
                <Col sm="4">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>Country</InputGroupText>

                      <Controller
                        name="country"
                        rules={{ required: "Country is required" }}
                        control={control}
                        defaultValue={null}
                        render={({ field }) => {
                          // Auto-select if only one country exists AND no value already selected
                          if (country?.length === 1 && !field.value) {
                            field.onChange(country[0]);
                          }

                          return (
                            <Select
                              {...field}
                              options={country}
                              className="form-control p-0 border-0"
                              placeholder="Select Country"
                              value={field.value}
                              onChange={(val) => field.onChange(val)}
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
                {invoice_type_dropdown === true && (
                  <Col sm="4">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>Invoice Type</InputGroupText>
                        <Controller
                          name="invoiceType"
                          rules={{ required: "Invoice Type is required" }}
                          control={control}
                          defaultValue={null}
                          render={({ field }) => {
                            // Auto-select if only one option exists and field has no value
                            if (invoiceTypes?.length === 1 && !field.value) {
                              field.onChange(invoiceTypes[0]);
                            }

                            return (
                              <Select
                                {...field}
                                options={invoiceTypes}
                                className="form-control p-0 border-0"
                                placeholder="Select Invoice Type"
                                value={field.value}
                                onChange={(val) => field.onChange(val)}
                              />
                            );
                          }}
                        />
                      </InputGroup>

                      {errors.invoiceType && (
                        <span className="text-danger">
                          {errors.invoiceType?.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                )}
 {cust_inv_dropdown === true && (
                  <Col sm="4">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>Invoice Category</InputGroupText>
                        <Controller
                          name="invCateory"
                          rules={{ required: "Invoice Category is required" }}
                          control={control}
                          defaultValue={null}
                          render={({ field }) => {
                

                            return (
                              <Select
                                {...field}
                                options={InvoiceCategory}
                                className="form-control p-0 border-0"
                                placeholder="Select Invoice Type"
                                value={field.value}
                                onChange={(val) => field.onChange(val)}
                              />
                            );
                          }}
                        />
                      </InputGroup>

                      {errors.invoiceType && (
                        <span className="text-danger">
                          {errors.invoiceType?.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                )}
             {invoice_category_dropdown === true && (
                  <Col sm="4">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>Customized Type</InputGroupText>
                        <Controller
                          name="invCateory"
                          rules={{ required: "Customized Type is required" }}
                          control={control}
                          defaultValue={null}
                          render={({ field }) => {
                

                            return (
                              <Select
                                {...field}
                                options={customizedTypeType}
                                className="form-control p-0 border-0"
                                placeholder="Select Invoice Type"
                                value={field.value}
                                onChange={(val) => field.onChange(val)}
                              />
                            );
                          }}
                        />
                      </InputGroup>

                      {errors.invoiceType && (
                        <span className="text-danger">
                          {errors.invoiceType?.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                )}    
                {company_list === "checkbox" && (
                  <Col sm="12">
                    <fieldset>
                      <legend>Choose Company </legend>
                      {
                        <Controller
                          name="selectedCompanies"
                          control={control}
                          rules={{ required: "Select at least one company" }}
                          render={({ field }) => (
                            <Row>
                              <Col sm="4">
                                <div className="checkbox checkbox-dark">
                                  <input
                                    type="checkbox"
                                    id="checkbox-0"
                                    value="All Company"
                                    
                                    checked={selectedValues.includes(
                                      "All Company"
                                    )}
                                    onChange={() =>
                                      handleCheckboxChange("All Company", field)
                                    }
                                  />
                                  <Label for={`checkbox-0`} className="ms-2 ">
                                    All Company
                                  </Label>
                                </div>
                              </Col>

                              {companies.map((item, index) => (
                                <Col sm="4" key={index}>
                                  <div className="checkbox checkbox-dark">
                                    <input
                                      type="checkbox"
                                      id={`checkbox-${index}`}
                                      value={item.value}
                                      checked={selectedValues.includes(
                                        item.value
                                      )}
                                      onChange={() =>
                                        handleCheckboxChange(item.value, field)
                                      }
                                    />
                                    <Label
                                      for={`checkbox-${index}`}
                                      className="ms-2 "
                                    >
                                      {item.label}
                                    </Label>
                                  </div>
                                </Col>
                              ))}
                            </Row>
                          )}
                        />
                      }
                    </fieldset>
                  </Col>
                )}
              </Row>
              <Row>
                <Col sm="12">
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
                  </div>
                </Col>
              </Row>
            </Form>
          </fieldset>
        </Col>
      </Row>
    </Fragment>
  );
};
export default CreateInvoiceCommon;
