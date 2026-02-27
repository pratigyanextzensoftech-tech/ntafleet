import React, { useState } from 'react';
import { Row, Col, Form } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm } from 'react-hook-form';
import DropDown from '../../Forms/FormControl/formInput/DropDown';
import DatePickerInput from '../../Forms/FormControl/formInput/DatePickerInput';
import useCompany from '../../../Hooks/useCompany';
const List = ({ btnTitle1,onSearch }) => {
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

    const onSubmit = (formData) => {
        console.log(formData);
        const payload = {
      from: formData?.from ? formatDate(formData.from) : "",
      to: formData?.to ? formatDate(formData.to) : "",
      company_id: formData?.company?.value?formData?.company?.value  : "",
    company_name: formData?.company?.label?formData?.company?.label : ""
    }
        console.log(payload);
         if (onSearch) onSearch(payload);

    };
    const handleReset = () => {
        reset(); // reset all fields back to defaultValues (or empty if none given)
    };
    return (

        <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >
            <Row className="mt-3">
                <Col xxl="3" md="6">
                    <Row>
                        <DatePickerInput
                            name="from"
                            id="drom"
                            control={control}              // ✅ make sure this is passed
                            label="From Date"
                            required="Required"
                        />

                    </Row>
                </Col>
                <Col xxl="3" md="6">
                    <DatePickerInput
                        name="to"
                        id="to"
                        control={control}              // ✅ make sure this is passed
                        label="To"
                        required="Required"
                    />
                    <Row>

                    </Row>
                </Col>
                <Col xxl="3" md="6">
                    <DropDown
                        name="company"
                        id="company"
                        label="Company"
                        control={control}
                        placeholder="Select Company"
                        setValue={setValue}
                        // loading={companyLoading}
                        options={companyOptions}
                    />

                </Col>



                <Col xxl="3" md="6">

                    <div className='text-end'>
                        <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >Search Data</Btn>
                        <button type='reset' onClick={handleReset}  className='btn btn-secondary'>{btnTitle1}</button>

                    </div>
                </Col>

            </Row>



        </Form>
    )
}


export default List
