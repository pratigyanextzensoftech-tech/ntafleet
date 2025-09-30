import React, { useState } from 'react';
import Select from 'react-select'
import { optionscompany,InVoiceSupplier } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText, Container } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
const AddFuel = ({btnTitle}) => {
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
                     <Col sm='4'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  Card Number </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="number"  {...register('cardNo', { required: true })} />
                            </InputGroup>
                            {errors.cardNo && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                     <Col sm='4'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  Policy Number </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="number"  {...register('policyNo', { required: true })} />
                            </InputGroup>
                            {errors.policyNo && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                     <Col sm='4'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  Unit Number  </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="number"  {...register('unitNo', { required: true })} />
                            </InputGroup>
                            {errors.unitNo && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                   </Row>
                   <Row>
                       <Col sm='4'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  Pin Number </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="number"  {...register('pinNo', { required: true })} />
                            </InputGroup>
                            {errors.pinNo && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                  
                 
         <Col sm="4">
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

        <Col sm="4">
                  <FormGroup className="m-form__group">
                    <InputGroup >
                      <InputGroupText>Supplier</InputGroupText>
                      <Controller
                        name="supplier"
                      rules={{ required: "supplier is required" }}
                        
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                                 options={
               InVoiceSupplier // your normal supplier array
            }
                            className="form-control p-0 border-0"
                            placeholder="Select supplier"
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
        <Row >
                     <Col sm='4'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  Driver Name </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('driverName', { required: true })} />
                            </InputGroup>
                            {errors.driverName && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                     <Col sm='4'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  Driver Mobile 1  </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('driverMobile', { required: true })} />
                            </InputGroup>
                            {errors.driverMobile && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                     <Col sm='4'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>   Driver Mobile 1 </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('driverMobile', { required: true })} />
                            </InputGroup>
                            {errors.driverMobile && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                   </Row>           
<Row>
       <Col sm="4">
                  <FormGroup className="m-form__group">
                    <InputGroup >
                      <InputGroupText>Card Status</InputGroupText>
                      <Controller
                        name="cardStatus"
                      rules={{ required: " Required" }}
                        
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                                 options={
               InVoiceSupplier // your normal supplier array
            }
                            className="form-control p-0 border-0"
                            placeholder="Select Card Status"
                          />
                        )}
                      />
                    </InputGroup>

                    {errors.cardStatus && (
                      <span className="text-danger">{errors.cardStatus?.message}</span>
                    )}
                  </FormGroup>
                </Col>
                       <Col sm="8">

<div className='text-end'>
                            <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTitle}</Btn>

                        </div>
                        </Col>
                        </Row>
            
           


        </Form>
    )
}


export default AddFuel
