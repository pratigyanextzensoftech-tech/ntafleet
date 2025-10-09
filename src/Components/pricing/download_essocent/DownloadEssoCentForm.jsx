import React, { useState } from 'react';
import Select from 'react-select'
import { groupBy, optionscountry, displayFeatureCheckBox, chooseSupplierCheckBox, optionscompany, invoiceType, orderBy, fuelType, currency, InvoiceCategory, InvoiceShow, exportType, VolUnit } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText, Card, CardBody } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
const DownloadEssoCentForm = ({btnTitle}) => {
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
                                                    <Row>
                                                        <FormGroup className="m-form__group">
                                                            <InputGroup>
                        
                                                                <Col sm="3">
                                                                    <InputGroupText>
Pricing Form Date                                                                    </InputGroupText>
                                                                </Col>
                                                                <Col sm="9">
                                                                    <Controller
                                                                        name="fromDate"
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
                        
                                                            {errors.fromDate && (
                                                                <span className="text-danger">{errors.fromDate.message}</span>
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
                                                                        Pricing Upto Date
                                                                    </InputGroupText>
                                                                </Col>
                                                                <Col sm="9">
                                                                    <Controller
                                                                        name="uptoDate"
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
                        
                                                            {errors.uptoDate && (
                                                                <span className="text-danger">{errors.uptoDate.message}</span>
                                                            )}
                                                        </FormGroup>
                                                    </Row>
                             </Col>
  <Col sm="3">
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
