import React, { useState } from 'react';
import Select from 'react-select'
import {  optionscompany } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import useCompany from '../../../Hooks/useCompany';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText, Container } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DropDown from '../../Forms/FormControl/formInput/DropDown';
import DatePickerInput from '../../Forms/FormControl/formInput/DatePickerInput';
const List = ({btnTitle1}) => {
    const [selectedValues, setSelectedValues] = useState([]);
          const { companies: companyOptions, loading: companyLoading } = useCompany();

    const {
        register,
        control,
        reset,
        handleSubmit,
        formState: { errors, isSubmitted, isValid },
    } = useForm();

    const onSubmit = (data) => {

        console.log("Form Data:", data);  // ✅ This will print your inputs
        // alert("Form submitted successfully!");

    };
    const handleReset = () => {
    reset(); // reset all fields back to defaultValues (or empty if none given)
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

        <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >

           
             
                <Row className="mt-3">
                    <Col sm="3">
                      <DatePickerInput
        name="from"
        control={control}              // ✅ make sure this is passed
        label=" From Date"
        errors={errors}
        required="Required"
      />   
                   
                    </Col>
                    <Col sm="3">
                      <DatePickerInput
        name="to"
        control={control}              // ✅ make sure this is passed
        label=" To"
        errors={errors}
        required="Required"
      />   
                     
                    </Col>
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

<div className='text-end'>
                            <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >Search Data</Btn>

                        </div>
                        </Col>
            
                </Row>
           


        </Form>
    )
}


export default List
