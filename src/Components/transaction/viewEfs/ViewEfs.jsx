import React, { useState } from 'react';
import Select from 'react-select'
import {  chooseSupplierCheckBox, optionscompany, invoiceType,  currency } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText, Card, CardBody } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
const ViewEfs = ({btnTitle,btnTitle1}) => {
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
                            <FormGroup className=" m-form__group">
                                <InputGroup>
                                    <InputGroupText>State Prov </InputGroupText>
                                    <Input className="form-control" type="text" />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                             <Col sm="3">
                            <FormGroup className=" m-form__group">
                                <InputGroup>
                                    <InputGroupText>Unit </InputGroupText>
                                    <Input className="form-control" type="text" />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                     
                    </Row>
<Row>
 <Col sm="3">
                            <FormGroup className=" m-form__group">
                                <InputGroup>
                                    <InputGroupText> Card No.</InputGroupText>
                                    <Input className="form-control" type="text" />
                                </InputGroup>
                            </FormGroup>
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
                                <InputGroup >
                                    <InputGroupText>Currency</InputGroupText>
                                    <Controller name="currency"
                                        rules={{ required: "currency is required" }}

                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={currency}
                                                className="form-control p-0 border-0"
                                                placeholder="Select Currency"
                                            />
                                        )}
                                    />
                                </InputGroup>

                                {errors.currency && (
                                    <span className="text-danger">{errors.currency?.message}</span>
                                )}
                            </FormGroup>
                        </Col>
                         <Col sm="3">
                            <FormGroup className="m-form__group">
                                <InputGroup >
                                    <InputGroupText>Items</InputGroupText>
                                    <Controller name="items"
                                        rules={{ required: "Items is required" }}

                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={optionscompany}
                                                className="form-control p-0 border-0"
                                                placeholder="Select Items"
                                            />
                                        )}
                                    />
                                </InputGroup>

                                {errors.items && (
                                    <span className="text-danger">{errors.items?.message}</span>
                                )}
                            </FormGroup>
                        </Col>
</Row>
<Row>
      <Col sm="3">
                            <FormGroup className="m-form__group">
                                <InputGroup >
                                    <InputGroupText>Invoice Status</InputGroupText>
                                    <Controller name="status"
                                        rules={{ required: "status is required" }}

                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={optionscompany}
                                                className="form-control p-0 border-0"
                                                placeholder="Select status"
                                            />
                                        )}
                                    />
                                </InputGroup>

                                {errors.status && (
                                    <span className="text-danger">{errors.status?.message}</span>
                                )}
                            </FormGroup>
                        </Col>
                         <Col sm="3">
                            <FormGroup className="m-form__group">
                                <InputGroup >
                                    <InputGroupText>Invoice Type</InputGroupText>
                                    <Controller name="type"
                                        rules={{ required: "type is required" }}

                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={invoiceType}
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
                          <Col sm="6">
                    <div className='text-end'>
                        <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTitle}</Btn>
                                 <button className='btn btn-secondary'>{btnTitle1}</button>

                    </div>
                </Col>
</Row>


              
         
           
           
            
           
        </Form>
    )
}


export default ViewEfs
