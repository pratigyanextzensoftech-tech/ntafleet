import React, { useState } from 'react';
import { Row, Col, Form, } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm } from 'react-hook-form';
import DatePickerInput from '../../Forms/FormControl/formInput/DatePickerInput';
import InputText from '../../Forms/FormControl/formInput/InputText';
const Upload = ({btnTitle}) => {
    const {
        register,
        control,
        reset,
        handleSubmit,
        formState: { errors, isSubmitted, isValid },
    } = useForm();

const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
  };

    const onSubmit = (data) => {

        console.log("Form Data:", data);  // ✅ This will print your inputs
        // alert("Form submitted successfully!");

    };
  

    return (

        <Form className='px-2' noValidate='' onSubmit={handleSubmit(onSubmit)}  >
                <Row className="mt-3">
               <Col xl="4" md='6'>
                                         <Row>
                                       
                                       <InputText
            name="file"
            label="File"
            type="file"
            register={register}
            errors={errors}
            rules={{ required: " Required" }}
          />
                                                                   
                                                                                               </Row>
                                      </Col>
         <Col  xl="4" md='6'>
                        <Row>
                                <DatePickerInput
        name="endDate"
        control={control}              // ✅ make sure this is passed
        label="Date"
        errors={errors}
        required=" Date is required"
        portalId="root"
        popperPlacement="bottom-start"
      />     
                        </Row>
                    </Col>

         <Col  xl="4" md='12'>
                       
                   
                   
<div className='text-end'>
                            <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTitle}</Btn>

                        </div>
             </Col>
                </Row>
           


        </Form>
    )
}


export default Upload
