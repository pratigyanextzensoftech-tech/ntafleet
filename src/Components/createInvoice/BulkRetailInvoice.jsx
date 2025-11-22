import React, { Fragment, useState,useEffect } from "react";
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
import { useCountry } from "../../Hooks/Dropdowns";
import {supplierById} from '../../api/index'
import { toast } from "react-toastify";
import { Create_retail_invoice } from "../../api/index";
import axios from "axios";
const BulkRetailInvoice = ({ title, btnTtitle, type }) => {
   const[supplierData,setSupplierData]=useState([])
        const{ data:country}=useCountry()
  
   const { control, handleSubmit, formState: { errors }, setValue } = useForm();

  const onSubmit = (data) => {
    console.log(data)
  const  payload={
  supplier_id:data.supplier.value,
  country_id: data.country.value,
  from:data.startDate,
  to: data.endDate
    }
    console.log(payload)
    // axios.post(Create_retail_invoice,payload)
    // .then((res)=>{
    //   console.log(res)  
    //    toast.success(res.message);
    //    reset();
    // })
    // .catch((err)=>{
    //   console.log(err);
    //    toast.error(err);
    // })
  };
  const getParamsByType = () => {
    switch (type) {
      case "bulk_customized":
        return "3";
      default:
        return "1,3,5,4,7";
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
        if (type === "bulk_customized") {
          setValue("supplier", formatted[0]); // pick first data
        } else {
          setValue("supplier", null); // no default for no-type
        }
      })
      .catch((err) => console.log(err));
  }, [type, setValue]);
  useEffect(() => {
    if (!country || country.length === 0) return;
  
    if (
      type === "bulk_customized"  
    ) {
      // Auto select the single allowed country
      setValue("country", country[2]);   // Set default value here
    } else {
      // Clear value if normal dropdown
      setValue("country", null);
    }
  }, [type, country]);
  return (
    <Fragment>
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
                         type === "bulk_customized" ;
                   
                       const countryOptions = isFixedType
                         ? [country[2]]
                         : country
                         ;
                   
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
            </Form>
          </fieldset>
        </Col>
      </Row>
    </Fragment>
  );
};

export default BulkRetailInvoice;
