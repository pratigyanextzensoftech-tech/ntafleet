import React, { useState } from 'react';
import Select from 'react-select'
import { checkBoxData, optionscountry, optionscompany,customizedTypeType,invoiceType1,InvoiceCategory,InvoiceShow,Customized_Supplier } from '../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText, Container } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import HeaderCard from '../Common/Component/HeaderCard';
const BulkCustomized_ca = ({title,btnTtitle,type}) => {
  console.log(type,'++++++++++++++')
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
<>
<HeaderCard title={title}/>
        <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >
                <Row className="mt-3">
                      <Col sm="4">
                  <FormGroup className="m-form__group">
                    <Row>
                      <InputGroup>

                        <Col sm="4">        <InputGroupText>Start Date</InputGroupText>
                        </Col>
                        <Col sm="8">
 <Controller
            name="startDate"
            control={control}
            rules={{ required: "Start Date is required" }}
            render={({ field }) => (
              <DatePicker
                placeholderText="Select start date"
                className={`form-control `}
                selected={field.value}
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
        
        </Col>
                      
                      </InputGroup>
  {errors.startDate && (
            <span className="text-danger">{errors.startDate.message}</span>
          )}
                    </Row>


                 
                  </FormGroup>
                </Col>
                       <Col sm="4">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                        <Col sm="4">  
                      <InputGroupText>End Date</InputGroupText>
                    </Col>
                                            <Col sm="8">  

                   <Controller
            name="endDate"
            control={control}
            rules={{ required: "End Date is required" }}
            render={({ field }) => (
              <DatePicker
                placeholderText="Select end date"
                className={`form-control digits`}
                selected={field.value}
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
          </Col>
         
                      </InputGroup>
                       {errors.endDate && (
            <span className="text-danger">{errors.endDate.message}</span>
          )}
                  </FormGroup>

                </Col>
                            <Col sm="4">
                        <FormGroup className="m-form__group">
                            <InputGroup>
                                <InputGroupText>
                                    Invoice Type
                                </InputGroupText>
                                <Controller name="invoice"
                                    rules={{ required: "company Name is required" }}
                                    defaultValue={type === "owner_operator" || type==="bulk_owner" ? [invoiceType1[3]] : null}
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
      options={type === "owner_operator" || type==="bulk_owner" ? [invoiceType1[3]] : invoiceType1}
                                            className="form-control p-0 border-0"
                                        />
                                    )}
                                />

                            </InputGroup>
                            {errors.invoice && (
                                <span className="text-danger">{errors.invoice.message}</span>
                            )}
                        </FormGroup>
                    </Col>               
                </Row>
                <Row className="mt-3">
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
            Customized_Supplier
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
              <Col sm="4">
                        <FormGroup className="m-form__group">
                            <InputGroup>
                                <InputGroupText>Country</InputGroupText>
                                <Controller
                                    name="country"
                                    rules={{ required: "country is required" }}
                                    defaultValue={[optionscountry[2]]}
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={[optionscountry[2]]}
                                            className="form-control p-0 border-0"
                                            placeholder="Select Country"
                                        />
                                    )}
                                />
                            </InputGroup>

                            {errors.country && (
                                <span className="text-danger">{errors.country?.message}</span>
                            )}
                        </FormGroup>
                    </Col>




           
                    <Col sm="4">
                        <div className='text-end'>
                            <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTtitle}</Btn>

                        </div>
                    </Col>
                </Row>

           
        </Form>
        </>
    )
}


export default BulkCustomized_ca
