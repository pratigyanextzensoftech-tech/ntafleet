import React, { useState,useEffect } from 'react';
import Select from 'react-select'
import { cardStatus } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText, Container } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import { fual_card as APINAME } from "../../../api"; // your fuel card API endpoint
import axios from 'axios';
import { useCompany } from '../../../Hooks/Dropdowns';
import { toast } from 'react-toastify';
import { supplierById } from '../../../api';
const AddFuel = ({btnTitle}) => {
    const [supplierData,setSupplierData]=useState([])
        const [selectedValues, setSelectedValues] = useState([]);
   const {
        control,
        register,
        reset,
        handleSubmit,
        setValue,

        formState: { errors },
      } = useForm({
        defaultValues: {
          supplier: null,
        },
      });
    
      useEffect(() => {
        
         axios
        .get(`${supplierById}/6,9,8,1,5,7,4,3,10,11`)
        .then((res) => {
          const formatted = res.data.map((s) => ({
            value: s.id,
            label: s.supplier_name,
          }));
    
          setSupplierData(formatted);
          // setValue("supplier", supplierData);
    
          // ⭐ Automatically set default supplier based on type
          
        })
        .catch((err) => console.log(err));
       
      }, [supplierData, setValue]);
  const {data}=useCompany()
    const onSubmit = (formData) => {
                        console.log("Form Data:", formData);  // ✅ This will print your inputs

     const payload = {
    card_no: formData.cardNo,
    policy:formData.policyNo,
    unit_number:formData.unitNo,
    pin_number:formData.pinNo,
company_id:formData.company.value,
supplier_id:formData.supplier.value,
driver_name:formData.driverName,
d_mobile1:formData.driverMobile,
d_mobile2:formData.driverMobile2,
status:formData.cardStatus.label,
supplier_name:formData.supplier.label,
cardno:"",
company_name:formData.company.label,
update_otp:""

     }
    axios.post(APINAME,payload)
    .then((res)=>{
        console.log(res);
       
          toast.success("Add successfully!");

   reset();

        // if (onDataAdded) onDataAdded();
    })
    .catch((err)=>{
        console.log(err);
          toast.error(err.message);
    })
        
  }
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;

        setSelectedValues(prev => {
            if (checked) {
                return [...prev, value];
            } else {
                return prev.filter(item => item !== value);
            }
        });
    }
    return (

        <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >
                <Row className="mt-3">
                     <Col xl='4' md="6">
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  Card Number </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="number"  {...register('cardNo', { required: true })} />
                            </InputGroup>
                            {errors.cardNo && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                     <Col xl='4' md="6">
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  Policy Number </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="number"  {...register('policyNo', { required: true })} />
                            </InputGroup>
                            {errors.policyNo && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                     <Col xl='4' md="6">
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  Unit Number  </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="number"  {...register('unitNo', { required: true })} />
                            </InputGroup>
                            {errors.unitNo && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                       <Col xl='4' md="6">
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  Pin Number </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="number"  {...register('pinNo', { required: true })} />
                            </InputGroup>
                            {errors.pinNo && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                  
                 
         <Col xl='4' md="6">
                        <FormGroup className="m-form__group">
                            <InputGroup >
                                <InputGroupText>Company</InputGroupText>
                                <Controller name="company"
                                    rules={{ required: "company Name is required" }}

                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={data}
                                            className="form-control p-0 border-0"
                                            placeholder="Select Company Name"
                                        />
                                    )}
                                />
                            </InputGroup>

                            {errors.company && (
                                <span className="text-danger">{errors.company?.message}</span>
                            )}
                        </FormGroup>
                    </Col>

        <Col xl='4' md="6">
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
               supplierData // your normal supplier array
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
      
                     <Col xl='4' md="6">
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  Driver Name </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('driverName', { required: true })} />
                            </InputGroup>
                            {errors.driverName && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                     <Col xl='4' md="6">
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>  Driver Mobile 1  </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('driverMobile', { required: true })} />
                            </InputGroup>
                            {errors.driverMobile && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                     <Col xl='4' md="6">
                          <FormGroup className=" m-form__group">
                            <InputGroup>
                              <InputGroupText>   Driver Mobile 2 </InputGroupText>
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('driverMobile2', { required: true })} />
                            </InputGroup>
                            {errors.driverMobile && (
                              <span className="text-danger"> Required</span>
                            )}
                          </FormGroup>
                        </Col>
                 
       <Col xl='4' md="6">
                  <FormGroup className="m-form__group">
                    <InputGroup >
                      <InputGroupText>Card Status</InputGroupText>
                      <Controller
                        name="cardStatus"
                      rules={{ required: " Required" }}
                        
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                                 options={
               cardStatus // your normal supplier array
            }
                            className="form-control p-0 border-0"
                            placeholder="Select Card Status"
                          />
                        )}
                      />
                    </InputGroup>

                    {errors.cardStatus && (
                      <span className="text-danger">{errors.cardStatus?.message}</span>
                    )}
                  </FormGroup>
                </Col>
                       <Col xl='8'>

<div className='text-end'>
                            <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTitle}</Btn>

                        </div>
                        </Col>
                        </Row>
            
           


        </Form>
    )
}


export default AddFuel
