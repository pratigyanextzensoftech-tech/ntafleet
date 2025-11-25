import React, { Fragment, useState,useEffect } from 'react'
import { Col, Row, Form, FormGroup, InputGroup, InputGroupText, Card, CardBody } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import { optionscountry, supplier, optionscompany } from '../Forms/FormWidget/FormSelect2/OptionDatas';
import { Create_retail_invoice as ApiName,supplierById} from '../../api';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useCompany, useCountry } from '../../Hooks/Dropdowns';
const Repeat_Retail_Invoice = ({ title, btnTtitle, type }) => {
  const[loading,setLoading]=useState();
    const[supplierData,setSupplierData]=useState([])
  const {data:company}=useCompany()
  const{data:country}=useCountry()
  const {
    register,
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm();
  useEffect(() => {
  axios
    .get(`${supplierById}/4`)
    .then((res) => {
      const formatted = res.data.map((s) => ({
        value: s.id,
        label: s.supplier_name,
      }));

      setSupplierData(formatted);
        setValue("supplier",formatted[0]); // no default for no-type
      
    })
    .catch((err) => console.log(err));
}, [ setValue]);
useEffect(() => {
  if (!country || country.length === 0) return;

  if (
    type === "single_rack_actual" ||
    type === "bulk_rack_actual" ||
    type === "single_customized"
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
    console.log(data)
  const  payload={
company_id:data.company.value.toString(),
supplier_id:data.supplier.value,
  country_id: data.country.value,
     from:data.startDate?formatDate(data.startDate) : "",
    to: data.endDate?formatDate(data.endDate) : "" ,
  invoice_creation:"weekly"

    }
    console.log(payload)
                  setLoading(true)

  //   axios.post(ApiName, payload, {
  //   headers: { "Content-Type": "application/json" },
  // })

    // .then((res)=>{
    //   console.log(res)  
    //    toast.success(res.data.message);
    //    reset();
    //          setLoading(false)
    // })
    // .catch((err)=>{
    //   console.log(err);
    //         setLoading(false)

    //    toast.error(err);
    // })
  };
  return (

    <Fragment>
      <Row>
        <Col>
          <fieldset>
            <legend>{title}</legend>
            <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >
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
                            options={company}
                            className="form-control p-0 border-0"
                            placeholder="Select a country"
                          />
                        )}
                      />

                    </InputGroup>

                    {errors.company && (
                      <span className="text-danger">{errors.company.message}</span>
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

                        <Col sm="4">        <InputGroupText>Start Date</InputGroupText>
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
                        <span className="text-danger">{errors.startDate.message}</span>
                      )}
                    </Row>



                  </FormGroup>
                </Col>

                <Col sm="4">
                  <FormGroup className={`m-form__group  `}>
                    <Row>
                      <InputGroup>
                        <Col sm="4">        <InputGroupText>End Date</InputGroupText>
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
                        <span className="text-danger">{errors.endDate.message}</span>
                      )}
                    </Row>
                  </FormGroup>

                </Col>
                <Col sm={{ size: 2, offset: 2 }}>
                  <div className='text-end'>
                    <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTtitle}</Btn>
                  </div>
                </Col>
              </Row>
            </Form>
          </fieldset>
        </Col>
      </Row>
    </Fragment>



  )
}

export default Repeat_Retail_Invoice
