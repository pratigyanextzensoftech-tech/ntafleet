import React, { useState } from 'react';
import { Row, Col, Form } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import DropDown from '../../Forms/FormControl/formInput/DropDown';
import DatePickerInput from '../../Forms/FormControl/formInput/DatePickerInput';
import useCompany from '../../../Hooks/useCompany';
const DownloadEssoCentForm = ({ btnTitle, Data }) => {
    const [selectedValues, setSelectedValues] = useState([]);
    // const [showMessage, setShowMessage] = useState(true);
    const { companies: companyOptions, loading: companyLoading } = useCompany();
    const {
        register,
        control,
        reset,
        handleSubmit,
        formState: { errors, isSubmitted, isValid },
    } = useForm();

    const onSubmit = (data) => {
        const payload = {
            company_id: data.company?.label,   // ✅ only id
            from_date: new Date(data.fromDate).toISOString().split("T")[0], // ✅ YYYY-MM-DD
            upto_date: new Date(data.uptoDate).toISOString().split("T")[0]
        };
        console.log(payload)

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
        <fieldset className='inputField'>
            <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >


                <Row className="mt-3">
                    <Col sm="3">
                        <DropDown
                            name="company"
                            label="Company"
                            control={control}
                            errors={errors}
                            rules={{ required: "Company is required" }}
                            placeholder="All Company"
                            // loading={companyLoading}
                            options={companyOptions}
                        />
                    </Col> 

                    <Col sm="4">
                        <Row>
                            <DatePickerInput
                                name="fromDate"
                                control={control}
                                label="Pricing Form Date"
                                errors={errors}
                                required="Required"
                            />

                        </Row>
                    </Col>

                    <Col sm="4">
                        <Row>
                            <DatePickerInput
                                name="uptoDate"
                                control={control}
                                label="Pricing Upto Date"
                                errors={errors}
                                required="Required"
                            />


                        </Row>
                    </Col>
                    <Col sm="1">
                        <div className='text-end'>
                            <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTitle}</Btn>
                        </div>
                    </Col>
                </Row>
 
            </Form>
        </fieldset>
    )
}


export default DownloadEssoCentForm
