
import React, { Fragment,useEffect } from 'react';
import { Row, Col, Form } from 'reactstrap';
import { Btn } from "../../../AbstractElements";
import HeaderCard from '../../Common/Component/HeaderCard';
import { useForm } from 'react-hook-form';
import { type } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import InputText from '../../Forms/FormControl/formInput/InputText';
import DropDown from '../../Forms/FormControl/formInput/DropDown';
import { menu } from '../../../api';
import { toast } from 'react-toastify';
import axios from 'axios';
const PrimaryMenu = ({title,Edit,selectedRow}) => {
    const {
        register,
        control,
        reset,
        handleSubmit,
        formState: { errors, isSubmitted, isValid },
    } = useForm();
    useEffect(() => {
  if (Edit && selectedRow) {
    reset({
      name: selectedRow.name,
      link: selectedRow.link,
       type:{
        value:selectedRow.sw,
        label:selectedRow.sw==0?"visible":"hidden"
       }
    });
  }
}, [Edit, selectedRow]);
            const onSubmit = (formData) => {
                        console.log("Form Data:", formData);  // ✅ This will print your inputs

     const payload = { 
    "name":formData.name,
    "link":formData.link?formData.link:'',
    "sw":formData.type.value,
    "idmenu":0,
    "dated":new Date(),
    "ord":0,
    "icon":"",
    "del":0,
    "idby":sessionStorage.getItem('userId'),
  
     }
    axios.post(menu,payload)
    .then((res)=>{
        console.log(res);
       
          toast.success("Add successfully!");
            // if (onDataAdded) onDataAdded();

    reset();
    })
    .catch((err)=>{
        console.log(err);
          toast.error(err.message);
    })
        };
    return (

        <Fragment>
            <Row>
                <Col>
                    <fieldset>
                        <legend>{title}</legend>
                        <Form noValidate=''  onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col md="3">
                                    <InputText
                                        name="name"
                                        label="Menu Name"
                                        type="text"
                                        register={register}
                                        errors={errors}
                                        rules={{ required: "Required" }}
                                    />

                                </Col>
                                <Col md="3">
                                    <InputText
                                        name="link"
                                        label="Menu Link"
                                        type="text"
                                        register={register}
                                        errors={errors}
                                        rules={{ required: "Required" }}
                                    />

                                </Col>
                                <Col md="3">
                                    <DropDown
                                        name="type"
                                        label="Type"
                                        control={control}
                                        errors={errors}
                                        rules={{ required: "Type is required" }}
                                        autoSelectFirst={true}
                                        placeholder="Select Type"
                                        // loading={companyLoading}
                                        options={type}
                                    />

                                </Col>
                                <Col md={3}>
                                    <div className='text-end'>
                                        <Btn attrBtn={{ color: "primary", className: "m-r-15 ", type: "submit" }} >{Edit?"Update":"Add Menu"}</Btn>
                                    </div>
                                </Col>
                            </Row>

                        </Form>
                    </fieldset>
                </Col>
            </Row>
        </Fragment>


    );
};

export default PrimaryMenu;