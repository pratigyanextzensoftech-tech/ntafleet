import React, { useState } from 'react';
import Select from 'react-select'
import {  optionscompany, discountSheetCheckBox } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Label, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import HeaderCard from '../../Common/Component/HeaderCard';
const DiscountSheet = ({ title, btnTitle }) => {
        const [selectedValues, setSelectedValues] = useState([]);
    
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
                            <Row>
                                <InputGroup>

                                    <Col sm="4">        <InputGroupText>Start Date</InputGroupText>
                                    </Col>
                                    <Col sm="8">
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

                                    </Col>

                                </InputGroup>
                                {errors.startDate && (
                                    <span className="text-danger">{errors.startDate.message}</span>
                                )}
                            </Row>



                        </FormGroup>
                    </Col>
                    <Col sm="3">
                        <FormGroup className="m-form__group">
                            <InputGroup>
                                <Col sm="4">
                                    <InputGroupText>End Date</InputGroupText>
                                </Col>
                                <Col sm="8">

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
                                </Col>

                            </InputGroup>
                            {errors.endDate && (
                                <span className="text-danger">{errors.endDate.message}</span>
                            )}
                        </FormGroup>

                    </Col>

                    <Col sm='3'>
                        <FormGroup className=" m-form__group">
                            <InputGroup>
                                <InputGroupText>  ESSO Discount Cent (Canada)  </InputGroupText>
                                <input style={{ border: "1px solid #ccc" }} className="form-control " type="text"  {...register('discountCanada', { required: true })} />
                            </InputGroup>
                            {errors.discountCanada && (
                                <span className="text-danger"> Required</span>
                            )}
                        </FormGroup>
                    </Col>








                </Row>
                <Row className="mt-3">
                    <Col sm='3'>
                        <FormGroup className=" m-form__group">
                            <InputGroup>
                                <InputGroupText> Flying J Discount Cent (USA) </InputGroupText>
                                <input style={{ border: "1px solid #ccc" }} className="form-control " type="text"  {...register('discountUSA', { required: true })} />
                            </InputGroup>
                            {errors.discountUSA && (
                                <span className="text-danger"> Required</span>
                            )}
                        </FormGroup>
                    </Col>
                   
                    <Col sm='3'>
                        <FormGroup className=" m-form__group">
                            <InputGroup>
                                <InputGroupText>  Flying J Discount Cent (Canada)  </InputGroupText>
                                <input style={{ border: "1px solid #ccc" }} className="form-control " type="text"  {...register('Flyingdiscount', { required: true })} />
                            </InputGroup>
                            {errors.Flyingdiscount && (
                                <span className="text-danger"> Required</span>
                            )}
                        </FormGroup>
                    </Col>
                    <Col sm='3'>
                        <FormGroup className=" m-form__group">
                            <InputGroup>
                                <InputGroupText> Petro Discount Cent (Canada) </InputGroupText>
                                <input style={{ border: "1px solid #ccc" }} className="form-control " type="text"  {...register('Petrodiscount', { required: true })} />
                            </InputGroup>
                            {errors.Petrodiscount && (
                                <span className="text-danger"> Required</span>
                            )}
                        </FormGroup>
                    </Col>
                     <Col sm='3'>
                        <FormGroup className=" m-form__group">
                            <InputGroup>
                                <InputGroupText> Ta-Petro & Love Discount Cent (USA) </InputGroupText>
                                <input style={{ border: "1px solid #ccc" }} className="form-control " type="text"  {...register('TaPetrodiscount', { required: true })} />
                            </InputGroup>
                            {errors.TaPetrodiscount && (
                                <span className="text-danger"> Required</span>
                            )}
                        </FormGroup>
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
