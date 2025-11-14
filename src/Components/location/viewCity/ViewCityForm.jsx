
import React, { Fragment, useState,useEffect } from 'react';
import { Row, Col, Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from "../../../AbstractElements";
import HeaderCard from '../../Common/Component/HeaderCard';
import Select from 'react-select'
import { Controller, useForm } from 'react-hook-form';
import { optionscountry } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { city as APINAME } from "../../../api";
import { toast } from 'react-toastify';
import axios from 'axios';
import InputText from '../../Forms/FormControl/formInput/InputText';
import { useCountry,useStates } from '../../../Hooks/Dropdowns';

const ViewCityForm = ({onDataAdded,Edit,selectedRow,setEdit}) => {
   const{data}=useCountry()
const { data: stateData } = useStates();
   const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm({
    defaultValues:{
      city:"",
       country:"",
       state:""
      
    }
  });
useEffect(() => {
  if (Edit && selectedRow) {

    const selectedCountry = data?.find(
      (item) => item.value === selectedRow.country_id
    );

    const selectedState = stateData?.find(
      (item) => item.value === selectedRow.state_id
    );

    reset({
      city: selectedRow.city_name,
      country: selectedCountry || null,
      state: selectedState || null,
    });
  }
}, [Edit, selectedRow]);   


const onSubmit = (formData) => {
                            console.log("Form Data:", formData.city);  // ✅ This will print your inputs
    
         const payload = {
        city_name:formData.city,
        country_id: formData.country.value,
        state_id: formData.state.value,
      

         }
           if (Edit && selectedRow) {
            console.log(selectedRow)
          axios.put(`${APINAME}/${selectedRow.city_id}`, payload)
        .then((res) => {
          toast.success(" updated successfully!");
          if (onDataAdded) onDataAdded();
          setEdit(false);
          reset({
       city:"",
      country:"",
      state:"",
     
          });
        })
        .catch((err) => {
          toast.error("Update failed!");
          console.error(err);
        });
    }
    else{
  axios.post(APINAME,payload)
        .then((res)=>{
            console.log(res);
           
              toast.success("Add successfully!");
    
       reset();
    
            if (onDataAdded) onDataAdded();
        })
        .catch((err)=>{
            console.log(err);
              toast.error(err.message);
        })
    }
      
            };
  return (
    <Fragment >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="3">
            <InputText
                            name="city"
                            label="City Name"
                            type="text"
                            register={register}
                            errors={errors}
                            rules={{ required: "Required" }}
                        />
      
          </Col>
          <Col md="3">
           
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
                      options={data}
                      className="form-control p-0 border-0"
                      placeholder="Select Country"
                       value={field.value}   // ✅ FIXED
      onChange={(val) => field.onChange(val)}
                      />
                  
                  
                  )}
                />
              </InputGroup>

              {errors.country && (
                <span className="text-danger">{errors.country?.message}</span>
              )}
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup className="m-form__group">
              <InputGroup>
                <InputGroupText>State</InputGroupText>
                <Controller
                  name="state"
                  rules={{ required: "state is required" }}

                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={stateData}
                      className="form-control p-0 border-0"
                      placeholder="Select City"
                        onChange={(val) => field.onChange(val)}
                        value={field.value}   // ✅ FIXED

                  
                    />
                  )}
                />
              </InputGroup>

              {errors.city && (
                <span className="text-danger">{errors.city?.message}</span>
              )}
            </FormGroup>
          </Col>
          <Col md={3}>
            <div className='text-end'>
              <Btn attrBtn={{ color: "primary", className: "m-r-15 ", type: "submit" }} >{Edit?"Updte":"Add City"}</Btn>
            </div>
          </Col>

        </Row>
      </Form>
    </Fragment>
  );
};

export default ViewCityForm;