import React, { useState } from 'react';
import Select from 'react-select'
import { Row, Col, Form} from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm } from 'react-hook-form';
import DatePickerInput from '../../Forms/FormControl/formInput/DatePickerInput';
import InputText from '../../Forms/FormControl/formInput/InputText';
const PetroForm = ({btnTitle,btnTitle1}) => {
    const [selectedValues, setSelectedValues] = useState([]);
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
    const handleReset = () => {
    reset(); // reset all fields back to defaultValues (or empty if none given)
  };

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

        <Form className='px-2' noValidate='' onSubmit={handleSubmit(onSubmit)}  >
                <Row className="mt-3">
               <Col sm='4'>
                                         <Row>
                                                                       
 <InputText
            name="file"
            label="File"
            type="file"
            register={register}
            errors={errors}
            rules={{ required: " Required" }}
          />
                                                                                               </Row>
                                      </Col>
         <Col sm="4">
                        <Row>
                             <DatePickerInput
        name="endDate"
        control={control}              // ✅ make sure this is passed
        label="Date"
        errors={errors}
        required=" Date is required"
      />     
                      
                        </Row>
                    </Col>

         <Col sm="4">
                       
                   
                   

<div className='text-end'>
                            <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTitle}</Btn>
                                                             <button className='btn btn-secondary'>{btnTitle1}</button>

                        </div>
             </Col>
                </Row>
           


        </Form>
    )
}


export default PetroForm
