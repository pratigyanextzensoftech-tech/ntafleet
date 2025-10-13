import React, { useState } from 'react';
import Select from 'react-select'
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText, Card, CardBody } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import { optionscountry,supplier, chooseSupplierCheckBox, invoiceType,  currency,optionscompany,checkBoxData } from '../Forms/FormWidget/FormSelect2/OptionDatas';
const  ReportDashboardForm= ({btnTitle,btnTitle1}) => {
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
                            <FormGroup className="m-form__group">
                                <InputGroup>
                                    <InputGroupText>
                                        Country
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
                                    <InputGroupText>Supplier</InputGroupText>
                                <Controller
  name="supplier"
  control={control}
  rules={{ required: "Supplier is required" }}

  render={({ field }) => (
    <Select
      {...field}
      className="form-control p-0 border-0"
      options={supplier}
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
                    </Row>
            <div className="mt-3 mb-1 py-3">
                <div className="my-3 py-3">
                <fieldset className='inputField ' >
                    <legend className='legend'>
                       Select Company select All </legend>
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

                </fieldset>
            </div>
                 </div>  

                

<Row>
     
                          <Col sm="12">
                    <div className='text-end'>
                        <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTitle}</Btn>
                                 <button className='btn btn-secondary'>{btnTitle1}</button>
                    </div>
                </Col>
</Row>
        </Form>
    )
}
export default ReportDashboardForm
