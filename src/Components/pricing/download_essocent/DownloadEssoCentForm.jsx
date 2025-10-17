import React, { useState } from 'react';
import Select from 'react-select'
import { groupBy, optionscountry, displayFeatureCheckBox, chooseSupplierCheckBox, optionscompany, invoiceType, orderBy, fuelType, currency, InvoiceCategory, InvoiceShow, exportType, VolUnit } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText, Card, CardBody } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import DropDown from '../../Forms/FormControl/formInput/DropDown';
import DatePickerInput from '../../Forms/FormControl/formInput/DatePickerInput';
import useCompany from '../../../Hooks/useCompany';
const DownloadEssoCentForm = ({btnTitle}) => {
    const [selectedValues, setSelectedValues] = useState([]);
    const [showMessage, setShowMessage] = useState(true);
  const { companies: companyOptions, loading: companyLoading } = useCompany();

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
<DropDown
           name="company"
  label="Company"
  control={control}
          errors={errors}
  rules={{ required: "Company is required" }}
  placeholder="All Company"
  // loading={companyLoading}
  options={companyOptions}
 />
                        </Col>




                        <Col sm="4">
                                                    <Row>
                                                         <DatePickerInput
        name="fromDate"
        control={control}             
        label="Pricing Form Date"                                                                   
        errors={errors}
                required="Required"
      />
                                                   
                                                    </Row>
                             </Col>
 
                           <Col sm="4">
                                                    <Row>
                                                     <DatePickerInput
        name="uptoDate"
        control={control}             
        label="Pricing Upto Date"                                                                
        errors={errors}
                required="Required"
      />
                                                           
                                                    
                                                    </Row>
                             </Col>
  <Col sm="1">
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
