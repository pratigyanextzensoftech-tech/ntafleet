import React from 'react';
import { Row, Col, Form, FormGroup, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
const EssoFtpLive = ({btnTitle,btnTitle1}) => {
  
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
        <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >
            
                    <Row>
                        <Col sm="5"  md="4" xs="12">
                            <Row>
                                <FormGroup className="m-form__group">
                                    <InputGroup>

                                        <Col xs="3">
                                            <InputGroupText>
                                                From
                                            </InputGroupText>
                                        </Col>
                                        <Col xs="9">
                                            <Controller
                                                name="from"
                                                control={control}
                                                rules={{ required: " Required" }}
                                                render={({ field }) => (
                                                    <DatePicker
                                                        className={`form-control `}
                                                        selected={field.value}
                                                        onChange={(date) => field.onChange(date)}
                                                        dateFormat="yyyy-MM-dd"

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
                        <Col sm="5"  md="4" xs="12">
                            <Row>
                                <FormGroup className="m-form__group">
                                    <InputGroup>
                                        <Col xs="3">

                                            <InputGroupText>
                                                To
                                            </InputGroupText>
                                        </Col>
                                        <Col xs="9">

                                            <Controller
                                                name="to"
                                                control={control}
                                                rules={{ required: "Required" }}
                                                render={({ field }) => (
                                                    <DatePicker
                                                        className={`form-control digits`}
                                                        selected={field.value}
                                                        onChange={(date) => field.onChange(date)}
                                                         dateFormat="yyyy-MM-dd"

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
                         
                            <Col sm="2"  md="4" xs="12">
                    <div className='text-end'>
                        <Btn attrBtn={{ color: "primary", type: "submit" }} >{btnTitle}</Btn>

                    </div>
                </Col> 
                  </Row>


              
         
           
           
            
           
        </Form>
    )
}


export default EssoFtpLive
