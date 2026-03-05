
import React, { Fragment,useEffect,useState } from 'react';
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
import Loader from '../../../Layout/Loader';
const StateForm = ({onDataAdded,Edit,selectedRow,setEdit}) => {
  const [loading,setLoading]=useState(false)
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
            if (Edit && selectedRow && data?.length) {
              setLoading(true)
               const selectedCountry = data?.find(
                        (item) => item.value === selectedRow.country_id 
                      );
                                    console.log(data)
                      console.log(selectedCountry)
                      console.log(selectedRow)
                      console.log(selectedRow.country_id)
              reset({
                state: selectedRow.province_name,
                abbr: selectedRow.province_abbreviation,
                tax: selectedRow.tax_cent,
                 country: {
            value: selectedCountry.value,
            label: selectedCountry.label
      }
              });
                            setLoading(false)

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
            setLoading(true)
            console.log(selectedRow)
          axios.put(`${APINAME}/${selectedRow.state_id}`, payload)
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
          setLoading(false)
        })
        .catch((err) => {
          toast.error("Update failed!");
          console.error(err);
        });
    }
    else{
      setLoading(true)
 axios.post(APINAME,payload)
        .then((res)=>{
            console.log(res);
           
              toast.success("Add successfully!");
    
       reset();
    
            if (onDataAdded) onDataAdded();
            setLoading(false)
        })
        .catch((err)=>{
            console.log(err);
              toast.error(err.message);
        })
    }
       
            };
  return (
    <Fragment >
{loading==true && <Loader loading={loading}/>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xl="4"  md="6" sm="12">
        
               <InputText
                            name="state"
                            label="State"
                            type="text"
                            register={register}
                            errors={errors}
                            rules={{ required: "Required" }}
                        />
          </Col>
          <Col xl="4"  md="6" sm="12">
                <InputText
                            name="abbr"
                            label="Abbreviation"
                            type="text"
                            register={register}
                            errors={errors}
                            rules={{ required: "Required" }}
                        />
           
          </Col>
          <Col xl="4"  md="6" sm="12">
          
            <InputText
                            name="tax"
                            label="Tax Cent"
                            type="text"
                            register={register}
                            errors={errors}
                            rules={{ required: "Required" }}
                        />
           
          </Col>

     


          <Col xl="4"  md="6" sm="12">
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



          <Col xl="8"  md="12" sm="12">
            <div className='text-end'>
              <Btn attrBtn={{ color: "primary", className: "m-r-15 ", type: "submit" }} >{Edit?"Update State":"Add State"}</Btn>
            </div>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};

export default StateForm;