import React, { useState } from 'react';
import { optionscompany } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form,Card,CardBody } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm } from 'react-hook-form';
import DropDown from '../../Forms/FormControl/formInput/DropDown';
import DatePickerInput from '../../Forms/FormControl/formInput/DatePickerInput';
import useCompany from '../../../Hooks/useCompany';
const List = ({ btnTitle1 }) => {
    const [selectedValues, setSelectedValues] = useState([]);
    const { companies: companyOptions, loading: companyLoading } = useCompany();

  
    const {
        reset,
        register,
        control,
        setValue,
        handleSubmit,
        formState: { errors, isSubmitted, isValid },
      } = useForm();
    
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
  };

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
                    <Row>
                        <DatePickerInput
                            name=" from"
                            control={control}              // ✅ make sure this is passed
                            label="From Date"
                            required="Required"
                        />

                    </Row>
                </Col>
                <Col sm="3">
                    <DatePickerInput
                        name=" to"
                        control={control}              // ✅ make sure this is passed
                        label="To"
                        required="Required"
                    />
                    <Row>

                    </Row>
                </Col>
                <Col sm="3">
                    <DropDown
                        name="company"
                        label="Company"
                        control={control}
                        rules={{ required: "Company is required" }}
                        placeholder="Select Company"
                        setValue={setValue}
                        // loading={companyLoading}
                        options={companyOptions}
                    />

                </Col>



                <Col sm="3">

                    <div className='text-end'>
                        <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >Search Data</Btn>
                        <button className='btn btn-secondary'>{btnTitle1}</button>

                    </div>
                </Col>

            </Row>



        </Form>
    )
}


export default List
