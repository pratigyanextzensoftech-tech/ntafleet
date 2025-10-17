import React from 'react';
import Select from 'react-select'
import {  optionscountry } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form} from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm } from 'react-hook-form';
import DatePickerInput from '../../Forms/FormControl/formInput/DatePickerInput';
import DropDown from '../../Forms/FormControl/formInput/DropDown';
import HeaderCard from '../../Common/Component/HeaderCard';
import useCompany from '../../../Hooks/useCompany';
import useSupplier from '../../../Hooks/useSupplier';

const BulkDiscount = ({title,btnTitle}) => {
  const { companies: companyOptions, loading: companyLoading } = useCompany();
  const { supplier, loading, error } = useSupplier();
    const {
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
                    
                       <Col sm="3">
          <DatePickerInput
        name="startDate"
        control={control}              // ✅ make sure this is passed
        label="Start Date"
        placeholder="Select start date" // ✅ fixed spelling
        errors={errors}
                required="start Date is required"
      />
                </Col>
                       <Col sm="3">
              <DatePickerInput
        name="endDate"
        control={control}              // ✅ make sure this is passed
        label="End Date"
        placeholder="Select end date" // ✅ fixed spelling
        errors={errors}
        required="End Date is required"
      />   
                </Col>
                          
                <Col sm="3">
                 <DropDown
           name="country"
  label="Country"
          errors={errors}
  control={control}
rules={{ required: "Country is required" }}
  placeholder="Select Country"
  // loading={companyLoading}
  options={optionscountry}
 />
                      
                    </Col>
                


<Col sm="3">
<DropDown
           name="supplier"
  label="Supplier"
          errors={errors}

  control={control}
  rules={{ required: "supplier is required" }}
  placeholder="Select supplier"
  // loading={companyLoading}
  options={supplier}
 />
                </Col>
               

                   
                </Row>
                <Row className="mt-3">
 
             




           
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


export default BulkDiscount
