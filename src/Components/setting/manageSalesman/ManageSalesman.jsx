
import React, { Fragment } from 'react';
import { Row, Col, Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from "../../../AbstractElements";
import InputText from '../../Forms/FormControl/formInput/InputText';
import { useForm } from 'react-hook-form';
const ManageSalesman = () => {
        const {
            register,
            control,
            handleSubmit,
            formState: { errors },
        } = useForm();
    return (
        <Fragment >
                    <Form>
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
            type="number"
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