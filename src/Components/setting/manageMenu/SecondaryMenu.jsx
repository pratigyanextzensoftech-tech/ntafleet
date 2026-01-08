
import React, { Fragment,useEffect } from 'react';
import { Row, Col, Form } from 'reactstrap';
import { Btn } from "../../../AbstractElements";
import HeaderCard from '../../Common/Component/HeaderCard';
import { useForm } from 'react-hook-form';
import { type } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import DropDown from '../../Forms/FormControl/formInput/DropDown';
import InputText from '../../Forms/FormControl/formInput/InputText';
import usePmenu from '../../../Hooks/usePmenu';
import { menu,smenu } from '../../../api';
import { toast } from 'react-toastify';
import axios from 'axios';
const SecondaryMenu = ({ title,Edit,selectedRow,fetchSmenuData,setEdit,row }) => {
    const { pmenu, loading, error } = usePmenu();
    console.log(row);
    
    const {
        register,
        control,
        reset,
        handleSubmit,
        formState: { errors, isSubmitted, isValid },
    } = useForm();
     useEffect(() => {
      if (Edit && selectedRow) {
        console.log(selectedRow)
        reset({
            menuName: selectedRow.name,
          primaryMenu:{
          value:selectedRow.idmenu,
          },
          menuLink: selectedRow.link,
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
    "name":formData.menuName?formData.menuName:"",
    "link":formData.menuLink?formData.menuLink:'',
    "idmenu":formData.primaryMenu.value?formData.primaryMenu.value:"",
    "type":formData.type?formData.type.value:"",
    "dated":new Date(),
    "ord":0,
    "icon":"",
    "del":0,
    "idby":localStorage.getItem('userId'),
    "sw":0 
     }
      if (Edit && selectedRow) {
        
            console.log(selectedRow,"selectedRow")
          axios.put(`${menu}/${selectedRow.id}`, payload)
        .then((res) => {
          toast.success(" updated successfully!");
          if (fetchSmenuData)  fetchSmenuData.fetchData();
          setEdit(false);
          reset({
       primaryMenu:"",
      menuName:"",
      menuLink:"",
      type:""
          });
        })
        .catch((err) => {
          toast.error("Update failed!");
          console.error(err);
        });
    }
    else{
    axios.post(menu,payload)
    .then((res)=>{
        console.log(res);
       
          toast.success("Add successfully!");
          if (fetchSmenuData)  fetchSmenuData.fetchData();

    reset();
    })
    .catch((err)=>{
        console.log(err);
          toast.error(err.message);
    })
}
        };
    return (

        <Fragment>
            <Row>
                <Col>
                    <fieldset>
                        <legend>{title}</legend>
                        <Form noValidate=''  onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col sm="4">
                                    <DropDown
                                        name="primaryMenu"
                                        label="Primary Menu "
                                        control={control}
                                        errors={errors}
                                        rules={!Edit &&{ required: "Menu is required" }}
                                        placeholder="Select Menu"
                                        // loading={companyLoading}
                                        options={pmenu}
                                    />

                                </Col>
                                <Col md="4">
                                    <InputText
                                        name="menuName"
                                        label="Menu Name "
                                        type="text"
                                        register={register}
                                        errors={errors}
                                        rules={!Edit &&{ required: " Required" }}
                                    />


                                </Col>
                                <Col md="4">
                                    <InputText
                                        name="menuLink"
                                        label="Menu Link "
                                        type="text"
                                        register={register}
                                        errors={errors}
                                        rules={!Edit &&{ required: " Required" }}
                                    />

                                </Col>

                            </Row>
                            <Row>
                                <Col md="4">
                                    <DropDown
                                        name="type"
                                        label="Type "
                                        control={control}
                                        errors={errors}
                                        rules={!Edit &&{ required: "Required" }}
                                        placeholder="Select Type"
                                        // loading={companyLoading}
                                        autoSelectFirst={true}
                                        options={type}
                                    />

                                </Col>
                                <Col md={8}>
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

export default SecondaryMenu;