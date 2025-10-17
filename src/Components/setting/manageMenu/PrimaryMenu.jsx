
import React, { Fragment } from 'react';
import { Row, Col, Form } from 'reactstrap';
import { Btn } from "../../../AbstractElements";
import HeaderCard from '../../Common/Component/HeaderCard';
import { useForm } from 'react-hook-form';
import { type } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import InputText from '../../Forms/FormControl/formInput/InputText';
import DropDown from '../../Forms/FormControl/formInput/DropDown';
const PrimaryMenu = () => {
     const {
            register,
            control,
            reset,
            handleSubmit,
            formState: { errors, isSubmitted, isValid },
        } = useForm();
    return (
        <Fragment >
            <div style={{border:"1px solid #ccc",padding:"5px 5px",bprderRadius:"3px"}}>       
             <div className='bg-primary p-2 my-3'>
                <HeaderCard title="Add Primary Menu   " />
            </div>
            <Form>
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
                                                    <Btn attrBtn={{ color: "primary", className: "m-r-15 ", type: "submit" }} >Add Menu</Btn>
                                    </div>
                                            </Col>
                </Row>
               
            </Form>
            </div>
        </Fragment>
    );
};

export default PrimaryMenu;