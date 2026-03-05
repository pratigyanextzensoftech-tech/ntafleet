
import React, { Fragment,useEffect,useState } from 'react';
import { Row, Col, Form } from 'reactstrap';
import { Btn } from "../../../AbstractElements";
import InputText from '../../Forms/FormControl/formInput/InputText';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { linamar_esso_loc as APINAME } from '../../../api';
import Loader from '../../../Layout/Loader';
import axios from 'axios'
const LinamarForm = ({onDataAdded,Edit,selectedRow,setEdit}) => {
    const[loading,setLoading]=useState(false)
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
            setLoading(true)
            console.log(selectedRow)
          reset({
            essoLoc: selectedRow.esso_location,
            flyingLoc: selectedRow.fj_location , // prefill dropdown
          flyingJLOc: selectedRow.loc_id, 
          flyingJSite: selectedRow.site_id, 
          });
                      setLoading(false)
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
            setLoading(true)
          axios.put(`${APINAME}/${selectedRow.id}`, payload)
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