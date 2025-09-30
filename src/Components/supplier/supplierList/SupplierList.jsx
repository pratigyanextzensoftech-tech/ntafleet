import React from 'react'
import { Form, Row, Col, Card, CardBody, FormGroup, Input, InputGroupText ,InputGroup} from 'reactstrap'
import { Btn } from '../../../AbstractElements';
import { useForm } from 'react-hook-form';


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
                    <FormGroup className=" m-form__group">
                      <InputGroup>
                        <InputGroupText>  Supplier Name </InputGroupText>
                        <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('SupplierName', { required: true })} />
                      </InputGroup>
                      {errors.userName && (
                        <span className="text-danger">Supplier Name is required</span>
                      )}
                    </FormGroup>
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
