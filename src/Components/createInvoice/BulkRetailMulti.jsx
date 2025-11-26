import React, { Fragment, useState,useEffect } from "react";
import {
  Col,
  Row,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  Label,
  Card,
  CardBody,
} from "reactstrap";
import { Btn } from "../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import {
  optionscountry,
  supplier,
} from "../Forms/FormWidget/FormSelect2/OptionDatas";
import DatePicker from "react-datepicker";
import Select from "react-select";
import HeaderCard from "../Common/Component/HeaderCard";
import axios from "axios";
import { useCountry } from "../../Hooks/Dropdowns";
import {supplierById} from '../../api/index'
import { toast } from "react-toastify";
import { Create_retail_invoice,Create_rack_invoice } from "../../api/index";
import Loader from "../../Layout/Loader";

const BulkRetailMulti = ({ checkBoxData, title, btnTtitle, type,companyDropDown,invoice,rackcase }) => {
  const [selectedValues, setSelectedValues] = useState([]);
    const[loading,setLoading]=useState(false)
  
  const {data:country}=useCountry()
 
 const[supplierData,setSupplierData]=useState([])
 const { control,reset, handleSubmit, formState: { errors }, setValue } = useForm();

const getParamsByType = () => {
  switch (type) {
    case "single_rack_actual":
      return "3";

    case "bulk_rack_actual":
      return "3";
    default:
      return "1,3,5,4,7"; // no type → hit default API
  }
};
useEffect(() => {
  const params = getParamsByType();

  axios
    .get(`${supplierById}/${params}`)
    .then((res) => {
      const formatted = res.data.map((s) => ({
        value: s.id,
        label: s.supplier_name,
      }));

      setSupplierData(formatted);

      // ⭐ Automatically set default supplier based on type
      if (type === "single_rack_actual") {
        setValue("supplier", formatted[0]); // pick first data
      } else if (type === "bulk_rack_actual") {
        setValue("supplier", formatted[1] || formatted[0]);
      }  else {
        setValue("supplier", null); // no default for no-type
      }
    })
    .catch((err) => console.log(err));
}, [type, setValue]);
useEffect(() => {
  if (!country || country.length === 0) return;

  if (
    type === "single_rack_actual" ||
    type === "bulk_rack_actual" 
  ) {
    // Auto select the single allowed country
    setValue("country", country[2]);   // Set default value here
  } else {
    // Clear value if normal dropdown
    setValue("country", null);
  }
}, [type, country]);

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
 const onSubmit = (data) => {
  console.log(data);
  setLoading(true);

  let payload = {};
  let apiUrl = "";

  if (invoice === "rackInvoice") {
    // Default values
    let invoice_type = "";
    let invoice_creation = "many_times";

    // Decision based on rackcase
    if (rackcase === "Capped-multi") {
      invoice_type = "Capped";
    } 
    else if (rackcase === "Actual-multi") {
      invoice_type = "Actual";
    } 
    else if (rackcase === "Bulk-multi") {
      invoice_type = "Actual";     // as you mentioned
    }

    payload = {
      supplier_id: data.supplier.value,
      country_id: data.country.value,
      from: data.startDate ? formatDate(data.startDate) : "",
      to: data.endDate ? formatDate(data.endDate) : "",
      invoice_creation,
      invoice_type,
    };

    apiUrl = Create_rack_invoice;
  } 
  
  // Retail Invoice
  else {
    payload = {
      supplier_id: data.supplier.value,
      country_id: data.country.value,
      from: data.startDate ? formatDate(data.startDate) : "",
      to: data.endDate ? formatDate(data.endDate) : "",
      invoice_creation: "weekly",
    };

    apiUrl = Create_retail_invoice;
  }

  console.log("Final Payload:", payload);

  axios
    .post(apiUrl, payload, { headers: { "Content-Type": "application/json" } })
    .then((res) => {
      setLoading(false);
      toast.success(res.data.message);
      reset();
    })
    .catch((err) => {
      setLoading(false);
      toast.error(err);
    });
};


  const handleCheckboxChange = (value, field) => {
    const allValues = checkBoxData.map((c) => c.value); // all possible
    const companyValues = allValues.filter((v) => v !== "ALL"); // only companies
    let updated = [...selectedValues];

    if (value === "All Company") {
      // ✅ Clicked ALL → toggle everything
      if (updated.includes("ALL")) {
        updated = []; // unselect all
      } else {
        updated = ["ALL", ...companyValues]; // select all
      }
    } else {
      // ✅ Clicked a normal company
      if (updated.includes(value)) {
        updated = updated.filter((v) => v !== value);
      } else {
        updated.push(value);
      }

      // If all companies are selected, add ALL
      const onlyCompanies = updated.filter((v) => v !== "ALL");
      const isAllSelected = companyValues.every((v) =>
        onlyCompanies.includes(v)
      );

      if (isAllSelected) {
        updated = ["ALL", ...companyValues];
      } else {
        updated = updated.filter((v) => v !== "ALL");
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
                <Col sm="3">
                  <FormGroup className="m-form__group">
                    <Row>
                      <InputGroup>
                        <Col sm="4">
                          {" "}
                          <InputGroupText>Start Date</InputGroupText>
                        </Col>
                        <Col sm="8">
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

                <Col sm="3">
                  <FormGroup className={`m-form__group  `}>
                    <Row>
                      <InputGroup>
                        <Col sm="4">
                          {" "}
                          <InputGroupText>End Date</InputGroupText>
                        </Col>
                        <Col sm="8">
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
              

                <Col sm="3">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>Supplier</InputGroupText>
                        <Controller
  name="supplier"
  control={control}
  rules={{ required: "supplier is required" }}
  defaultValue={null}
  render={({ field }) => (
    <Select
      {...field}
      options={supplierData}
      className="form-control p-0 border-0"
      placeholder="Select supplier"
      value={field.value}
      onChange={(val) => field.onChange(val)}
    />
  )}
/>
                    </InputGroup>

                    {errors.supplier && (
                      <span className="text-danger">
                        {errors.supplier?.message}
                      </span>
                    )}
                  </FormGroup>
                </Col>

                <Col sm="3">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>Country</InputGroupText>
                          <Controller
  name="country"
  rules={{ required: "country is required" }}
  control={control}
  render={({ field }) => {
    const isFixedType =
      type === "single_rack_actual" ||
      type === "bulk_rack_actual" 

    const countryOptions = isFixedType
      ? [country[2]]
      : country.filter((_, i) => i !== 0);

    return (
      <Select
        {...field}
        options={countryOptions}
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
                </Col>{companyDropDown ===false?null:      <Col sm="12">
                <fieldset>
                  <legend >Choose Company</legend>
                  {/* <Controller
                    name="selectedCompanies"
                    control={control}
                    rules={{ required: "Select at least one company" }}
                    render={({ field }) => (
                      <Row>
                        {checkBoxData.map((item, index) => (
                          <Col sm="4" key={index}>
                            <div className="checkbox checkbox-dark">
                              <input
                                type="checkbox"
                                id={`checkbox-${index}`}
                                value={item.value}
                                checked={selectedValues.includes(item.value)}
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
                  /> */}
                  {/* {errors.selectedCompanies && (
                    <span className="text-danger">
                      {errors.selectedCompanies.message}
                    </span>
                  )} */}
                </fieldset>
                </Col>
                }
        
              </Row>
                <Col sm={{ size: 2, offset: 10 }}>
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
              {/* <Row className='mt-3'>
                <fieldset className='inputField mt-3' >
                  <legend className='legend '>Choose Company</legend>
                  
                  <Row>
                    {checkBoxData.map((item, index) => (
                      <Col sm="4">
                        <div className='checkbox checkbox-dark'>
                          <input
                            id={`checkbox-${index}`}
                            type="checkbox"
                            value={item.value}
                            checked={selectedValues.includes(item.value)}
                            onChange={handleCheckboxChange} />
                          <Label for={`checkbox-${index}`} className="ms-2">
                            {item.label}
                          </Label>
                        </div></Col>
                    ))}
                  </Row>
                </fieldset>
                
              </Row> */}
            </Form>
          </fieldset>
        </Col>
      </Row>
    </Fragment>
  );
};

export default BulkRetailMulti;
