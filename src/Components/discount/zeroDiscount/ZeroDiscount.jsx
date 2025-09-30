import React from 'react';
import Select from 'react-select'
import { InVoiceSupplier } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup,  InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import HeaderCard from '../../Common/Component/HeaderCard';
const ZeroDiscount = ({title,btnTitle}) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {

        console.log("Form Data:", data);  // ✅ This will print your inputs
        // alert("Form submitted successfully!");

    };
   

  
    return (
<>
<HeaderCard title={title}/>
        <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >
               
                <Row className="mt-3">
  <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  State </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control " type="text"  {...register('state', { required: true })} />
                            </InputGroup>
                            {errors.state && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
    <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  City Name </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control " type="text"  {...register('city', { required: true })} />
                            </InputGroup>
                            {errors.city && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                        <Col sm='3'>
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText> Location #(6 Digit) </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control " type="text"  {...register('location', { required: true })} />
                            </InputGroup>
                            {errors.location && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
<Col sm="3">
                  <FormGroup className="m-form__group">
                    <InputGroup >
                      <InputGroupText>Supplier</InputGroupText>
                      <Controller
                        name="supplier"
                      rules={{ required: "supplier is required" }}
                       
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                                 options={
            InVoiceSupplier // your normal supplier array
            }
                            className="form-control p-0 border-0"
                            placeholder="Select supplier"
                          />
                        )}
                      />
                    </InputGroup>

                    {errors.supplier && (
                      <span className="text-danger">{errors.supplier?.message}</span>
                    )}
                  </FormGroup>
                </Col>

                  </Row>



           <Row>
                    <Col sm="12">
                        <div className='text-end'>
                            <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTitle}</Btn>

                        </div>
                    </Col>

           </Row>
        </Form>
        </>
    )
}


export default ZeroDiscount
