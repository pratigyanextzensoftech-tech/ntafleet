import React, { useState } from 'react';
import Select from 'react-select'
import { optionscompany,MoneyCodeStatus } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText, Container } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
const AddMoneyCodeForm = ({btntitle,btnTitle1}) => {
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
                                <InputGroupText>Status</InputGroupText>
                                <Controller name="status"
                                    rules={{ required: "company Name is required" }}

                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={MoneyCodeStatus}
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
         <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  Ref# </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control " type="text"  {...register('ref', { required: true })} />
                            </InputGroup>
                            {errors.ref && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                         <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  Voided </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('voided', { required: true })} />
                            </InputGroup>
                            {errors.voided && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
           <Row>
             <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  Issue Type </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('issueType', { required: true })} />
                            </InputGroup>
                            {errors.issueType && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                         <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  Issued By </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('issueBy', { required: true })} />
                            </InputGroup>
                            {errors.issueBy && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                         <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  Issued To </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('issueTo', { required: true })} />
                            </InputGroup>
                            {errors.issueTo && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                         <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  Issued Date </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('issueDate', { required: true })} />
                            </InputGroup>
                            {errors.issueDate && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
            </Row> 
                <Row>
             <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText> Fee </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('Fee', { required: true })} />
                            </InputGroup>
                            {errors.Fee && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                         <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  Original Amt </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('originalAmt', { required: true })} />
                            </InputGroup>
                            {errors.originalAmt && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                         <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  Bill Date </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('billdate', { required: true })} />
                            </InputGroup>
                            {errors.billdate && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                         <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText> Check Num </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('checkNum', { required: true })} />
                            </InputGroup>
                            {errors.checkNum && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
            </Row> 
              <Row>
             <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText> Date Used </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('dateUsed', { required: true })} />
                            </InputGroup>
                            {errors.dateUsed && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                       
                         <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText> Amount Used </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('amountUsed', { required: true })} />
                            </InputGroup>
                            {errors.amountUsed && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                         <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText> Currency </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('currency', { required: true })} />
                            </InputGroup>
                            {errors.currency && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                          <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  One Time </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('oneTime', { required: true })} />
                            </InputGroup>
                            {errors.oneTime && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
            </Row>   
              <Row>
             <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText> Exact Amt </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('exactAmount', { required: true })} />
                            </InputGroup>
                            {errors.exactAmount && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                       
                         <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText> Expire Date </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('expireDate', { required: true })} />
                            </InputGroup>
                            {errors.expireDate && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                         <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText> Name </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('name', { required: true })} />
                            </InputGroup>
                            {errors.name && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                          <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  City </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('city', { required: true })} />
                            </InputGroup>
                            {errors.city && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
            </Row>  
                <Row>
             <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText> State </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('state', { required: true })} />
                            </InputGroup>
                            {errors.state && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                       
                         <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText> Phone </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('phone', { required: true })} />
                            </InputGroup>
                            {errors.phone && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                         <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText> Driver License </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('license', { required: true })} />
                            </InputGroup>
                            {errors.license && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                          <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  Driver State </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('driverState', { required: true })} />
                            </InputGroup>
                            {errors.driverState && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
            </Row> 
              <Row>
             <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText> Driver Id </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('driverId', { required: true })} />
                            </InputGroup>
                            {errors.driverId && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                       
                         <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText> Hubometer </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('phone', { required: true })} />
                            </InputGroup>
                            {errors.Hubometer && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                         <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText> Reefer Hours</InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('refeerHours', { required: true })} />
                            </InputGroup>
                            {errors.refeerHours && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                          <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText> License State </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('licenseState', { required: true })} />
                            </InputGroup>
                            {errors.licenseState && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
            </Row>  
                 <Row>
             <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText> License Number</InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('LicenseNo', { required: true })} />
                            </InputGroup>
                            {errors.LicenseNo && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                       
                         <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText> Odometer </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('Odometer', { required: true })} />
                            </InputGroup>
                            {errors.Odometer && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                         <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>PO Number</InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('PONo', { required: true })} />
                            </InputGroup>
                            {errors.PONo && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                          <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>Trip Number </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('TripNo', { required: true })} />
                            </InputGroup>
                            {errors.TripNo && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
            </Row>   
                <Row>
             <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText> Trailer Number</InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('trailNo', { required: true })} />
                            </InputGroup>
                            {errors.trailNo && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                       
                         <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText> Unit Number </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('unitNo', { required: true })} />
                            </InputGroup>
                            {errors.unitNo && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                         <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>Control Number</InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('ControlNo', { required: true })} />
                            </InputGroup>
                            {errors.ControlNo && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                          <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>Birthday </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('Birthday', { required: true })} />
                            </InputGroup>
                            {errors.Birthday && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
            </Row>  
             <Row>
             <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText> Reefer Tempatur</InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('ReeferTempatur', { required: true })} />
                            </InputGroup>
                            {errors.ReeferTempatur && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                       
                         <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText> PIN Number </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('pinNo', { required: true })} />
                            </InputGroup>
                            {errors.pinNo && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                          <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>Subfleet </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('Subfleet', { required: true })} />
                            </InputGroup>
                            {errors.Subfleet && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                         <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>Billing Id</InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('Billing_Id', { required: true })} />
                            </InputGroup>
                            {errors.Billing_Id && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                        
            </Row> 
                 <Row>
             <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText> First Inital</InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('firstInitial', { required: true })} />
                            </InputGroup>
                            {errors.firstInitial && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                       
                         <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText> LastName </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('LastName', { required: true })} />
                            </InputGroup>
                            {errors.LastName && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                          <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>Driver Name </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('driverName', { required: true })} />
                            </InputGroup>
                            {errors.driverName && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                         <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>SSN</InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('SSN', { required: true })} />
                            </InputGroup>
                            {errors.SSN && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                        
            </Row>  
                <Row>
             <Col sm='12'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText> Notes</InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('notes', { required: true })} />
                            </InputGroup>
                            {errors.notes && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                       
                        
            </Row>  
             <Row>
            <Col sm="10">
            <Row>
                                        <Col className='px-0' sm="2">
            
                                            <InputGroupText className='h-100'> Mail Attachment</InputGroupText>
                                        </Col>
                                        <Col className='px-0' sm="10">
            
                                            <Input style={{border:"1px solid #ccc"}} className="form-control w-100c " type="file" />
                                        </Col>
                                                        </Row>

                </Col>
<Col sm="2" >
                    <div className='text-end'>
                            <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btntitle}</Btn>
                    </div>
            </Col>
                </Row>
                </Row>
        </Form>
    )
}


export default AddMoneyCodeForm
