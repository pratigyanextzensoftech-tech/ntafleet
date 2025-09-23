import React, { Fragment, useState } from 'react';
import { Breadcrumbs } from '../../AbstractElements';
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt, FaBuilding, FaUser } from "react-icons/fa";
import { useForm, Controller } from 'react-hook-form';
import { RiLockPasswordFill } from "react-icons/ri";
import Select from 'react-select'
import { optionscountry, optionscompany, optionSalesMan, companyStatus, companyLoginAccess, retailInvoice, optionscountry1, essoRack, Units, invoiceType, invoiceType1, invoiceCreation, invoiceDay, invoiceWeek, customerType } from '../Forms/FormWidget/FormSelect2/OptionDatas';
import { RiBuilding4Fill } from "react-icons/ri";
import HeaderCard from '../Common/Component/HeaderCard';
import { Row, Col, Card, CardBody, Form, FormGroup, Label, Input, InputGroup, InputGroupText, Container } from 'reactstrap';
import { Btn } from '../../AbstractElements';
const Index = () => {
  const [showMessage, setShowMessage] = useState(true);
  const {
    register,
    control,
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

    <Fragment>
      <Breadcrumbs parent='company' title='Add Company' />
      <Container fluid={true}>
        <HeaderCard title="Add Company" />
        <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >
          <Card className="shadow-lg py-3">
            <CardBody >
              <fieldset className='inputField' >
                <legend className='legend'>Add Company</legend>
                <Row className="mt-3">
                  <Col sm="6">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>
                          Company Name <span className="text-danger fw-bold mx-1">*</span>
                        </InputGroupText>
                        <input className='form-control'
                          type="text"
                          {...register('companyName', { required: true })}
                        />
                      </InputGroup>

                      {errors.companyName && (
                        <span className="text-danger">Company Name is required</span>
                      )}
                    </FormGroup>
                  </Col>

                  <Col sm="3">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>
                          <MdEmail className="mx-1" /> Email-1 <span className="text-danger fw-bold mx-1">*</span>
                        </InputGroupText>
                        <input className='form-control'
                          type="text"
                          aria-invalid={errors.email ? "true" : "false"}
                          {...register("email", {
                            required: "Email-1 is required",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Invalid email address",
                            },
                          })}
                        />
                      </InputGroup>
                      {errors.email && (
                        <span className="text-danger">{errors.email?.message}</span>
                      )}
                    </FormGroup>
                  </Col>

                  <Col sm="3">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>
                          <MdEmail className="mx-1" /> Email-2
                        </InputGroupText>
                        <input className='form-control'
                          type="text"
                          name="email2"
                          {...register('email2', {
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: 'Invalid email format',
                            },
                          })}
                        />
                      </InputGroup>
                      {errors.email2 && (
                        <p className="text-danger">{errors.email2?.message}</p>
                      )}
                    </FormGroup>
                  </Col>
                </Row>


                <Row>
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">
                      <InputGroup>
                        <InputGroupText><MdEmail className='mx-1 ' /> Other Email</InputGroupText>
                        <input name="otherEmail" className="form-control" type="text"  {...register("otherEmail", {
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email format",
                          },
                        })} />
                      </InputGroup>
                      {errors.otherEmail && (
                        <p className="text-danger">{errors.otherEmail?.message}</p>
                      )}
                    </FormGroup>
                  </Col>
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">
                      <InputGroup>
                        <InputGroupText> <MdEmail className='mx-1 ' /> Otp Email-1 <span className='text-danger fw-bold  mx-1'>*</span></InputGroupText>
                        <input name="otpEmail1" className="form-control" type="text" {...register("otpEmail1", {
                          required: "Otp Email-1 is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email format",
                          },
                        })} />
                      </InputGroup>
                      {errors.otpEmail1 && <p className="text-danger">{errors.otpEmail1?.message}</p>}

                    </FormGroup>
                  </Col>
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">
                      <InputGroup>
                        <InputGroupText> <MdEmail className='mx-1 ' /> Otp Email-2</InputGroupText>
                        <input name="otpEmail2" className="form-control" type="email"  {...register("otpEmail2", {
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email format",
                          },
                        })} />
                      </InputGroup>
                      {errors.otpEmail2 && <p>{errors.otpEmail2?.message}</p>}

                    </FormGroup>
                  </Col>
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">
                      <InputGroup>
                        <InputGroupText> <FaPhoneAlt className='mx-1 ' />Otp Phone</InputGroupText>
                        <input className="form-control" type="number" {...register("otpPhone", {
                          pattern: {
                            value: /^[0-9]{10}$/,  // ✅ 10 digit only
                            message: "Phone number must be 10 digits",
                          },
                        })} />
                      </InputGroup>
                      {errors.otpPhone && (
                        <span className="text-danger">{errors.otpPhone.message}</span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm='6'>
                    <FormGroup className=" m-form__group">
                      <InputGroup>
                        <InputGroupText><FaBuilding className='mx-1 ' /> Address</InputGroupText>
                        <input className="form-control" type="text" />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col sm='6'>
                    <FormGroup className=" m-form__group">
                      <InputGroup>
                        <InputGroupText> <RiBuilding4Fill className='mx-1 ' /> Authorized Location</InputGroupText>
                        <Input className="form-control" type="email" />
                      </InputGroup>
                    </FormGroup>
                  </Col>

                </Row>
                <Row>
                  <Col sm="3">
                    <InputGroup className="mb-3">
                      <InputGroupText>Country</InputGroupText>
                      <Select options={optionscountry} className="form-control p-0 border-0" />

                    </InputGroup>
                  </Col>
                  <Col sm="3">
                    <InputGroup className="mb-3">
                      <InputGroupText>Company Type</InputGroupText>

                      <Select options={optionscompany} className="form-control p-0 border-0" />


                    </InputGroup>
                  </Col>
                  <Col sm="3">
                    <InputGroup>
                      <InputGroupText> <FaPhoneAlt className='mx-1' /> Phone</InputGroupText>
                      <Input className="form-control" type="number" placeholder="+1 (999) 999-9999" />
                    </InputGroup>
                  </Col>
                  <Col sm="3">
                    <InputGroup>
                      <InputGroupText> <FaPhoneAlt className='mx-1 ' /> Mobile</InputGroupText>
                      <Input className="form-control" type="number" placeholder="+1 (999) 999-9999" />
                    </InputGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">
                      <InputGroup>
                        <InputGroupText><FaPhoneAlt className='mx-1 ' /> Fax</InputGroupText>
                        <Input className="form-control" type="number" placeholder="+1 (999) 999-9999" />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col sm='3'>
                    <InputGroup>

                      <InputGroupText>Sales Man</InputGroupText>

                      <Select options={optionSalesMan} className="form-control p-0 border-0" />


                    </InputGroup>
                  </Col>
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">
                      <InputGroup>
                        <InputGroupText>  Policy Number</InputGroupText>
                        <Input className="form-control" type="email" />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col sm='3'>
                    <InputGroup>

                      <InputGroupText>Company Status</InputGroupText>

                      <Select options={companyStatus} className="form-control p-0 border-0" />


                    </InputGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">
                      <InputGroup>
                        <InputGroupText> Sub Fleet Identifier</InputGroupText>
                        <Input className="form-control" type="text" />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">
                      <InputGroup>
                        <InputGroupText>  Irving Sub Fleet Name</InputGroupText>
                        <Input className="form-control" type="text" />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">
                      <InputGroup>
                        <InputGroupText>  Rack-Canada</InputGroupText>
                        <Input className="form-control" type="text" />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">
                      <InputGroup>
                        <InputGroupText>Rack-USA</InputGroupText>
                        <Input className="form-control" type="text" />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm='3'>
                    <InputGroup>

                      <InputGroupText>AOI</InputGroupText>

                      <Select options={companyLoginAccess} className="form-control p-0 border-0" />


                    </InputGroup>
                  </Col>
                  <Col sm='3'>
                    <InputGroup>

                      <InputGroupText>Drivers License</InputGroupText>

                      <Select options={companyLoginAccess} className="form-control p-0 border-0" />


                    </InputGroup>
                  </Col>
                  <Col sm='3'>
                    <InputGroup>

                      <InputGroupText>Signed Agreement</InputGroupText>

                      <Select options={companyLoginAccess} className="form-control p-0 border-0" />


                    </InputGroup>
                  </Col>
                  <Col sm='3'>
                    <InputGroup>

                      <InputGroupText>Void Cheque</InputGroupText>

                      <Select options={companyLoginAccess} className="form-control p-0 border-0" />


                    </InputGroup>
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">
                      <InputGroup>

                        <InputGroupText>Check Rebate</InputGroupText>

                        <Select options={companyLoginAccess} className="form-control p-0 border-0" />


                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">

                      <InputGroup>

                        <InputGroupText>FJ Rack Invoice</InputGroupText>

                        <Select options={companyLoginAccess} className="form-control p-0 border-0" />


                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">

                      <InputGroup>

                        <InputGroupText>TA Petro Rack Invoice</InputGroupText>

                        <Select options={retailInvoice} className="form-control p-0 border-0" />


                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">

                      <InputGroup>

                        <InputGroupText>Esso Rack Invoice</InputGroupText>

                        <Select options={companyLoginAccess} className="form-control p-0 border-0" />


                      </InputGroup>
                    </FormGroup>

                  </Col>
                </Row>
                <Row >
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">
                      <InputGroup>

                        <InputGroupText>Loves Rack Invoice</InputGroupText>

                        <Select options={companyLoginAccess} className="form-control p-0 border-0" />


                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">

                      <InputGroup>

                        <InputGroupText>Show Supplier Fee (FJ)</InputGroupText>

                        <Select options={companyLoginAccess} className="form-control p-0 border-0" />


                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">

                      <InputGroup>

                        <InputGroupText>Show IBP Adjustment (TA)</InputGroupText>

                        <Select options={companyLoginAccess} className="form-control p-0 border-0" />


                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">

                      <InputGroup>

                        <InputGroupText>Show Pumping Fee(LOVES)</InputGroupText>

                        <Select options={companyLoginAccess} className="form-control p-0 border-0" />


                      </InputGroup>
                    </FormGroup>

                  </Col>
                </Row>
                <Row >
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">
                      <InputGroup>

                        <InputGroupText>Show Net Price (ESSO)</InputGroupText>

                        <Select options={companyLoginAccess} className="form-control p-0 border-0" />


                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">

                      <InputGroup>

                        <InputGroupText>Show (ESSO) Live Data</InputGroupText>

                        <Select options={companyLoginAccess} className="form-control p-0 border-0" />


                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">

                      <InputGroup>

                        <InputGroupText>ESSO Rack</InputGroupText>

                        <Select options={essoRack} className="form-control p-0 border-0" />


                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">

                      <InputGroup>

                        <InputGroupText>CADV FEE</InputGroupText>

                        <Select options={companyLoginAccess} className="form-control p-0 border-0" />


                      </InputGroup>
                    </FormGroup>

                  </Col>
                </Row>
                <Row >
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">
                      <InputGroup>

                        <InputGroupText>Show Owner Operator Invoice</InputGroupText>

                        <Select options={companyLoginAccess} className="form-control p-0 border-0" />


                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">

                      <InputGroup>

                        <InputGroupText>Self Owner Operator Report
                        </InputGroupText>

                        <Select options={companyLoginAccess} className="form-control p-0 border-0" />


                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">

                      <InputGroup>

                        <InputGroupText>Show Customised Invoices</InputGroupText>

                        <Select options={companyLoginAccess} className="form-control p-0 border-0" />


                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">

                      <InputGroup>

                        <InputGroupText>Default Unit</InputGroupText>

                        <Select options={Units} className="form-control p-0 border-0" />


                      </InputGroup>
                    </FormGroup>

                  </Col>
                </Row>
                <Row >
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">
                      <InputGroup>

                        <InputGroupText>Default Driver</InputGroupText>

                        <Select options={Units} className="form-control p-0 border-0" />


                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">

                      <InputGroup>

                        <InputGroupText>ESSO Rack ON

                        </InputGroupText>

                        <Select options={essoRack} className="form-control p-0 border-0" />


                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">

                      <InputGroup>

                        <InputGroupText>ESSO Rack OON</InputGroupText>

                        <Select options={essoRack} className="form-control p-0 border-0" />


                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">

                      <InputGroup>

                        <InputGroupText>Suspicious Company</InputGroupText>

                        <Select options={companyLoginAccess} className="form-control p-0 border-0" />
                      </InputGroup>
                    </FormGroup>

                  </Col>
                </Row>
                <Row >
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">
                      <InputGroup>

                        <InputGroupText>DEFD Mark Up</InputGroupText>

                        <Select options={companyLoginAccess} className="form-control p-0 border-0" />


                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">

                      <InputGroup>

                        <InputGroupText>Daily Volume Report

                        </InputGroupText>

                        <Select options={companyLoginAccess} className="form-control p-0 border-0" />

                      </InputGroup>
                    </FormGroup>
                  </Col>

                </Row> </fieldset>
            </CardBody>

          </Card>
          <Card className="shadow-lg my-3 py-3">
            <CardBody >
              <fieldset className='inputField ' >
                <legend className='legend'>Ultramar INVOICE TYPE</legend>
                <Row className='mt-3'>
                  <Col sm='4'>
                    <FormGroup className=" m-form__group">
                      <InputGroup>

                        <InputGroupText>Ultramar INVOICE TYPE</InputGroupText>

                        <Select options={invoiceType1} className="form-control p-0 border-0" />


                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col sm={{ size: 4, offset: 4 }}>
                    <FormGroup className=" m-form__group">

                      <InputGroup>

                        <InputGroupText>Owner Operator Invoice


                        </InputGroupText>

                        <Select options={companyLoginAccess} className="form-control p-0 border-0" />

                      </InputGroup>
                    </FormGroup>
                  </Col>

                </Row>
                <Row >
                  <Col sm={{ size: 4 }}>
                    <FormGroup className=" m-form__group">
                      <InputGroup>

                        <InputGroupText>Customized Invoice Type</InputGroupText>

                        <Select options={invoiceType} className="form-control p-0 border-0" />


                      </InputGroup>
                    </FormGroup>
                  </Col>


                </Row>
              </fieldset>
            </CardBody>
          </Card>
          <Card className="shadow-lg my-3 py-3">
            <CardBody >
              <fieldset className='inputField' >
                <legend className='legend '>ESSO INVOICE TYPE</legend>
                <Row className='my-3'>
                  <Col sm='4'>
                    <FormGroup className=" m-form__group">
                      <InputGroup>

                        <InputGroupText>ESSO INVOICE TYPE</InputGroupText>

                        <Select options={invoiceType1} className="form-control p-0 border-0" />


                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col sm={{ size: 4, offset: 4 }}>
                    <FormGroup className=" m-form__group">

                      <InputGroup>

                        <InputGroupText>Owner Operator Invoice


                        </InputGroupText>

                        <Select options={companyLoginAccess} className="form-control p-0 border-0" />

                      </InputGroup>
                    </FormGroup>
                  </Col>

                </Row>
                <Row >
                  <Col sm={{ size: 4 }}>
                    <FormGroup className=" m-form__group">
                      <InputGroup>

                        <InputGroupText>Customized Invoice Type</InputGroupText>

                        <Select options={invoiceType} className="form-control p-0 border-0" />


                      </InputGroup>
                    </FormGroup>
                  </Col>


                </Row>
              </fieldset>
            </CardBody>
          </Card>
          <Card className="shadow-lg my-3 py-3">
            <CardBody >
              <fieldset className='inputField' >
                <legend className='legend '>Other Details</legend>
                <Row className='mt-3'>
                  <Col sm='4'>
                    <FormGroup className=" m-form__group">
                      <InputGroup>

                        <InputGroupText>Country <span className='text-danger fw-bold  mx-1'>*</span></InputGroupText>

                        <Controller
                          name="country"
                          control={control}
                          rules={{ required: "Country is required" }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={optionscountry1}
                              className="form-control p-0 border-0"
                              placeholder="Select a country"
                            />
                          )}
                        />


                      </InputGroup>
                      {errors.country && (
                        <span className="text-danger">{errors.country.message}</span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col sm="4">
                    <div className='checkbox checkbox-dark'>
                      <Input id='checkbox1' type='checkbox' />
                      <Label for='checkbox1'>Fees</Label>
                    </div>
                  </Col>

                </Row>
                <Row >
                  <Col sm={{ size: 4 }}>
                    <FormGroup className=" m-form__group">
                      <InputGroup>

                        <InputGroupText>Customized Invoice Type</InputGroupText>

                        <Select options={invoiceType} className="form-control p-0 border-0" />


                      </InputGroup>
                    </FormGroup>
                  </Col>


                </Row>
              </fieldset>
            </CardBody>
          </Card>
          <Card className="shadow-lg my-3 py-3">
            <CardBody >
              <fieldset className='inputField' >
                <legend className='legend '>Daily Pricing</legend>
                <Row className='my-3' >
                  <Col sm='3'>
                    <div className='checkbox checkbox-dark'>
                      <Input id='checkbox1' type='checkbox' />
                      <Label for='checkbox1'>FJ Daily Pricing PDF</Label>
                    </div>
                  </Col>
                  <Col sm="3">
                    <div className='checkbox checkbox-dark'>
                      <Input id='checkbox2' type='checkbox' />
                      <Label for='checkbox2'>Ta-Petro Daily Pricing PDF</Label>
                    </div>
                  </Col>


                  <Col sm="3">
                    <div className='checkbox checkbox-dark'>
                      <Input id='checkbox3' type='checkbox' />
                      <Label for='checkbox3'>ESSO Daily Pricing PDF (With Tax)</Label>
                    </div>
                  </Col>

                  <Col sm="3">
                    <div className='checkbox checkbox-dark'>
                      <Input id='checkbox4' type='checkbox' />
                      <Label for='checkbox4'>ESSO Daily Pricing PDF (Without Tax)</Label>
                    </div>
                  </Col>
                </Row>
                <Row >
                  <Col sm='3'>
                    <div className='checkbox checkbox-dark'>
                      <Input id='checkbox5' type='checkbox' />
                      <Label for='checkbox5'>Pilot Flying J</Label>
                    </div>
                  </Col>
                  <Col sm="3">
                    <div className='checkbox checkbox-dark'>
                      <Input id='checkbox6' type='checkbox' />
                      <Label for='checkbox6'>Shell Flying J</Label>
                    </div>
                  </Col>


                  <Col sm="3">
                    <div className='checkbox checkbox-dark'>
                      <Input id='checkbox7' type='checkbox' />
                      <Label for='checkbox7'>Ultramar Daily Pricing PDF (With Tax)</Label>
                    </div>
                  </Col>

                  <Col sm="3">
                    <div className='checkbox checkbox-dark'>
                      <Input id='checkbox8' type='checkbox' />
                      <Label for='checkbox8'>Ultramar Daily Pricing PDF (Without Tax)</Label>
                    </div>
                  </Col>
                </Row>
                <Row >
                  <Col sm='3'>
                    <div className='checkbox checkbox-dark'>
                      <Input id='checkbox9' type='checkbox' />
                      <Label for='checkbox9'>Loves Daily Pricing PDF</Label>
                    </div>
                  </Col>
                </Row>
              </fieldset>
            </CardBody>
          </Card>
          <Card className="shadow-lg my-3 py-3">
            <CardBody>
              <fieldset className='inputField' >
                <legend className='legend '>Invoice Setting</legend>
                <Row className="mt-3 py-3">
                  {/* Invoice Creation */}
                  <Col sm="3">
                    <FormGroup>
                      <InputGroup>
                        <InputGroupText>
                          Invoice Creation <span className="text-danger fw-bold mx-1">*</span>
                        </InputGroupText>
                        <Controller
                          name="invoiceCreation"
                          control={control}
                          rules={{ required: "Invoice creation is required" }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={invoiceCreation}
                              className="form-control p-0 border-0"
                              placeholder="Select option"
                            />
                          )}
                        />
                      </InputGroup>
                      {errors.invoiceCreation && (
                        <span className="text-danger">{errors.invoiceCreation.message}</span>
                      )}
                    </FormGroup>
                  </Col>

                  {/* Invoice Pay Day */}
                  <Col sm="3">
                    <FormGroup>
                      <InputGroup>
                        <InputGroupText>
                          Invoice Pay Day <span className="text-danger fw-bold mx-1">*</span>
                        </InputGroupText>
                        <Controller
                          name="invoiceDay"
                          control={control}
                          rules={{ required: "Invoice pay day is required" }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={invoiceDay}
                              className="form-control p-0 border-0"
                              placeholder="Select day"
                            />
                          )}
                        />
                      </InputGroup>
                      {errors.invoiceDay && (
                        <span className="text-danger">{errors.invoiceDay.message}</span>
                      )}
                    </FormGroup>
                  </Col>

                  {/* Invoice Week */}
                  <Col sm="3">
                    <FormGroup>
                      <InputGroup>
                        <InputGroupText>
                          Invoice Week <span className="text-danger fw-bold mx-1">*</span>
                        </InputGroupText>
                        <Controller
                          name="invoiceWeek"
                          control={control}
                          rules={{ required: "Invoice week is required" }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={invoiceWeek}
                              className="form-control p-0 border-0"
                              placeholder="Select week"
                            />
                          )}
                        />
                      </InputGroup>
                      {errors.invoiceWeek && (
                        <span className="text-danger">{errors.invoiceWeek.message}</span>
                      )}
                    </FormGroup>
                  </Col>

                  {/* Customer Type */}
                  <Col sm="3">
                    <FormGroup>
                      <InputGroup>
                        <InputGroupText>
                          Customer Type <span className="text-danger fw-bold mx-1">*</span>
                        </InputGroupText>
                        <Controller
                          name="customerType"
                          control={control}
                          rules={{ required: "Customer type is required" }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={customerType}
                              className="form-control p-0 border-0"
                              placeholder="Select type"
                            />
                          )}
                        />
                      </InputGroup>
                      {errors.customerType && (
                        <span className="text-danger">{errors.customerType.message}</span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <FormGroup className=" m-form__group">
                    <InputGroup>
                      <InputGroupText>Special Instructions</InputGroupText>
                      <Input className="form-control" type="text" />
                    </InputGroup>
                  </FormGroup>
                </Row>
              </fieldset>
            </CardBody>
          </Card>
          <Card className='shadow-lg py-3'>
            <CardBody>
              <fieldset className='inputField' >
                <legend className='legend '>Contact Person Details</legend>
                <Row className='mt-3'>
                  <Col sm='6'>
                    <FormGroup className=" m-form__group">
                      <InputGroup>
                        <InputGroupText>  <FaUser className='mx-1 ' /> First Name </InputGroupText>
                        <Input className="form-control" type="text" />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col sm='6'>
                    <FormGroup className=" m-form__group">
                      <InputGroup>
                        <InputGroupText> <FaUser className='mx-1 ' /> Last Name</InputGroupText>
                        <Input className="form-control" type="text" />
                      </InputGroup>
                    </FormGroup>
                  </Col>

                </Row>
              </fieldset>
            </CardBody>
          </Card>
          <Card className='shadow-lg py-3'>
            <CardBody>
              <fieldset className='inputField' >
                <legend className='legend '>Account Details</legend>
                <Row className='mt-3'>
                  <Col sm='4'>
                    <FormGroup className=" m-form__group">
                      <InputGroup className="mb-3">
                        <InputGroupText>Card Discount Sheet Menu</InputGroupText>

                        <Select options={companyLoginAccess} className="form-control p-0 border-0" />


                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col sm='4'>
                    <FormGroup className=" m-form__group">
                      <InputGroup>
                        <InputGroupText> <FaUser className='mx-1 ' /> Username <span className='text-danger fw-bold  mx-1'>*</span></InputGroupText>
                        <input className="form-control" type="text"  {...register('userName', { required: true })} />
                      </InputGroup>
                      {errors.userName && (
                        <span className="text-danger">UserName is required</span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col sm='4'>
                    <FormGroup className=" m-form__group">
                      <InputGroup>
                        <InputGroupText> <RiLockPasswordFill className='mx-1 ' /> Password <span className='text-danger fw-bold  mx-1'>*</span> </InputGroupText>
                        <input className="form-control" type="password"   {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                          },
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message:
                              "Must include uppercase, lowercase, number & special character",
                          },
                        })} />
                      </InputGroup>

                      {errors.password && (
                        <span className="text-danger">{errors.password.message}</span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
              </fieldset>
            </CardBody>
          </Card>
          <Card className='shadow-lg'>
            <CardBody>
              <Row>
                <Col md="10">
                  {showMessage && (
                    <marquee  direction="right" className="text-danger mt-3 fw-bold">
                      All fields marked with * are mandatory.
                    </marquee>
                  )}
                </Col>
                <Col md={{ size: 2 }}>
                  <div className='text-end'>
                    <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >Add Company</Btn>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Form>
      </Container>
    </Fragment>
  )
}

export default Index
