
import React, { Fragment } from 'react';
import { Row, Col, Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from "../../../AbstractElements";
import InputText from '../../Forms/FormControl/formInput/InputText';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { salesman as APINAME } from '../../../api';

const ManageSalesman = ({onDataAdded}) => {
        const {
            register,
            control,
            reset,
            handleSubmit,
            formState: { errors },
        } = useForm();
            const onSubmit = (formData) => {
                                console.log("Form Data:", formData);  // ✅ This will print your inputs
        
             const payload = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
                pic:"",
                created:new Date(),
                status:0,
                admin_del:0,
                added_by:0
             }
          axios.post(APINAME, payload)
  .then((res) => {
    console.log(res.data);
    toast.success("Added successfully!");
    reset();

    // ✅ Immediately update UI
    if (onDataAdded) onDataAdded(res.data); 
  })
  .catch((err) => {
    console.log(err);
    toast.error(err.message);
  });

                };
    return (
        <Fragment >
                    <Form noValidate='' onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col md="4">
                                  <InputText
            name="name"
            label="Name"
            type="text"
            register={register}
            errors={errors}
            rules={{ required: "Required" }}
          />
                               
                            </Col>
                            <Col md="4">
                                <InputText
            name="email"
            label="Email"
            type="email"
            register={register}
            errors={errors}
            rules={{ required: "Required" }}
          />
                              
                            </Col>
                            <Col md="4">
                                <InputText
            name="phone"
            label="Phone"
            type="number"
            register={register}
            errors={errors}
            rules={{ required: "Required" }}
          />
                              
                            </Col>
                        </Row>
                        <Row>
                            <Col md={8}>
                                  <InputText
            name="address"
            label="Address"
            type="text"
            register={register}
            errors={errors}
            rules={{ required: "Required" }}
          />
                            
                            </Col>
                            
                           
                           
                            

                        
                        <Col md={4}>
                         <div className='text-end'>
                                <Btn attrBtn={{ color: "primary", className: "m-r-15 ", type: "submit" }} >Add Sales Man</Btn>
                </div>
                        </Col>
                 </Row>
                                  </Form>
                

               
          
{/* </div> */}
        </Fragment>
    );
};

export default ManageSalesman;