import React, { useState,useEffect } from 'react';
import Select from 'react-select'
import { optionscompany,optionscountry,supplier,salesman } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText, Container } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import { salesman_volume as APINAME } from '../../../api';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useCountry } from '../../../Hooks/Dropdowns';
import { supplierById } from '../../../api';
const SalesmanVol = ({btnTitle}) => {
    const[supplierData,setSupplierData]=useState([])
  
  const{data:country}=useCountry()
    const {
        register,
        control,
        reset,
        setValue,
        handleSubmit,
        formState: { errors, isSubmitted, isValid },
    } = useForm();

useEffect(() => {

  axios
    .get(`${supplierById}/1,3,5,6,7`)
    .then((res) => {
      const formatted = res.data.map((s) => ({
        value: s.id,
        label: s.supplier_name,
      }));

      setSupplierData(formatted);

      // ⭐ Automatically set default supplier based on type
    
        setValue("supplier", null); // no default for no-type
      
    })
    .catch((err) => console.log(err));
}, [ setValue]);
     const onSubmit = (formData) => {
                        console.log("Form Data:", formData);  // ✅ This will print your inputs

     const payload = {
    salesman_id: formData.salesman.value,
    date_from:formData.startDate.value,
    date_to:formData.endDate.value,
    country:formData.country.value,
supplier_id:0,
us_total:"",
ca_total:"",
total_gln:"",
total_ltr:"",
dated:new Date(),
idby:localStorage.getItem("userId"),
del:""
     }
    axios.post(APINAME,payload)
    .then((res)=>{
        console.log(res);
       
          toast.success("Add successfully!");

   reset();

        // if (onDataAdded) onDataAdded();
    })
    .catch((err)=>{
        console.log(err);
          toast.error(err.message);
    })
        };
    const handleReset = () => {
    reset(); // reset all fields back to defaultValues (or empty if none given)
  };

   
    return (

        <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >

           
             
                <Row className="mt-3">
                       <Col sm="4">
                        <FormGroup className="m-form__group">
                            <InputGroup >
                                <InputGroupText>Salesman</InputGroupText>
                                <Controller name="salesman"
                                    rules={{ required: " Required" }}

                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={salesman}
                                            className="form-control p-0 border-0"
                                            placeholder="Select Salesman"
                                        />
                                    )}
                                />
                            </InputGroup>

                            {errors.salesman && (
                                <span className="text-danger">{errors.salesman?.message}</span>
                            )}
                        </FormGroup>
                    </Col>
                <Col sm="4">
                  <FormGroup className="m-form__group">
                    <Row>
                      <InputGroup>

                        <Col sm="4">        <InputGroupText>start Date</InputGroupText>
                        </Col>
                        <Col sm="8">
 <Controller
            name="startDate"
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
  {errors.startDate && (
            <span className="text-danger">{errors.startDate.message}</span>
          )}
                    </Row>


                 
                  </FormGroup>
                </Col>
                       <Col sm="4">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>End Date</InputGroupText>
                   <Controller
            name="endDate"
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
                       {errors.endDate && (
            <span className="text-danger">{errors.endDate.message}</span>
          )}
                  </FormGroup>

                </Col>
 
        
                      
            </Row> 
            <Row>
                <Col sm="4">
                  <FormGroup className="m-form__group">
                            <InputGroup>
                                <InputGroupText>Country</InputGroupText>
                                <Controller
                                    name="country"
                                    rules={{ required: "country is required" }}
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={country}
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
            supplierData
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
                
                                            <div className='text-start'>
                                                <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTitle}</Btn>
                                            </div>
                                        </Col>
            </Row>
            
        </Form>
    )
}


export default SalesmanVol
