import React, { Fragment,useState,useEffect } from 'react'
import {  Col, Row, Form, FormGroup, InputGroup, InputGroupText,Label } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import {  optionscountry, InVoiceSupplier,invoiceType1 } from '../Forms/FormWidget/FormSelect2/OptionDatas';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import axios from 'axios';
import { supplierById } from '../../api';
const BulkEssoMulti = ({checkBoxData,title,btnTtitle,type}) => {
       
         const [selectedValues, setSelectedValues] = useState([]);
              const[supplierData,setSupplierData]=useState([])
             const {
                register,
                control,
                setValue,
                handleSubmit,
                formState: { errors, isSubmitted, isValid },
              } = useForm();
              const getParamsByType = () => {
  switch (type) {
    case "owner_operator":
      return "6";
    case "bulk_esso":
      return "6";
    default:
      return "3,6"; // no type → hit default API
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
                 if (type === "owner_operator") {
                   setValue("supplier", formatted[0]); // pick first data
                 } else if (type === "bulk_esso") {
                   setValue("supplier", formatted[1] || formatted[0]);
                 }
                
                 else {
                   setValue("supplier", null); // no default for no-type
                 }
               })
               .catch((err) => console.log(err));
           }, [type, setValue]);
           const onSubmit = (data) => {
        console.log("Form Data:", data);  // ✅ This will print your inputs
        // alert("Form submitted successfully!");
      };
  const handleCheckboxChange = (value, field) => {
    const allValues = checkBoxData.map((c) => c.value);        // all possible
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
      const isAllSelected = companyValues.every((v) => onlyCompanies.includes(v));

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
<Row>
<Col>
<fieldset>
<legend>{title}</legend>
   <Form className='p-4' noValidate='' onSubmit={handleSubmit(onSubmit)}>  
         <Row >
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
              <FormGroup className="m-form__group">
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
                            placeholderText="Select End date"
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
                      {errors.endDate.message}
                    </span>
                  )}
                </Row>
              </FormGroup>
            </Col>
  <Col sm="3">
                        <FormGroup className="m-form__group">
                            <InputGroup>
                                <InputGroupText>
                                    Invoice Type
                                </InputGroupText>
                                <Controller name="invoice"
                                    rules={{ required: "company Name is required" }}
 defaultValue={type === "owner_operator" || type==="bulk_esso" ? [invoiceType1[3]] : null}
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
      options={type === "owner_operator" || type==="bulk_esso" ? [invoiceType1[3]] : null}
                                            className="form-control p-0 border-0"
                                        />
                                    )}
                                />

                            </InputGroup>
                            {errors.invoice && (
                                <span className="text-danger">{errors.invoice.message}</span>
                            )}
                        </FormGroup>
                    </Col>               


                <Col sm="3">
                  <FormGroup className="m-form__group">
                <InputGroup>
                  <InputGroupText>Supplier</InputGroupText>
                  <Controller
                    name="supplier"
                    rules={{ required: "supplier is required" }}
                   
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={
                        supplierData
                        }
                        className="form-control p-0 border-0"
                        placeholder="Select supplier"
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

           
              </Row>
              <Row className="mt-3">
          <fieldset className="inputField mt-3">
            <legend className="legend">Choose Company</legend>
            <Controller
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
                          onChange={() => handleCheckboxChange(item.value, field)}
                        />
                        <Label for={`checkbox-${index}`} className="ms-2 ">
                          {item.label}
                        </Label>
                      </div>
                    </Col>
                  ))}
                </Row>
              )}
            />
            {errors.selectedCompanies && (
              <span className="text-danger">{errors.selectedCompanies.message}</span>
            )}
          </fieldset>
</Row>
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


  )
}

export default BulkEssoMulti
