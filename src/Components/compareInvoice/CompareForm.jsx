import React, { useState } from 'react';
import Select from 'react-select'
import { checkBoxData, optionscountry, optionscompany,customizedTypeType,invoiceType1,InvoiceCategory,InvoiceShow,optionsSearch,Customized_Supplier } from '../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText, Container } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import HeaderCard from '../Common/Component/HeaderCard';
const CompareForm = ({title,btnTtitle,type,btnTtitle1}) => {
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
                  <Col sm="3">
                  <FormGroup className="m-form__group">
                    <Row>
                      <InputGroup>

                        <Col sm="4">        <InputGroupText>From Date</InputGroupText>
                        </Col>
                        <Col sm="8">
 <Controller
            name="fromDate"
            control={control}
            rules={{ required: " Date is required" }}
            render={({ field }) => (
              <DatePicker
                placeholderText="Select  date"
                className={`form-control `}
                selected={field.value}
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
        
        </Col>
                      
                      </InputGroup>
  {errors.fromDate && (
            <span className="text-danger">{errors.fromDate.message}</span>
          )}
                    </Row>


                 
                  </FormGroup>
                </Col>
                       <Col sm="3">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>To Date</InputGroupText>
                   <Controller
            name="ToDate"
            control={control}
            rules={{ required: " Date is required" }}
            render={({ field }) => (
              <DatePicker
                placeholderText="Select  date"
                className={`form-control digits`}
                selected={field.value}
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
         
                      </InputGroup>
                       {errors.ToDate && (
            <span className="text-danger">{errors.ToDate.message}</span>
          )}
                  </FormGroup>

                </Col>
                         <Col sm="3">
                        <FormGroup className="m-form__group">
                            <InputGroup >
                                <InputGroupText>Search Type</InputGroupText>
                                <Controller name="type"
                                    rules={{ required: "type is is required" }}

                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={optionsSearch}
                                            className="form-control p-0 border-0"
                                            placeholder="Search"
                                        />
                                    )}
                                />
                            </InputGroup>

                            {errors.type && (
                                <span className="text-danger">{errors.type?.message}</span>
                            )}
                        </FormGroup>
                    </Col>
                           <Col md="3">
                                                   <FormGroup className=" m-form__group">
                                                       <InputGroup>
                                                           <InputGroupText>Amount</InputGroupText>
                                                           <Input className="form-control" type="text"  />
                                                       </InputGroup>
                                                   </FormGroup>
                                               </Col> 

                



               

                   
                </Row>
                <Row className="mt-3">

              <Col sm="3">
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




           
                    <Col sm="9">
                        <div className='text-end'>
                            <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTtitle}</Btn>
                              <button className='btn btn-secondary'>{btnTtitle1}</button>
                        </div>
                    </Col>
                </Row>

           
        </Form>
        </>
    )
}


export default CompareForm
