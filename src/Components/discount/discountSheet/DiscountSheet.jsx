import React, { useState } from 'react';
import Select from 'react-select'
import {  optionscompany, discountSheetCheckBox } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Label, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import HeaderCard from '../../Common/Component/HeaderCard';
import DropDown from '../../Forms/FormControl/formInput/DropDown';
import DatePickerInput from '../../Forms/FormControl/formInput/DatePickerInput';
import useCompany from '../../../Hooks/useCompany';
import InputText from '../../Forms/FormControl/formInput/InputText';
const DiscountSheet = ({ title, btnTitle }) => {
        const [selectedValues, setSelectedValues] = useState([]);
      const { companies: companyOptions, loading: companyLoading } = useCompany();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {

        console.log("Form Data:", data);  // ✅ This will print your inputs
        // alert("Form submitted successfully!");

    };

  const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;

        setSelectedValues(prev => {
            if (checked) {
                return [...prev, value];
            } else {
                return prev.filter(item => item !== value);
            }
        });
    }

    return (
        <>

            <HeaderCard title={title} />
            <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >
                <Row className="mt-3">
                    <Col sm="3">
<DropDown
           name="company"
  label="Company"
  control={control}
          errors={errors}
  rules={{ required: "Company is required" }}
  placeholder="Select Company"
  // loading={companyLoading}
  options={companyOptions}
 />
                    </Col>
                    <Col sm="3">
                  <DatePickerInput
        name="startDate"
        control={control}              // ✅ make sure this is passed
        label="Start Date"
        placeholder="Select start date" // ✅ fixed spelling
        errors={errors}
                required="start Date is required"
      />
                    </Col>
                    <Col sm="3">
                    <DatePickerInput
        name="endDate"
        control={control}              // ✅ make sure this is passed
        label="End Date"
        placeholder="Select end date" // ✅ fixed spelling
        errors={errors}
        required="End Date is required"
      />  

                    </Col>

                    <Col sm='3'>
                                              <InputText
            name="discountCanada"
            label="ESSO Discount Cent (Canada)"
            type="number"
            register={register}
            errors={errors}
            rules={{ required: "Esso Discount is required" }}
          />
                      
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col sm='3'>
                        <InputText
            name="discountUSA"
            label="Flying J Discount Cent (USA) "
            type="text"
            register={register}
            errors={errors}
            rules={{ required: " Required" }}
          />
                      
                  
                    </Col>
                   
                    <Col sm='3'>
                          <InputText
            name="Flyingdiscount"
            label=" Flying J Discount Cent (Canada) "
            type="text"
            register={register}
            errors={errors}
            rules={{ required: " Required" }}
          />
                   
                    </Col>
                    <Col sm='3'>
                       <InputText
            name="Petrodiscount"
            label=" Petro Discount Cent (Canada)  "
            placeholder=" "
            type="text"
            register={register}
            errors={errors}
            rules={{ required: " Required" }}
          />
                
                    </Col>
                     <Col sm='3'>
                         <InputText
            name="TaPetrodiscount"
            label=" Ta-Petro & Love Discount Cent (USA)  "
            placeholder=" "
            type="text"
            register={register}
            errors={errors}
            rules={{ required: " Required" }}
          />
                       
                    </Col>
                </Row>
                <Row>
                    {discountSheetCheckBox.map((item, index) => (
                        <Col sm="2">
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







                    <Col sm="4">
                        <div className='text-end'>
                            <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTitle}</Btn>

                        </div>
                    </Col>
                </Row>


            </Form>
        </>
    )
}


export default DiscountSheet
