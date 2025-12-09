import React, { useState } from 'react';
import Select from 'react-select'
import { optionscompany } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import useCompany from '../../../Hooks/useCompany';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText, Container } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
const MoneyCodeListForm = ({ btntitle, btnTitle1,onSearch }) => {
    const { companies } = useCompany()
    const {
        register,
        control,
        reset,
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
const payload={
    from:data?.from?formatDate(data?.from):"",
    to:data?.to?formatDate(data.to):"",
    company_id:data?.company?.value?data.company?.value:"",
    company_name:data?.company?.label?data?.company?.label:"",
    unit:data.unit?data?.unit:"",
}
        console.log("Form Data:", data);  // ✅ This will print your inputs
                 if (onSearch) onSearch(payload);
    };

    const handleReset = () => {
        reset(); // reset all fields back to defaultValues (or empty if none given)
    };


    return (
        <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >
            <Row className="mt-3">
                <Col sm="3">
                    <Row>
                        <FormGroup className="m-form__group">
                            <InputGroup>
                                <Col sm="3">
                                    <InputGroupText>
                                        Date From
                                    </InputGroupText>
                                </Col>
                                <Col sm="9">
                                    <Controller
                                        name="from"
                                        control={control}
                                        render={({ field }) => (
                                            <DatePicker
                                                className={`form-control `}
                                                selected={field.value}
                                                onChange={(date) => field.onChange(date)}
                                                dateFormat="yyyy-MM-dd"
                                            />
                                        )}
                                    /></Col>
                            </InputGroup>
                        </FormGroup>
                    </Row>
                </Col>
                <Col sm="3">
                    <Row>
                        <FormGroup className="m-form__group">
                            <InputGroup>
                                <Col sm="3">
                                    <InputGroupText>
                                        Date To
                                    </InputGroupText>
                                </Col>
                                <Col sm="9">
                                    <Controller
                                        name="to"
                                        control={control}
                                        render={({ field }) => (
                                            <DatePicker
                                                className={`form-control digits`}
                                                selected={field.value}
                                                onChange={(date) => field.onChange(date)}
                                                dateFormat="yyyy-MM-dd"
                                            />
                                        )}
                                    />
                                </Col>
                            </InputGroup>
                        </FormGroup>
                    </Row>
                </Col>
                <Col sm="3">
                    <FormGroup className="m-form__group">
                        <InputGroup >
                            <InputGroupText>Company</InputGroupText>
                            <Controller name="company"

                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={companies}
                                        className="form-control p-0 border-0"
                                        placeholder="Select Company Name"
                                             value={field.value}
                    onChange={(val) => field.onChange(val)}

                                    />
                                )}
                            />
                        </InputGroup>


                    </FormGroup>
                </Col>

                <Col sm='3'>
                    <FormGroup className=" m-form__group">
                        <InputGroup>
                            <InputGroupText>  Unit </InputGroupText>
                            <input style={{ border: "1px solid #ccc" }} className="form-control" type="text"  {...register('unit')} />
                        </InputGroup>

                    </FormGroup>
                </Col>

                <Row>
                    <div className='text-end'>
                        <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btntitle}</Btn>
                        <button type="reset" onClick={handleReset} className='btn btn-secondary'>{btnTitle1}</button>

                    </div>
                </Row>

            </Row>



        </Form>
    )
}


export default MoneyCodeListForm
