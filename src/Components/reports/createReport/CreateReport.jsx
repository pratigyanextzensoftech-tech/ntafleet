import React, { useState } from 'react';
import Select from 'react-select'
import { groupBy, optionscountry, displayFeatureCheckBox, chooseSupplierCheckBox, optionscompany, invoiceType, orderBy, fuelType, currency, InvoiceCategory, InvoiceShow, exportType, VolUnit } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText, Card, CardBody } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
const CreateReport = () => {
    const [selectedValues, setSelectedValues] = useState([]);
    const [showMessage, setShowMessage] = useState(true);

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
        if (isValid) {
            setShowMessage(false); // hide only when form is completely valid
        }
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
            <div className="my-3 py-3">
                <fieldset className='inputField' >
                    <legend className='legend'>
                        Cover transactions in date range</legend>
                    <Row className="mt-3">
                        <Col sm="9">
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
                            <FormGroup className=" m-form__group">
                                <InputGroup>
                                    <InputGroupText>Report File Name</InputGroupText>
                                    <Input className="form-control" type="text" />
                                </InputGroup>
                            </FormGroup>

                        </Col>


                    </Row>

                    <Row>
                        <Col sm="4">
                            <Row>
                                <FormGroup className="m-form__group">
                                    <InputGroup>

                                        <Col sm="3">
                                            <InputGroupText>
                                                start Date
                                            </InputGroupText>
                                        </Col>
                                        <Col sm="9">
                                            <Controller
                                                name="start"
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

                                    {errors.start && (
                                        <span className="text-danger">{errors.start.message}</span>
                                    )}
                                </FormGroup>
                            </Row>
                        </Col>
                        <Col sm="4">
                            <Row>
                                <FormGroup className="m-form__group">
                                    <InputGroup>
                                        <Col sm="3">

                                            <InputGroupText>
                                                End Date
                                            </InputGroupText>
                                        </Col>
                                        <Col sm="9">

                                            <Controller
                                                name="end"
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

                                    {errors.end && (
                                        <span className="text-danger">{errors.end.message}</span>
                                    )}
                                </FormGroup>
                            </Row>
                        </Col>
                        <Col sm="4">
                            <FormGroup className="m-form__group">
                                <InputGroup>
                                    <InputGroupText>
                                        Export Type
                                    </InputGroupText>
                                    <Controller name="company"
                                        rules={{ required: "company Name is required" }}

                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={exportType}
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
                    </Row>



                </fieldset>

            </div>
            <div className="my-3 py-3">
                <fieldset className='inputField ' >
                    <legend className='legend'>
                        Choose Supplier Check All </legend>
                    <Row>
                        {chooseSupplierCheckBox.map((item, index) => (
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

                </fieldset>
            </div>
            <div className="my-3 py-3">
                <fieldset className='inputField' >
                    <legend className='legend'>
                        Display features (optional) </legend>
                    <Row>
                        {displayFeatureCheckBox.map((item, index) => (
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

                </fieldset>
            </div>
            <div className="my-3 py-3">
                <fieldset className='inputField' >
                    <legend className='legend'>
                        Display Filters (optional) </legend>
                    <Row className="mt-3">

                        <Col sm="3">
                            <FormGroup className="m-form__group">
                                <InputGroup>
                                    <InputGroupText>
                                        Filter By Country <span className="text-danger fw-bold mx-1">*</span>
                                    </InputGroupText>
                                    <Controller name="country"
                                        rules={{ required: "country Name is required" }}

                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={optionscountry}
                                                className="form-control p-0 border-0"
                                            />
                                        )}
                                    />

                                </InputGroup>
                                {errors.country && (
                                    <span className="text-danger">{errors.country.message}</span>
                                )}
                            </FormGroup>
                        </Col>
                      


                     

                        <Col sm="3">
                            <FormGroup className="m-form__group">
                                <InputGroup >
                                    <InputGroupText>Group By
                                    </InputGroupText>
                                    <Controller name="category"
                                        rules={{ required: "company Name is required" }}

                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={groupBy}
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
                                    <InputGroupText>Order By </InputGroupText>
                                    <Controller
                                        name="invoice"
                                        rules={{ required: "country is required" }}

                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={orderBy}
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
                            <FormGroup className="m-form__group">
                                <InputGroup>
                                    <InputGroupText>Volume Unit </InputGroupText>
                                    <Controller
                                        name="invoice"
                                        rules={{ required: "country is required" }}

                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={VolUnit}
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

                    </Row>
                    <Row>
                        <Col sm="3">
                            <FormGroup className="m-form__group">
                                <InputGroup>
                                    <InputGroupText>Fuel Type </InputGroupText>
                                    <Controller
                                        name="invoice"
                                        rules={{ required: "country is required" }}

                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={fuelType}
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
                            <FormGroup className="m-form__group">
                                <InputGroup>
                                    <InputGroupText>Currency </InputGroupText>
                                    <Controller
                                        name="invoice"
                                        rules={{ required: "country is required" }}

                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={currency}
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
                    </Row>
                </fieldset>

            </div>
            <div className="my-3 py-3">
                <fieldset className='inputField' >
                    <legend className='legend'>
                        Match by (optional) </legend>
                    <Row className="mt-3">

                        <Col sm="4">
                            <FormGroup className=" m-form__group">
                                <InputGroup>
                                    <InputGroupText>Fuel Card</InputGroupText>
                                    <Input className="form-control" type="text" />
                                </InputGroup>
                            </FormGroup>
                        </Col>



                        <Col sm="4">
                            <FormGroup className=" m-form__group">
                                <InputGroup>
                                    <InputGroupText>Driver Name</InputGroupText>
                                    <Input className="form-control" type="text" />
                                </InputGroup>
                            </FormGroup>
                        </Col>

                        <Col sm="4">
                            <FormGroup className=" m-form__group">
                                <InputGroup>
                                    <InputGroupText>Unit Number</InputGroupText>
                                    <Input className="form-control" type="text" />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Row>
                            <Col sm="4">
                                <FormGroup className=" m-form__group">
                                    <InputGroup>
                                        <InputGroupText>City</InputGroupText>
                                        <Input className="form-control" type="text" />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col sm="4">
                                <FormGroup className="m-form__group">
                                    <InputGroup>
                                        <InputGroupText>
                                            State
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
                        </Row>

                    </Row>
                </fieldset>

            </div>
            <Row>
                <Col sm="9">
                    {showMessage && (
                        <marquee direction="right" className="text-danger mt-3 fw-bold">
                            All fields marked with * are mandatory.
                        </marquee>
                    )}
                </Col>

                <Col sm="3">
                    <div className='text-end'>
                        <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >Create Reports</Btn>

                    </div>
                </Col>
            </Row>
        </Form>
        </fieldset>
    )
}


export default CreateReport
