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


    
    return (
<fieldset className='inputField'>
        <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >
           
               
                    <Row className="mt-3">
                      <Col sm="4">
                                                 <FormGroup className=" m-form__group">
                                                     <InputGroup>
                                                         <InputGroupText>Name</InputGroupText>
                                                         <Input className="form-control" type="text" />
                                                     </InputGroup>
                                                 </FormGroup>
                     
                                             </Col>




                         <Col sm="4">
                                                    <FormGroup className=" m-form__group">
                                                        <InputGroup>
                                                            <InputGroupText>Value</InputGroupText>
                                                            <Input className="form-control" type="text" />
                                                        </InputGroup>
                                                    </FormGroup>
                        
                                                </Col>
 
                        <Col sm="4">
                                                   <FormGroup className=" m-form__group">
                                                       <InputGroup>
                                                           <InputGroupText>Ord</InputGroupText>
                                                           <Input className="form-control" type="text" />
                                                       </InputGroup>
                                                   </FormGroup>
                       
                                               </Col>
                                               </Row><Row>
                                                <Col sm="4">
                                                                           <FormGroup className=" m-form__group">
                                                                               <InputGroup>
                                                                                   <InputGroupText>Rack</InputGroupText>
                                                                                   <Input className="form-control" type="text" />
                                                                               </InputGroup>
                                                                           </FormGroup>
                                               
                                                                       </Col>
  <Col sm="8">
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
