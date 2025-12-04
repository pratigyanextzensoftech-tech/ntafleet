import React, { Fragment,useState } from 'react'
import {
  Col,
  Row,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  Input,
  Label
} from "reactstrap";
import { Btn } from '../../AbstractElements';
import { pricigSupplier } from '../Forms/FormWidget/FormSelect2/OptionDatas';
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import Select from 'react-select';
import { useCompany, useSupplier } from '../../Hooks/Dropdowns';
import { DiscountType } from '../Forms/FormWidget/FormSelect2/OptionDatas';
import InputText from '../Forms/FormControl/formInput/InputText';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../../Layout/Loader';
const PricingCommon = ({
  title,
  btnTitle,
  csvFile,
  fromUpto,
  pricingDate,
  company,
  company_list,
  testingEmail,
  apiName,
  supplier,
  discountType,
  supplier_ids,
  tax,
  validation, rackus,
  rackca
}) => {

  const { data: companies } = useCompany();
  const { data: supplierData } = useSupplier(supplier_ids);
  const [loading, setLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

 const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
 const userId=localStorage.getItem("userId")

 const onSubmit = (data) => {
  let companyValue = "";
   if (Array.isArray(data.selectedCompanies)) {
  if (data.selectedCompanies.includes("All Company")) {
    companyValue = "All";   // 🔥 If ALL is selected
  } else {
    companyValue = data.selectedCompanies.join(",");  // 🔥 Convert array → string
  }
}
  console.log(data)
    setLoading(true);
    const basePayload = {
      company_id: company_list==="checkbox"? companyValue : "",
      supplier_id: data.supplier.value,
      supplier:data.supplier.label,
      testing_email :testingEmail?data.testingEmail:"",
      tax: tax? tax:"No",
      pricing_date:data.pricingDate? formatDate(data.pricingDate):"",
      invoice_type:discountType?data.DiscountType.value:"",
      added_by:userId
    };

    axios
      .post(apiName, basePayload, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {  
        res.data.success?toast.success(res.data.message):toast.error(res.data.message);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });

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

            <Form className="px-2" noValidate onSubmit={handleSubmit(onSubmit)}>
              <Row className="mt-3">

                {/* PRICING DATE */}
                {pricingDate === true && (
                  <Col sm="4">
                    <Row>
                      <FormGroup className="m-form__group">
                        <InputGroup>
                          <Col sm="3">
                            <InputGroupText>Pricing Date</InputGroupText>
                          </Col>

                          <Col sm="9">
                            <Controller
                              name="pricingDate"
                              control={control}
                              rules={
                                validation
                                  ? { required: "Required" }
                                  : {}
                              }
                              render={({ field }) => (
                                <DatePicker
                                  className="form-control"
                                  selected={field.value}
                                  onChange={(date) => field.onChange(date)}
                                   dateFormat="yyyy-MM-dd"
                                />
                              )}
                            />
                          </Col>
                        </InputGroup>

                        {validation && errors.pricingDate && (
                          <span className="text-danger">
                            {errors.pricingDate.message}
                          </span>
                        )}
                      </FormGroup>
                    </Row>
                  </Col>
                )}
{rackus==true &&(
      <Col sm="4">
      <InputText
            name="rackus"
            label="Rack US"
            type="text"
            register={register}
            errors={errors}
            rules={ validation
                              ?{ required: "Required" }:{}}
            
          />
          </Col>
)}
{rackca==true &&(
      <Col sm="4">
      <InputText
            name="rackca"
            label="Rack CA"
            type="text"
            register={register}
            errors={errors}
            rules={ validation
                              ?{ required: "Required" }:{}}
            
          />
          </Col>
)}
                {/* SUPPLIER */}
                {supplier === true && (
                  <Col sm="4">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>Supplier</InputGroupText>

                        <Controller
                          name="supplier"
                          control={control}
                          rules={
                            validation
                              ? { required: "Supplier is required" }
                              : {}
                          }
                          render={({ field }) => {

                            // Auto select supplier when only 1 option
                            if (supplierData?.length === 1 && !field.value) {
                              field.onChange(supplierData[0]);
                            }

                            return (
                              <Select
                                {...field}
                                className="form-control p-0 border-0"
                                options={
                                  supplier_ids ? supplierData : pricigSupplier
                                }
                                placeholder="Select supplier"
                                value={field.value}
                                onChange={field.onChange}
                              />
                            );
                          }}
                        />
                      </InputGroup>

                      {validation && errors.supplier && (
                        <span className="text-danger">
                          {errors.supplier.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                )}

                {/* DISCOUNT TYPE */}
                {discountType === true && (
                  <Col sm="4">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>Discount Type</InputGroupText>

                        <Controller
                          name="DiscountType"
                          control={control}
                          rules={
                            validation
                              ? { required: "Required" }
                              : {}
                          }
                          render={({ field }) => (
                            <Select
                              {...field}
                              className="form-control p-0 border-0"
                              options={DiscountType}
                              placeholder="Select Discount Type"
                              onChange={field.onChange}
                              value={field.value}
                            />
                          )}
                        />
                      </InputGroup>

                      {validation && errors.DiscountType && (
                        <span className="text-danger">
                          {errors.DiscountType.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                )}

                {testingEmail === true && (
                  <Col sm="4">
                  
                    <InputText
            name="testingEmail"
            label="Testing Email"
            type="text"
            register={register}
            errors={errors}
            rules={ validation
                              ?{ required: "Required" }:{}}
            
          />
                            </Col>

                )}

                {/* CSV FILE */}
                {csvFile === true && (
                  <Col sm="4">
                    <Row>
                      <Col sm="3" className="pe-0">
                        <InputGroupText>CSV File</InputGroupText>
                      </Col>

                      <Col sm="9" className="px-0">
                        <Input
                          style={{ border: "1px solid #ccc" }}
                          className="form-control"
                          type="file"
                          {...register("csvFile")}
                        />
                      </Col>
                    </Row>
                  </Col>
                )}

                {/* COMPANY */}
                {company === true && (
                  <Col sm="4">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>Company</InputGroupText>

                        <Controller
                          name="company"
                          control={control}
                          rules={
                            validation
                              ? { required: "Company is required" }
                              : {}
                          }
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={companies}
                              className="form-control p-0 border-0"
                              placeholder="Select company"
                            />
                          )}
                        />
                      </InputGroup>

                      {validation && errors.company && (
                        <span className="text-danger">
                          {errors.company.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                )}

                {/* PRICING FROM / UPTO */}
                {fromUpto === true && (
                  <>
                    {/* FROM DATE */}
                    <Col sm="4">
                      <Row>
                        <FormGroup className="m-form__group">
                          <InputGroup>
                            <Col sm="4">
                              <InputGroupText>Pricing From</InputGroupText>
                            </Col>

                            <Col sm="8">
                              <Controller
                                name="pricingFrom"
                                control={control}
                                rules={
                                  validation
                                    ? { required: "Required" }
                                    : {}
                                }
                                render={({ field }) => (
                                  <DatePicker
                                    className="form-control"
                                    selected={field.value}
                                    onChange={field.onChange}
                                  />
                                )}
                              />
                            </Col>
                          </InputGroup>

                          {validation && errors.pricingFrom && (
                            <span className="text-danger">
                              {errors.pricingFrom.message}
                            </span>
                          )}
                        </FormGroup>
                      </Row>
                    </Col>

                    <Col sm="4">
                      <Row>
                        <FormGroup className="m-form__group">
                          <InputGroup>
                            <Col sm="4">
                              <InputGroupText>Pricing Upto</InputGroupText>
                            </Col>

                            <Col sm="8">
                              <Controller
                                name="pricingUpto"
                                control={control}
                                rules={
                                  validation
                                    ? { required: "Required" }
                                    : {}
                                }
                                render={({ field }) => (
                                  <DatePicker
                                    className="form-control"
                                    selected={field.value}
                                    onChange={field.onChange}
                                  />
                                )}
                              />
                            </Col>
                          </InputGroup>

                          {validation && errors.pricingUpto && (
                            <span className="text-danger">
                              {errors.pricingUpto.message}
                            </span>
                          )}
                        </FormGroup>
                      </Row>
                    </Col>
                     
                  </>
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
                {/* SUBMIT BUTTON */}
                <Col className="text-end">
                  <Btn
                    attrBtn={{
                      color: "primary",
                      className: "m-r-15",
                      type: "submit",
                    }}
                  >
                    {btnTitle}
                  </Btn>
                </Col>

              </Row>
            </Form>
          </fieldset>
        </Col>
      </Row>
    </Fragment>
  );
};

export default PricingCommon;
