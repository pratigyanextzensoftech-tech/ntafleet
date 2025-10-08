import React, { useState } from 'react';
import Select from 'react-select'
import { transactionCheckBox, supplier, checkBoxData, currency, InVoiceSupplier, optionscountry, Upload_Supplier,Customized_Supplier, invoiceType1 } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText, Card, CardBody } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
const EssoOwner = ({ btnTtitle,type }) => {
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
        <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >
            <Row>
                <Col sm="3">
                    <Row>
                        <FormGroup className="m-form__group">
                            <InputGroup>

                                <Col sm="4">
                                    <InputGroupText>
                                        Start
                                    </InputGroupText>
                                </Col>
                                <Col sm="8">
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
                <Col sm="3">
                    <Row>
                        <FormGroup className="m-form__group">
                            <InputGroup>
                                <Col sm="3">

                                    <InputGroupText>
                                        End
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
                <Col sm="3">
                    <FormGroup className="m-form__group">
                        <InputGroup >
                            <InputGroupText>Supplier</InputGroupText>
                            <Controller
                                name="supplier"
                                defaultValue={type==="ultramar"?Customized_Supplier[1]:InVoiceSupplier[2]}
                                control={control}
                                rules={{ required: "Supplier is required" }}

                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        className="form-control p-0 border-0"
                                        placeholder="Select supplier"
                                        onChange={(selectedOption) => field.onChange(selectedOption)}
                                        value={field.value}
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
                        <InputGroup>
                            <InputGroupText>Country</InputGroupText>
                            <Controller
                                name="country"
                                rules={{ required: "country is required" }}
                                control={control}
                                defaultValue={optionscountry[2]}
                                render={({ field }) => (
                                    <Select
                                        {...field}
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
                <Col sm="3">
                    <FormGroup className="m-form__group">
                        <InputGroup >
                            <InputGroupText>Invoice Type</InputGroupText>
                            <Controller name="type"
                                rules={{ required: "type is required" }}
                                defaultValue={invoiceType1[3]}
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        className="form-control p-0 border-0"
                                        placeholder="Select type"
                                    />
                                )}
                            />
                        </InputGroup>

                        {errors.type && (
                            <span className="text-danger">{errors.type?.message}</span>
                        )}
                    </FormGroup>
                </Col>
                 <Col>
                    <div className='text-end'>
                        <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTtitle}</Btn>

                    </div>
                </Col>
            </Row>
           


            
        </Form>
    )
}


export default EssoOwner
