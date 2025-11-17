
import React, { Fragment,useEffect } from 'react';
import { Row, Col, Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from "../../../AbstractElements";
import HeaderCard from '../../Common/Component/HeaderCard';
import Select from 'react-select'
import { Controller, useForm } from 'react-hook-form';
import { optionscountry } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { state as APINAME } from '../../../api';
import axios from 'axios';
import { toast } from 'react-toastify';
import InputText from '../../Forms/FormControl/formInput/InputText';
import { useCountry } from '../../../Hooks/Dropdowns';
const StateForm = ({onDataAdded,Edit,selectedRow,setEdit}) => {
  const{data}=useCountry()
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm({
    defaultValues:{
      state:"",
      abbr:"",
      tax:"",
      country:""
    }
  });
  useEffect(() => {
            if (Edit && selectedRow) {
                console.log(selectedRow)
              reset({
                state: selectedRow["State Name"],
                abbr: selectedRow["Abbreviation"],
                tax: selectedRow["Tax Cent"],
                 country: {
            value: selectedRow["Country ID"],
            label: selectedRow["Country"]
      }
              });
            }
          }, [Edit, selectedRow, reset]);
 const onSubmit = (formData) => {
                            console.log("Form Data:", formData);  // ✅ This will print your inputs
    
         const payload = {
        province_name: formData.state,
        province_abbreviation: formData.abbr,
        tax_cent: formData.tax,
        country_id: formData.country.value,
          qst:"",
          gst:"",
          hst:"",

         }
           if (Edit && selectedRow) {
            console.log(selectedRow)
          axios.put(`${APINAME}/${selectedRow[["State ID"]]}`, payload)
        .then((res) => {
          toast.success("Supplier updated successfully!");
          if (onDataAdded) onDataAdded();
          setEdit(false);
          reset({
 state:"",
      abbr:"",
      tax:"",
      country:""
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
          <Col md="4">
        
               <InputText
                            name="state"
                            label="State"
                            type="text"
                            register={register}
                            errors={errors}
                            rules={{ required: "Required" }}
                        />
          </Col>
          <Col md="4">
                <InputText
                            name="abbr"
                            label="Abbreviation"
                            type="text"
                            register={register}
                            errors={errors}
                            rules={{ required: "Required" }}
                        />
           
          </Col>
          <Col md={4}>
          
            <InputText
                            name="tax"
                            label="Tax Cent"
                            type="text"
                            register={register}
                            errors={errors}
                            rules={{ required: "Required" }}
                        />
           
          </Col>

        </Row>
        <Row>



          <Col md="4">
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



          <Col md={8}>
            <div className='text-end'>
              <Btn attrBtn={{ color: "primary", className: "m-r-15 ", type: "submit" }} >{Edit?"Update":"Add Linamar Esso Location"}</Btn>
            </div>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};

export default StateForm;