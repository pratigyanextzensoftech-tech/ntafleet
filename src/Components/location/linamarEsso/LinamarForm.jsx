
import React, { Fragment,useEffect } from 'react';
import { Row, Col, Form } from 'reactstrap';
import { Btn } from "../../../AbstractElements";
import InputText from '../../Forms/FormControl/formInput/InputText';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { linamar_esso_loc as APINAME } from '../../../api';

import axios from 'axios'
const LinamarForm = ({onDataAdded,Edit,selectedRow,setEdit}) => {
    const {
        register,
        control,
        reset,
        handleSubmit,
        formState: { errors, isSubmitted, isValid },
    } = useForm({
        defaultValues:{   
            essoLoc:"",
            flyingLoc:"",
            flyingJSite:"",
            flyingJLOc:""
          
        }
    });
    useEffect(() => {
        if (Edit && selectedRow) {
            console.log(selectedRow)
          reset({
            essoLoc: selectedRow["Esso Location"],
            flyingLoc: selectedRow["Flying J Location"] , // prefill dropdown
          flyingJLOc: selectedRow["Flying J Location ID"], 
          flyingJSite: selectedRow["Flying J Site ID"], 
          });
        }
      }, [Edit, selectedRow, reset]);
       const onSubmit = (formData) => {
                        console.log("Form Data:", formData);  // ✅ This will print your inputs
     const payload = {
    esso_location: formData.essoLoc,
    fj_location:formData.flyingLoc,
    site_id:formData.flyingJSite,
    loc_id:formData.flyingJLOc
     }
        if (Edit && selectedRow) {
            console.log(selectedRow)
            console.log(payload)
          axios.put(`${APINAME}/${selectedRow.ID}`, payload)
        .then((res) => {
          toast.success(" updated successfully!");
          console.log(res)
          if (onDataAdded) onDataAdded();
          setEdit(false);
          reset({
            essoLoc:"",
            flyingLoc:"",
            flyingJSite:"",
            flyingJLOc:""
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
                        <Col  xxl="4"  md="6" sm="12">
                            <InputText
                                name="essoLoc"
                                label="Esso Location"
                                type="text"
                                register={register}
                                errors={errors}
                                rules={{ required: "Required" }}
                            />
                        </Col>
                        <Col  xxl="4"  md="6" sm="12">
                            <InputText
                                name="flyingLoc"
                                label="Flying J Location"
                                type="text"
                                register={register}
                                errors={errors}
                                rules={{ required: "Required" }}
                            />
                        </Col>
                        <Col  xxl="4"  md="6" sm="12">
                            <InputText
                                name="flyingJSite"
                                label="Flying J Site ID"
                                type="text"
                                register={register}
                                errors={errors}
                                rules={{ required: "Required" }}
                            />
                        </Col>
                  
                        <Col  xxl="4"  md="6" sm="12">
                            <InputText
                                name="flyingJLOc"
                                label="Flying J Location ID"
                                type="text"
                                register={register}
                                errors={errors}
                                rules={{ required: "Required" }}
                            />
                        </Col>
                        <Col  xxl="8"  md="12" sm="12">
                            <div className='text-end'>
                                <Btn attrBtn={{ color: "primary", className: "m-r-15 ", type: "submit" }} >{Edit?"Update":"Add Linamar Esso Location"}</Btn>
                            </div>
                        </Col>
                    </Row>
                </Form> 
        </Fragment>
    );
};

export default LinamarForm;