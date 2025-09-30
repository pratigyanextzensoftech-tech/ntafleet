import React, { useState } from 'react';
import Select from 'react-select'
import { optionscompany } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText, Container } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
const MoneyCodeListForm = ({btntitle,btnTitle1}) => {
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
                                           Date To
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

         <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  Unit </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('unit', { required: true })} />
                            </InputGroup>
                            {errors.unit && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                   
<Row>
<div className='text-end'>
                            <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btntitle}</Btn>
                                 <button className='btn btn-secondary'>{btnTitle1}</button>

                        </div>
                        </Row>
            
                </Row>
           


        </Form>
    )
}


export default MoneyCodeListForm
