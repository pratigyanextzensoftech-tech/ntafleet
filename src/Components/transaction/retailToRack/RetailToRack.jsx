import React, { useState, Fragment } from "react";
import { useLocation,useNavigate  } from "react-router-dom";
import Select from "react-select";
import {
  transactionCheckBox,
  supplier,
  checkBoxData,
  currency,
  InVoiceSupplier,
  optionscountry,
  Upload_Supplier,
  invoiceType,
  chooseSupplierCheckBox,
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
import DropDown from "../../Forms/FormControl/formInput/DropDown";
import axios from "axios";
import { toast } from "react-toastify";
import {  useCompany,  useCountry,  useSupplier,  InvoiceType,formatDate} from "../../../Hooks/Dropdowns";
import Loader from "../../../Layout/Loader";
const RetailToRack = ({
  btnTtitle, 
  title,
  supplier_ids,
  company_list,
  country_id,
  invoice_type,
  owner_operator,
  invoice_type_dropdown,
  invoice_category_dropdown,
  cust_inv_type,
  defaultById,
  cust_inv_dropdown,
  invoice_creation,
  ta_retail_invoice,
  countryDropDown,
  suplier_list,
  country_list,
  api_name,
}) => {
  const params = new URLSearchParams(window.location.search);
  const from_date = params.get("from_date")?params.get("from_date"):'';
  const to_date = params.get("to_date")?params.get("to_date"):'';
  const invoice_Type = params.get("invoice_type"); 
  if(invoice_Type)
    {
    btnTtitle="Update Transaction";
    invoice_type=invoice_Type;
  }
 
 
  const location = useLocation();
  const navigate = useNavigate();
  const fullUrl =  location.pathname + location.search;
  const [selectedValues, setSelectedValues] = useState([]);
  const [showMessage, setShowMessage] = useState(true);
  const { data: country } = useCountry(country_id);
   const countries = [
   { value:"All", label: "All Country" }, // 👈 static option
    ...country,
  ];
  const { data: supplierData } = useSupplier(supplier_ids);

 
  
  const { data: companies } = useCompany('', invoice_type, owner_operator, '', '',supplier_ids);
  const invoiceTypes = InvoiceType(invoice_type);
  const [loading, setLoading] = useState(false);
  const {register,control,reset, handleSubmit,formState: { errors, isSubmitted, isValid },
  } = useForm({  defaultValues: {
     start: from_date?new Date(from_date) : null, // today as default,
     end: to_date?new Date(to_date) :null// today as default
  }});

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const onSubmit = (data) => {
    setLoading(true);
let companyValue = "";
if (Array.isArray(data.selectedCompanies)) { 
    companyValue = data.selectedCompanies.join(",");  // 🔥 Convert array → string
  
}
console.log(companyValue)
    if (btnTtitle === "Search Company") {
       const from_date= data.start ?formatDate(data.start) : "";
       const to_date= data.end? formatDate(data.end) : "";
       const invoicetype= data.invoiceType.value
      navigate(fullUrl+"&from_date="+from_date+"&to_date="+to_date+"&invoice_type="+invoicetype);
    } else {
      const basePayload = {
        company_id:companyValue, 
        supplier_id: data.supplier.value,
        start_date: data.start ? formatDate(data.start) : "",
        end_date: data.end ? formatDate(data.end) : "",
         country_id: data?data.country.value:"",
        invoice_type: data.invoice_type
          ? data.invoice_type.value
          : invoice_type,
       owner_operator:  owner_operator?owner_operator :"" 
      };
console.log("basePayload",basePayload);

      axios
        .post(api_name, basePayload, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log("Response from API =>", res);
          toast.success(res.data.message);
          reset();
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err);
          setLoading(false);
        });

      console.log("Final Payload Sent =>", basePayload);
    }
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
              <Row>
                <Col sm="3">
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
                                dateFormat="yyyy-MM-dd"
                              />
                            )}
                          />
                        </Col>
                      </InputGroup>

                      {errors.start && (
                        <span className="text-danger">
                          {errors.start.message}
                        </span>
                      )}
                    </FormGroup>
                  </Row>
                </Col>
                <Col sm="3">
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
                                dateFormat="yyyy-MM-dd"
                              />
                            )}
                          />
                        </Col>
                      </InputGroup>

                      {errors.end && (
                        <span className="text-danger">
                          {errors.end.message}
                        </span>
                      )}
                    </FormGroup>
                  </Row>
                </Col>
                {suplier_list !== false && (
                  <Col sm="3">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>Supplier</InputGroupText>

                        <Controller
                          name="supplier"
                          control={control}
                          rules={{ required: "Supplier is required" }}
                          defaultValue={null}
                          render={({ field }) => {
                            if (!field.value && supplierData?.length) {
                              // Auto select if only one option exists
                              if (
                                supplierData?.length === 1 &&
                                field.value === null
                              ) {
                                field.onChange(supplierData[0]);
                              } else {
                                // Multiple countries → select United States if exists
                                const us = supplierData.find(
                                  (c) => c.label === "Esso"
                                );
                                field.onChange(us || supplierData[0]); // fallback first item
                              }
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
                {countryDropDown !== false && (
                  <Col sm="3">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>Country</InputGroupText>

                        <Controller
                          name="country"
                          control={control}
                          rules={{ required: "Country is required" }}
                          defaultValue={null}

                          render={({ field }) => {
                            // Only set default value if not already set
                            if (!field.value && country?.length) {
                              if (country.length === 1) {
                                // Only one country → select it
                                field.onChange(country[0]);
                              } else {
                                // Multiple countries → select United States if exists
                                const us = country.find(
                                  (c) => c.label === "United States of America"
                                );
                                field.onChange(us || country[0]); // fallback first item
                              }
                            }

                            return (
                              <Select
                                {...field}
                                options={countries}
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
                  <Col sm="3">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>Invoice Type</InputGroupText>
                        <Controller
                          name="invoiceType"
                          rules={{ required: "Invoice Type is required" }}
                          control={control} 
                          defaultValue={invoiceTypes?.find(opt => opt.value === invoice_Type) || null}
                          render={({ field }) => { 
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
              </Row>
           {(company_list === "checkbox" || (invoice_Type && invoice_Type.trim() !== "")) && (

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

              <Col>
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
              <Row></Row>
            </Form>
          </fieldset>
        </Col>
      </Row>
    </Fragment>
  );
};

export default RetailToRack;
