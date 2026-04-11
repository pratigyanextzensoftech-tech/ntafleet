import React, { useState,useEffect } from 'react';
import Select from 'react-select'
import { cardStatus } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText, Container } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import { fual_card as APINAME } from "../../../api"; // your fuel card API endpoint
import axios from 'axios';
import { useCompany } from '../../../Hooks/Dropdowns';
import { supplierById } from '../../../api';
import { toast } from 'react-toastify';
const AddFuel = ({btnTitle}) => {
    const [supplierData,setSupplierData]=useState([])
        const [selectedValues, setSelectedValues] = useState([]);
   const {
        control,
        register,
        reset,
         watch,
        handleSubmit,
        setValue,

        formState: { errors },
      } = useForm({
        defaultValues: {
          supplier: null,
        },
      });
        const selectedSupplier = watch("supplier");

    const currentYear = new Date().getFullYear();

const yearOptions = Array.from({ length: 21 }, (_, i) => {
  const year = currentYear - 10 + i; // start from -10 to +10
  return {
    label: year.toString(),
    value: year.toString(),
  };
});
const monthOptions = [
  { label: " Jan", value: "01" },
  { label: " Feb", value: "02" },
  { label: " Mar", value: "03" },
  { label: " Apr", value: "04" },
  { label: " May", value: "05" },
  { label: " Jun", value: "06" },
  { label: " Jul", value: "07" },
  { label: " Aug", value: "08" },
  { label: " Sep", value: "09" },
  { label: " Oct", value: "10" },
  { label: " Nov", value: "11" },
  { label: " Dec", value: "12" },
];
    
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
exp_month:formData.exp_month ||"",
exp_year:formData.exp_year ||"",
exp_date:`${formData.exp_year}-${formData.exp_month}-01`,
update_otp:"",


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
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="number"  {...register('unitNo')} />
                            </InputGroup>
                          
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
                              <input style={{border:"1px solid #ccc"}} className="form-control" type="text"  {...register('driverName')} />
                            </InputGroup>
                          
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
                  <Col xl="4" md="6">

<FormGroup className="m-form__group">
    <InputGroup>
      <InputGroupText>Expiry </InputGroupText>

      <Controller
        name="exp_month"
        control={control}
        rules={{
    validate: () => {
      if (selectedSupplier?.label !== "ESSO") return true;

      const month = watch("exp_month");
      const year = watch("exp_year");

      if (!month && !year) return "Month and Year are required";
      if (!month) return "Month is required";
      if (!year) return "Year is required";

      return true;
    }
  }}
        render={({ field }) => (
          <Select
            {...field}
            options={monthOptions}
            className="form-control p-0 border-0"
            placeholder=" Month"
            onChange={(selected) => field.onChange(selected?.value)}
            value={monthOptions.find(opt => opt.value === field.value)}
          />
        )}
      />
         <Controller
        name="exp_year"
        control={control}
  rules={{
    validate: () => {
      if (selectedSupplier?.label !== "ESSO") return true;

      const month = watch("exp_month");
      const year = watch("exp_year");

      if (!month && !year) return "Month and Year are required";
      if (!month) return "Month is required";
      if (!year) return "Year is required";


      return true;
    }
  }}
        render={({ field }) => (
          <Select
            {...field}
            options={yearOptions}
            className="form-control p-0 border-0"
            placeholder=" Year"
            onChange={(selected) => field.onChange(selected?.value)}
            value={yearOptions.find(opt => opt.value === field.value)}
          />
        )}
      />
    </InputGroup>

   {(errors.exp_month || errors.exp_year) && (
  <div className="text-danger mt-1">
    {errors.exp_month?.message || errors.exp_year?.message}
  </div>
)}
  </FormGroup>
  
</Col>                
 <Col xl='8' className='ms-auto'>
<div className='text-end'>
                            <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTitle}</Btn>

                        </div>
                        </Col>
                        </Row>
        </Form>
    )
}


export default AddFuel
