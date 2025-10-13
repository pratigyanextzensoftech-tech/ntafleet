import React, { Fragment } from 'react'
import { Col, Row, Form, FormGroup, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { pricigSupplier } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import HeaderCard from '../../Common/Component/HeaderCard';
import DatePicker from 'react-datepicker'

const CreateBulkForm = ({ title, btnTitle }) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitted, isValid },
    } = useForm();


    const onSubmit = (data) => {
        console.log("Form Data:", data);  // ✅ This will print your inputs
        // alert("Form submitted successfully!");
    };
    return (
        <Fragment>
            <div style={{ border: "1px solid #ccc", padding: "5px 5px", bprderRadius: "3px", marginBottom: "10px" }}>

                <div className='bg-primary p-2 my-3'>
                    <HeaderCard title={title} />

                </div>
                <Form className='px-2' noValidate='' onSubmit={handleSubmit(onSubmit)}  >
                    <Row className="mt-3">
                     
                        <Col sm="4">
                                                    <Row>
                                                        <FormGroup className="m-form__group">
                                                            <InputGroup>
                        
                                                                <Col sm="3">
                                                                    <InputGroupText>

                                            Pricing  Date                                                       
                                                         </InputGroupText>
                                                                </Col>
                                                                <Col sm="9">
                                                                    <Controller
                                                                        name="pricingDate"
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
                        
                                                            {errors.pricingDate && (
                                                                <span className="text-danger">{errors.pricingDate.message}</span>
                                                            )}
                                                        </FormGroup>
                                                    </Row>
                             </Col>
                        <Col sm="4">
                            <FormGroup className="m-form__group">
                                <InputGroup >
                                    <InputGroupText>Supplier</InputGroupText>
                                <Controller
  name="supplier"
  control={control}
  rules={{ required: "Supplier is required" }}

  render={({ field }) => (
    <Select
      {...field}
      className="form-control p-0 border-0"
      options={pricigSupplier}
      placeholder="Select supplier"
      onChange={(selectedOption) => field.onChange(selectedOption)}
      value={field.value}
    />
  )}
/>

                                </InputGroup>

                                {errors.supplier && (
                                    <span className="text-danger">{errors.supplier?.message}</span>
                                )}
                            </FormGroup>
                        </Col>
                       
                        <Col sm="4">
                            <div className='text-end'>
                                <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTitle}</Btn>
                            </div>
                        </Col>
                    </Row>

                </Form>

            </div>
        </Fragment>
    )
}

export default CreateBulkForm
