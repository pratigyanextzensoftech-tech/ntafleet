import React from 'react'
import { Form, Row, Col, Card, CardBody, FormGroup, Input, InputGroupText ,InputGroup} from 'reactstrap'
import { Btn } from '../../../AbstractElements';
import { useForm } from 'react-hook-form';

import InputText from '../../Forms/FormControl/formInput/InputText';
const SupplierList = ({btntitle,btnTitle1}) => {
     const {
            register,
            control,
            reset,
            handleSubmit,
            formState: { errors, isSubmitted, isValid },
        } = useForm();
    
        const onSubmit = (data) => {
    
            console.log("Form Data:", data);  // ✅ This will print your inputs
            // alert("Form submitted successfully!");
    
        };
    return (
        <div>
            <Form noValidate='' onSubmit={handleSubmit(onSubmit)} className="form theme-form">
                <CardBody>
       
<Row>
 
                 <Col sm='9'>
                   <InputText
            name="supplier"
            label="Supplier Name"
            type="text"
            register={register}
            errors={errors}
            rules={{ required: "Required" }}
          />
                   
                  </Col>
             

                        <Col sm="3">

                            <div className='text-end'>
                                <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btntitle}</Btn>
                                 <button className='btn btn-secondary'>{btnTitle1}</button>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Form>
        </div>
    )
}

export default SupplierList
