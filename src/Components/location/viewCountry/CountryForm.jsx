
import React, { Fragment,useEffect,useState } from 'react';
import { Row, Col, Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from "../../../AbstractElements";
import HeaderCard from '../../Common/Component/HeaderCard';
import InputText from '../../Forms/FormControl/formInput/InputText';
import { useForm } from 'react-hook-form';
import { country as APINAME } from '../../../api';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../../../Layout/Loader';
const CountryForm = ({onDataAdded,Edit,selectedRow,setEdit}) => {
    const[loading,setLoading]=useState(false)
    const {
        register,
        control,
        reset,
        handleSubmit,
        formState: { errors, isSubmitted, isValid },
    } = useForm({
        defaultValues:{
            country:""
        }
    });
    useEffect(() => {
            if (Edit && selectedRow) {
                setLoading(true)
                console.log(selectedRow)
              reset({
                country: selectedRow.country_name,
              
              });
                              setLoading(false)

            }
          }, [Edit, selectedRow, reset]);
     const onSubmit = (formData) => {
                            console.log("Form Data:", formData);  // ✅ This will print your inputs
    
         const payload = {
        country_name: formData.country,
     
         }
          if (Edit && selectedRow) {
            console.log(selectedRow.country_id);
            
            setLoading(true)
          axios.put(`${APINAME}/${selectedRow.country_id}`, payload)
        .then((res) => {
          toast.success(" updated successfully!");
          if (onDataAdded) onDataAdded();
          setEdit(false);
          reset({
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
            {loading==true && <Loader loading={loading}/>}
            <Form noValidate=''  onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col xxl="8" >
                        <InputText
                            name="country"
                            label="Country Name"
                            type="text"
                            register={register}
                            errors={errors}
                            rules={{ required: "Required" }}
                        />

                    </Col>
                    <Col xxl="4">
                        <div className='text-end'>
                            <Btn attrBtn={{ color: "primary", className: "m-r-15 ", type: "submit" }} >{Edit?"Update"
                            :"Add Country"}</Btn>
                        </div>
                    </Col>

                </Row>

            </Form> 
        </Fragment>
    );
};

export default CountryForm;