import React from 'react'
import { Form, Row, Col, Card, CardBody, FormGroup, Input, InputGroupText ,InputGroup} from 'reactstrap'
import { Btn } from '../../AbstractElements'
import { companyLoginAccess,optionscompany } from '../Forms/FormWidget/FormSelect2/OptionDatas'
import { useForm, Controller } from 'react-hook-form';
import { MdEmail } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import Select from 'react-select'

const SubLoginForm = ({btnTtitle}) => {
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
    return (
        <div>
            <Form noValidate='' onSubmit={handleSubmit(onSubmit)} className="form theme-form">
                <CardBody>
                    <Row>
                        <Col sm="3">
                            <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText >
                           Name 
                        </InputGroupText>
                        <Input style={{border:"1px solid #ccc"}} className='form-control'
                          type="text"
                          {...register('Name', { required: true })}
                        />
                      </InputGroup>

                      {errors.Name && (
                        <span className="text-danger"> Name is required</span>
                      )}
                    </FormGroup>
                        </Col>
                               <Col sm="3">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>
                          <MdEmail className="mx-1" /> Email 
                        </InputGroupText>
                        <input className='form-control'
                        style={{border:"1px solid #ccc"}}
                          type="text"
                          aria-invalid={errors.email ? "true" : "false"}
                          {...register("email", {
                            required: "Email is required",
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
                    <Col sm='3'>
                    <FormGroup className=" m-form__group">
                      <InputGroup>
                        <InputGroupText> <MdEmail className='mx-1 ' /> Otp Email </InputGroupText>
                        <input style={{border:"1px solid #ccc"}} name="otpEmail" className="form-control" type="text" {...register("otpEmail", {
                          required: "Otp Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email format",
                          },
                        })} />
                      </InputGroup>
                      {errors.otpEmail && <p className="text-danger">{errors.otpEmail?.message}</p>}

                    </FormGroup>
                  </Col>
                     <Col sm="3">
                  <FormGroup className="m-form__group">
                    <InputGroup >
                      <InputGroupText>Card Discount Sheet Menu</InputGroupText>
                      <Controller
                        name="card"
                        rules={{ required: " required" }}
                        control={control}
                        
                        render={({ field }) => (
                          <Select
                            {...field}
                         options={ companyLoginAccess}
                            className="form-control p-0 border-0"
                            placeholder="Select  "
                          />
                        )}
                      />
                    </InputGroup>

                    {errors.card && (
                      <span className="text-danger">{errors.card?.message}</span>
                    )}
                  </FormGroup>
                </Col>
</Row>
<Row>
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
                        <InputGroupText> <FaUser className='mx-1 ' /> Username <span className='text-danger fw-bold  mx-1'>*</span></InputGroupText>
                        <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('userName', { required: true })} />
                      </InputGroup>
                      {errors.userName && (
                        <span className="text-danger">UserName is required</span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col sm='3'>
                    <FormGroup className=" m-form__group">
                      <InputGroup>
                        <InputGroupText> <RiLockPasswordFill className='mx-1 ' /> Password <span className='text-danger fw-bold  mx-1'>*</span> </InputGroupText>
                        <input style={{border:"1px solid #ccc"}} className="form-control" type="password"   {...register("password", {
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

                        <Col sm="3">

                            <div className='text-end'>
                                <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTtitle}</Btn>

                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Form>
        </div>
    )
}

export default SubLoginForm
