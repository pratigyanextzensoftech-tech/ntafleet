import React, { useState } from 'react';
import Select from 'react-select'
import { optionscompany, MoneyCodeStatus } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText, Container } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
const UploadForm = ({ btntitle, btnTitle1 }) => {
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

        <Form noValidate='' onSubmit={handleSubmit(onSubmit)} >
            <Row>
                <Col sm="10">
                    <Row>
                        <Col className='px-0' sm="2">

                            <InputGroupText className='h-100'>Select File</InputGroupText>
                        </Col>
                        <Col className='px-0' sm="10">

                            <Input style={{ border: "1px solid #ccc" }} className="form-control w-100c " type="file" />
                        </Col>
                    </Row>
                </Col>
                <Col sm="2" >
                    <div className='text-end'>
                        <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btntitle}</Btn>
                    </div>
                </Col>
            </Row>

        </Form>
    )
}


export default UploadForm
