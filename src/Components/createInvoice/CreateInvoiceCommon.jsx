import React, { Fragment, useEffect, useState } from "react";
import {
  Col,
  Row,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  Card,
  CardBody,
} from "reactstrap";
import { Btn } from "../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { supplier } from "../Forms/FormWidget/FormSelect2/OptionDatas";
import HeaderCard from "../Common/Component/HeaderCard";
import { useCompany, useCountry,useSupplier } from "../../Hooks/Dropdowns";
import { supplierById } from "../../api/index";
import { toast } from "react-toastify";
import axios from "axios";
import {
  CreateRetailInvoice,
  CreateRackInvoice,
  CreateEssoInvoice,
  CreateEssoOwnerInvoice,
  CreateEssoCustomizedInvoice,
  CreateUttramarInvoice,
  CreateUttramarOwnerInvoice,
  CreateUttramarCustomizedInvoice,
  CreateMonocodeInvoice,
  CreateTcheckInvoice,
} from "../../api/index";
import Loader from "../../Layout/Loader"; 
const CreateInvoiceCommon = ({
  title,
  btnTtitle,
  supplier_ids,
  supplier_name,
  country_id,
  invoice_type,
  invoice_creation,
  api_name,
  type,
  invoice
}) => {

 // const [supplierData, setSupplierData] = useState([]);
 
  const { data: country } = useCountry(country_id);
  const { data: supplierData } = useSupplier(supplier_ids);
  const { data: companies } = useCompany(invoice_creation); 
  const [loading, setLoading] = useState(false); 
  const {control, handleSubmit, formState: { errors }, setValue, reset,} = useForm();  
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };


  const onSubmit = (data) => {
    setLoading(true); 
    const basePayload = 
    { 
      company_id: data.company.value?data.company.value.toString():'',
      invoice_creation: invoice_creation?invoice_creation:'weekly',
      supplier_id: data.supplier.value,
      country_id: data.country.value,
      from: data.startDate ? formatDate(data.startDate) : "",
      to: data.endDate ? formatDate(data.endDate) : "",
      invoice_type:data.invoice_type?data.invoice_type.value:invoice_type
    }; 

    
     axios
        .post(api_name, basePayload, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          toast.success(res.data.message);
          reset();
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err);
          setLoading(false);
        });


 

    console.log("Final Payload Sent =>", basePayload);
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
                <Col sm="4">
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

                <Col sm="4">
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
                            type === "bulk_rack_actual" ||
                            type === "single_customized";

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
                </Col>
              </Row>
              <Row className="mt-3">
                <Col sm="4">
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

                <Col sm="4">
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
                <Col sm={{ size: 2, offset: 2 }}>
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
