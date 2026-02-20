import React, { Fragment, useState } from "react";
import {
  Col,
  Row,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import {
  pricigSupplier,
  optionscompany,
} from "../../Forms/FormWidget/FormSelect2/OptionDatas";
import HeaderCard from "../../Common/Component/HeaderCard";
import DatePicker from "react-datepicker";
import CompanyDropDown from "../../Forms/FormControl/formInput/DropDown";
import axios from "axios";
import { toast } from "react-toastify";
import { useCompany, useSupplier } from "../../../Hooks/Dropdowns";
import useCompanyDropDown from "../../../Hooks/useCompany";
import InputText from "../../Forms/FormControl/formInput/InputText";
import Loader from "../../../Layout/Loader";
const SinglePdfCommon = ({
  title,
  btnTtitle,
  onDataAdded,
  supplier_id,
  invoice_type,
  supplier,
  tax,
  api_name
}) => {
  const { data: companies } = useCompany("", invoice_type);
  const { companies:company } = useCompanyDropDown();
  const { data: supplierData } = useSupplier(supplier_id);
  const [loading, setLoading] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted, isValid },
  } = useForm();
 const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  console.log( {supplierData});
   const userId=localStorage.getItem("userId")

  const onSubmit = (formData) => {
    console.log("Form Data:", formData); // ✅ This will print your inputs
        setLoading(true);

    const payload = {
      company_id: String(formData.Company.value),
      // company_name: formData.Company.label,
      pricing_date: formData.pricingDate?formatDate(formData.pricingDate) :"",
      testing_email: formData.email,
      supplier_id: String(formData.supplier.value),
      supplier:  formData.supplier.label,
      invoice_type: invoice_type?invoice_type:""  , 
    tax: tax?tax:"",
    added_by:userId
    };
    console.log(payload)
    axios.post(api_name, payload, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
        toast.success("Add successfully!");
        reset();
                setLoading(false);

        if (onDataAdded) onDataAdded();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
                setLoading(false);

      });
  };
  return (
    <Fragment>
                  {loading && <Loader loading={true} />}

      <Row>
        <Col>
          <fieldset>
            <legend>{title}</legend>
            <Form
              className="px-2"
              noValidate=""
              onSubmit={handleSubmit(onSubmit)}
            >
              <Row className="mt-3">
                <Col  xl="4"  md="6" sm="12">
                  <CompanyDropDown
                    label="Company"
                    name="Company"
                    options={company}
                    control={control}
              rules={{ required: "Company is required" }}
               errors={errors}
                menuPortalTarget={document.body}
                          menuPosition="fixed"
                                 styles={{
                menuPortal: base => ({
                  ...base,
                  zIndex: 99999
                })
              }}

                  />
                </Col>
                <Col  xl="4"  md="6" sm="12">
                  <Row>
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <Col xs="3" md="4">
                          <InputGroupText>Pricing Date</InputGroupText>
                        </Col>
                        <Col xs="9" md="8">
                          <Controller
                            name="pricingDate"
                            control={control}
                            rules={{ required: " Required" }}
                            render={({ field }) => (
                              <DatePicker
                                className={`form-control digits`}
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                                dateFormat="yyyy-MM-dd"
                                 portalId="root"
                                popperPlacement="bottom-start"
                              />
                            )}
                          />
                        </Col>
                      </InputGroup>

                      {errors.pricingDate && (
                        <span className="text-danger">
                          {errors.pricingDate.message}
                        </span>
                      )}
                    </FormGroup>
                  </Row>
                </Col>
                <Col  xl="4"  md="6" sm="12">
  <FormGroup className="m-form__group">
    <InputGroup>
      <InputGroupText>Supplier</InputGroupText>

      <Controller
        name="supplier"
        control={control}
        rules={{ required: "Supplier is required" }}
       
        defaultValue={null} // RHF default
        render={({ field }) => {
          const options =
            supplier_id === "1" ? pricigSupplier : supplierData;

          // ✔ If no value selected, return first option as default
          const currentValue = field.value || options?.[0] || null;

          // ✔ Inform RHF of the default value (ONLY when empty)
          if (!field.value && options?.length > 0) {
            field.onChange(options[0]);
          }

          return (
            <Select
              {...field}
              className="form-control p-0 border-0"
              options={options}
              placeholder="Select supplier"
              value={currentValue}
                menuPortalTarget={document.body}
                                  menuPosition="fixed"
                                 styles={{
                menuPortal: base => ({
                  ...base,
                  zIndex: 99999
                })
              }}
              onChange={(selected) => field.onChange(selected)}
            />
          );
        }}
      />
    </InputGroup>

    {errors.supplier && (
      <span className="text-danger">{errors.supplier?.message}</span>
    )}
  </FormGroup>
</Col>

             
                <Col  xl="4"  md="6" sm="12">
                  <InputText
                    name="email"
                    label="Testing Email"
                    type="text"
                    register={register}
                  />
                </Col>
                <Col className="ms-auto"  xl="8"  md="12" sm="12">
                  <div className="text-end">
                    <Btn
                      attrBtn={{
                        color: "primary",
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

export default SinglePdfCommon;
