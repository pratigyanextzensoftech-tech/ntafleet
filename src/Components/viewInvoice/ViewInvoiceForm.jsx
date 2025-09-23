import React, { useState } from 'react';
import Select from 'react-select'
import { checkBoxData, optionscountry, optionscompany,customizedTypeType,invoiceType,InvoiceCategory,InvoiceShow } from '../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText, Container } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
const ViewInvoiceForm = () => {
    const [selectedValues, setSelectedValues] = useState([]);
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

            <fieldset className='inputField' >
                <legend className='legend'>choose Supplier</legend>
                <Row>
                    {checkBoxData.map((item, index) => (
                        <Col sm="3">
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
                <Row className="mt-3">
                    <Col sm="3">
                        <Row>
                            <FormGroup className="m-form__group">
                                <InputGroup>

                                    <Col sm="3">
                                        <InputGroupText>
                                            From
                                        </InputGroupText>
                                    </Col>
                                    <Col sm="9">
                                        <Controller
                                            name="from"
                                            control={control}
                                            rules={{ required: " Required" }}
                                            render={({ field }) => (
                                                <DatePicker
                                                    className={`form-control `}
                                                    selected={field.value}
                                                    onChange={(date) => field.onChange(date)}
                                                />
                                            )}
                                        /></Col>




                                </InputGroup>

                                {errors.from && (
                                    <span className="text-danger">{errors.from.message}</span>
                                )}
                            </FormGroup>
                        </Row>
                    </Col>
                    <Col sm="3">
                        <Row>
                            <FormGroup className="m-form__group">
                                <InputGroup>
                                    <Col sm="3">

                                        <InputGroupText>
                                            To
                                        </InputGroupText>
                                    </Col>
                                    <Col sm="9">

                                        <Controller
                                            name="to"
                                            control={control}
                                            rules={{ required: "Required" }}
                                            render={({ field }) => (
                                                <DatePicker
                                                    className={`form-control digits`}
                                                    selected={field.value}
                                                    onChange={(date) => field.onChange(date)}
                                                />
                                            )}
                                        />
                                    </Col>
                                </InputGroup>

                                {errors.to && (
                                    <span className="text-danger">{errors.to.message}</span>
                                )}
                            </FormGroup>
                        </Row>
                    </Col>



                    <Col sm="3">
                        <FormGroup className="m-form__group">
                            <InputGroup >
                                <InputGroupText>Company</InputGroupText>
                                <Controller name="company"
                                    rules={{ required: "company Name is required" }}

                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={optionscompany}
                                            className="form-control p-0 border-0"
                                            placeholder="Select Company Name"
                                        />
                                    )}
                                />
                            </InputGroup>

                            {errors.company && (
                                <span className="text-danger">{errors.company?.message}</span>
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
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={optionscountry}
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

                    <Col sm="3">
                        <FormGroup className="m-form__group">
                            <InputGroup>
                                <InputGroupText>
                                    Invoice Type
                                </InputGroupText>
                                <Controller name="company"
                                    rules={{ required: "company Name is required" }}

                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={invoiceType}
                                            className="form-control p-0 border-0"
                                        />
                                    )}
                                />

                            </InputGroup>
                            {errors.to && (
                                <span className="text-danger">{errors.to.message}</span>
                            )}
                        </FormGroup>
                    </Col>



                    <Col sm="3">
                        <FormGroup className="m-form__group">
                            <InputGroup >
                                <InputGroupText>Invoice Category
                                </InputGroupText>
                                <Controller name="category"
                                    rules={{ required: "company Name is required" }}

                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={InvoiceCategory}
                                            className="form-control p-0 border-0"
                                        />
                                    )}
                                />
                            </InputGroup>

                            {errors.category && (
                                <span className="text-danger">{errors.category?.message}</span>
                            )}
                        </FormGroup>
                    </Col>

                    <Col sm="3">
                        <FormGroup className="m-form__group">
                            <InputGroup>
                                <InputGroupText>Invoice(Show/Hide) </InputGroupText>
                                <Controller
                                    name="invoice"
                                    rules={{ required: "country is required" }}

                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={InvoiceShow}
                                            className="form-control p-0 border-0"
                                        />
                                    )}
                                />
                            </InputGroup>

                            {errors.invoice && (
                                <span className="text-danger">{errors.invoice?.message}</span>
                            )}
                        </FormGroup>
                    </Col>
                    <Col sm="3">
                        <div className='text-end'>
                            <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >Search Data</Btn>
                            <btn  className="m-r-15 btn btn-primary"  onClick={handleReset} >Reset</btn>

                        </div>
                    </Col>
                </Row>

            </fieldset>

        </Form>
    )
}


export default ViewInvoiceForm
