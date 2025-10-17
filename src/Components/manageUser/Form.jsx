
import React, { Fragment } from 'react';
import { Row, Col, Form, FormGroup,  Input, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from "../../AbstractElements";
import {add_user} from '../../Constant'
import HeaderCard from '../Common/Component/HeaderCard';
import Select from 'react-select'
import { companyLoginAccess,manageuserStatus } from '../Forms/FormWidget/FormSelect2/OptionDatas';
import InputText from '../Forms/FormControl/formInput/InputText';
import { useForm } from 'react-hook-form';
import DropDown from '../Forms/FormControl/formInput/DropDown';
const FormComponent = () => {
    const {
            register,
            control,
            reset,
            handleSubmit,
            formState: { errors, isSubmitted, isValid },
        } = useForm();
    return (
        <Fragment>
              
                    <Form>
                        <Row>
                            <Col md="4">
                                <InputText
            name="Name"
            label="Name"
            placeholder="Enter Name"
            type="text"
            register={register}
            errors={errors}
            rules={{ required: "Name is required" }}
          />
                        
                            </Col>
                            <Col md="4">
                               <InputText
            name="email"
            label="Email"
            placeholder="Enter Email"
            type="email"
            register={register}
            errors={errors}
            rules={{ required: "Email is required" }}
          />
                             
                            </Col>
                            <Col md="4">
                              <InputText
            name="phone"
            label="Phone"
            placeholder="Enter Phone"
            type="number"
            register={register}
            errors={errors}
            rules={{ required: "Number is required" }}
          />
                                
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                              <InputText
            name="company"
            label="Company"
            placeholder="Enter Company"
            type="text"
            register={register}
            errors={errors}
            rules={{ required: "Company is required" }}
          />
                              
                            </Col>
                            <Col md={4}>
                              <InputText
            name="password"
            label="Password"
            placeholder="Enter Password"
            type="password"
            register={register}
            errors={errors}
            rules={{ required: "Password is required" }}
          />
                              
                         
                            </Col>
                           
                           
                            <Col md={4}>
                             <DropDown
           name="status"
  label="User Status"
  control={control}
  rules={{ required: "Status is required" }}
  placeholder="Select Status"
  // loading={companyLoading}
  options={manageuserStatus}
  autoSelectFirst={true}
 />
                               
                            </Col>

                        </Row>
                        <Row>
                            <Col md={4}>
                                                        <DropDown
           name="loginAcess"
  label="Company Login Access"
  control={control}
  rules={{ required: "Access is required" }}
  // loading={companyLoading}
  options={companyLoginAccess}
 />
                             
                            </Col>

                   
                                            <Col md={8}>

                <div className='text-end'>
                                <Btn attrBtn={{ color: "primary", className: "m-r-15 ", type: "submit" }} >{add_user}</Btn>
                </div>
                </Col>
                                 </Row>
                                  </Form>
            
                               

               
          

        </Fragment>
    );
};

export default FormComponent;