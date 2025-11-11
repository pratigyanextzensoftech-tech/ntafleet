
import React, { Fragment } from 'react';
import { Row, Col, Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from "../../../AbstractElements";
import HeaderCard from '../../Common/Component/HeaderCard';
import InputText from '../../Forms/FormControl/formInput/InputText';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { linamar_esso_loc as APINAME } from '../../../api';

import axios from 'axios'
const LinamarForm = ({onDataAdded}) => {
    const {
        register,
        control,
        reset,
        handleSubmit,
        formState: { errors, isSubmitted, isValid },
    } = useForm();
       const onSubmit = (formData) => {
                        console.log("Form Data:", formData);  // ✅ This will print your inputs

     const payload = {
    esso_location: formData.essoLoc,
    fj_location:formData.flyingLoc,
    site_id:formData.flyingJSite,
    fj_location:formData.flyingJLOc,
loc_id:0
     }
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
        };
    return (
        <Fragment > 
                <Form noValidate=''  onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col md="4">
                            <InputText
                                name="essoLoc"
                                label="Esso Location"
                                type="text"
                                register={register}
                                errors={errors}
                                rules={{ required: "Required" }}
                            />

                        </Col>
                        <Col md="4">
                            <InputText
                                name="flyingLoc"
                                label="Flying J Location"
                                type="text"
                                register={register}
                                errors={errors}
                                rules={{ required: "Required" }}
                            />

                        </Col>
                        <Col md="4">
                            <InputText
                                name="flyingJSite"
                                label="Flying J Site ID"
                                type="text"
                                register={register}
                                errors={errors}
                                rules={{ required: "Required" }}
                            />

                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <InputText
                                name="flyingJLOc"
                                label="Flying J Location ID"
                                type="text"
                                register={register}
                                errors={errors}
                                rules={{ required: "Required" }}
                            />

                        </Col>



                        <Col md={8}>
                            <div className='text-end'>
                                <Btn attrBtn={{ color: "primary", className: "m-r-15 ", type: "submit" }} >Add Linamar Esso Location</Btn>
                            </div>
                        </Col>
                    </Row>
                </Form> 
        </Fragment>
    );
};

export default LinamarForm;