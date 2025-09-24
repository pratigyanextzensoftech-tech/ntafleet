import React, { Fragment,useState } from 'react'
import {  Col, Row, Form, FormGroup, InputGroup, InputGroupText,Label,Card,CardBody } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import {  optionscountry, supplier } from '../Forms/FormWidget/FormSelect2/OptionDatas';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import HeaderCard from '../Common/Component/HeaderCard';
const BulkRetailMulti = ({checkBoxData,title,btnTtitle,type}) => {
       
         const [selectedValues, setSelectedValues] = useState([]);
             const {
                register,
                control,
                handleSubmit,
                formState: { errors, isSubmitted, isValid },
              } = useForm();
           
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
      <Card >
        <CardBody>
      <HeaderCard title={title}/>
                <Form noValidate='' onSubmit={handleSubmit(onSubmit)}>  
         <Row className="mt-3">
                <Col sm="3">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>
                        Start Date
                      </InputGroupText>
                   
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
          </InputGroup>
          {errors.startDate && (
            <span className="text-danger">{errors.startDate.message}</span>
          )}
                  </FormGroup>
                </Col>
                <Col sm="3">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>
                        End Date
                      </InputGroupText>
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
                      </InputGroup>
                       {errors.endDate && (
            <span className="text-danger">{errors.endDate.message}</span>
          )}
                  </FormGroup>
                </Col>



                <Col sm="3">
                  <FormGroup className="m-form__group">
                    <InputGroup >
                      <InputGroupText>Supplier</InputGroupText>
                  <Controller
                        name="supplier"
                         rules={{ required: "supplier is required" }}
                         defaultValue={type === "single_rack_actual"  || type==="bulk_rack_actual" ? [supplier[5]] : null}

                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                          options={type === "single_rack_actual"  || type==="bulk_rack_actual"  ? [supplier[5]] : supplier}
                            
                            className="form-control p-0 border-0"
                            placeholder="Select supplier"
                          />
                        )}
                      />
                    </InputGroup>

                    {errors.supplier && (
                      <span className="text-danger">{errors.supplier?.message}</span>
                    )}
                  </FormGroup>
                </Col>

                <Col sm="3">
                  <FormGroup className="m-form__group">
                    <InputGroup >
                      <InputGroupText>Country</InputGroupText>
      <Controller
                        name="country"
                                                    defaultValue={type === "single_rack_actual" || type==="bulk_rack_actual" ? [optionscountry[1]] : null}
                                                rules={{ required: "country is required" }}

                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                    options={type === "single_rack_actual" || type==="bulk_rack_actual"  ? [optionscountry[1]] : optionscountry}

                            className="form-control p-0 border-0"
                            placeholder="Select Country"
                          />
                        )}
                      />
                    </InputGroup>

                    {errors.country && (
                      <span className="text-danger">{errors.country?.message}</span>
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
              </CardBody>
      </Card>
    </Fragment>
  )
}

export default BulkRetailMulti
