
import React, { Fragment,useEffect } from 'react';
import { Row, Col, Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from "../../../AbstractElements";
import HeaderCard from '../../Common/Component/HeaderCard';
import InputText from '../../Forms/FormControl/formInput/InputText';
import { useForm } from 'react-hook-form';
import { country as APINAME } from '../../../api';
import axios from 'axios';
import { toast } from 'react-toastify';
const CountryForm = ({onDataAdded,Edit,selectedRow,setEdit}) => {
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
                console.log(selectedRow)
              reset({
                country: selectedRow["Country Name"],
              
              });
            }
          }, [Edit, selectedRow, reset]);
     const onSubmit = (formData) => {
                            console.log("Form Data:", formData);  // ✅ This will print your inputs
    
         const payload = {
        country_name: formData.country,
     
         }
          if (Edit && selectedRow) {
            console.log(selectedRow)
          axios.put(`${APINAME}/${selectedRow[["Country ID"]]}`, payload)
        .then((res) => {
          toast.success(" updated successfully!");
          if (onDataAdded) onDataAdded();
          setEdit(false);
          reset({
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