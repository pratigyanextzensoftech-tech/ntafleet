import React, { useState } from 'react';
import Select from 'react-select'
import { checkBoxData, optionscountry, optionscompany,customizedTypeType,invoiceType1,InvoiceCategory,InvoiceShow,InVoiceSupplier } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText, Container } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import DatePickerInput from '../../Forms/FormControl/formInput/DatePickerInput';
import useSupplier from '../../../Hooks/useSupplier';
import useCompany from '../../../Hooks/useCompany';
import HeaderCard from '../../Common/Component/HeaderCard';
import DropDown from '../../Forms/FormControl/formInput/DropDown';
import SupplierDropDown from '../../Forms/FormControl/formInput/SupplierDropDown';
import InputText from '../../Forms/FormControl/formInput/InputText';
const Create = ({title,btnTitle}) => {
  const { companies: companyOptions, loading: companyLoading } = useCompany();
  const { supplier, loading, error } = useSupplier();

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
<>
<HeaderCard title={title}/>
        <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >
                <Row className="mt-3">
                         <Col sm="4">
    <DropDown
           name="company"
  label="Company"
  control={control}
  rules={{ required: "Company is required" }}
  placeholder="Select Company"
  // loading={companyLoading}
  options={companyOptions}
 />
                    </Col>
                       <Col sm="4">
      
 <DatePickerInput
        name="startDate"
        control={control}              // ✅ make sure this is passed
        label="Start Date"
        placeholder="Select start date" // ✅ fixed spelling
        errors={errors}
                required="start Date is required"
      />
                </Col>
                       <Col sm="4">
                
   <DatePickerInput
        name="endDate"
        control={control}              // ✅ make sure this is passed
        label="End Date"
        placeholder="Select end date" // ✅ fixed spelling
        errors={errors}
        required="End Date is required"
      />     
               
                </Col>
                </Row>
                <Row className="mt-3">
 
              <Col sm="4">
               <DropDown
           name="country"
  label="Country"
          errors={errors}
  control={control}
rules={{ required: "Country is required" }}
  placeholder="Select Country"
  // loading={companyLoading}
     autoSelectFirst={false}

  options={optionscountry}
 />      
                    </Col>
<Col sm="4">
    <DropDown
           name="supplier"
  label="Supplier"
  errors={errors}
  control={control}
  autoSelectFirst={true}
  rules={{ required: "supplier is required" }}
  placeholder="Select supplier"
  // loading={companyLoading}
  options={supplier}
 />
                  {/* <FormGroup className="m-form__group">
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
                  </FormGroup> */}
                </Col>

     <Col sm='3'>
                          {/* <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  Discount Cent </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control " type="text"  {...register('discount', { required: true })} />
                            </InputGroup>
                            {errors.discount && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup> */}
                          <InputText
            name="discount"
            label="Discount Cent"
            placeholder="Enter discount"
            type="number"
            register={register}
            errors={errors}
            rules={{ required: "Discount is required" }}
          />
                        </Col>


           
                    <Col sm="1">
                        <div className='text-end'>
                            <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTitle}</Btn>

                        </div>
                    </Col>
                </Row>

           
        </Form>
        </>
    )
}


export default Create
