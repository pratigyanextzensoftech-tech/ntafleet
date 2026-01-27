import React, { useState } from 'react';
import Select from 'react-select'
import { checkBoxData, optionscountry, supplier } from '../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText, Container } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { formatDate } from '../../Hooks/Dropdowns';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
const CheckInvoiceForm = ({onSearch}) => {
    const [selectedValues, setSelectedValues] = useState([]);
    const {
        register,
        control,
        reset,
        handleSubmit,
        formState: { errors, isSubmitted, isValid },
    } = useForm();
 const onSubmit = (data) => {
    console.log(data);
    
     let companyValue = "";
   if (Array.isArray(data.selectedCompanies)) {
  if (data.selectedCompanies.includes("All Company")) {
    companyValue = "All";   // 🔥 If ALL is selected
  } else {
    companyValue = data.selectedCompanies.join(",");  // 🔥 Convert array → string
  }
}
    const basePayload = {
     
      supplier_id: data?.supplier?.value ||"",
      country_id: data?.country?.value ||"",
      from: data.from ? formatDate(data.from) : "",
      to: data.to ? formatDate(data.to) : "",
     
    };
 if (onSearch){onSearch(basePayload)

 }   ;
         // setLoading(true);
    // axios
    //   .post(api_name, basePayload, {
    //     headers: { "Content-Type": "application/json" },
    //   })

    //   .then((res) => {
    //     toast.success(res.data.message);
    //     reset();
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     toast.error(err);
    //     setLoading(false);
    //   });

    console.log("Final Payload Sent =>", basePayload);
  };
    const handleReset = () => {
    reset(); // reset all fields back to defaultValues (or empty if none given)
  };

   
    return (

        <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >
                <Row className="mt-3">
                    <Col xxl="3" xl="4"  md="6" sm="12">
                        <Row>
                            <FormGroup className="m-form__group">
                                <InputGroup>

                                    <Col xs="3">
                                        <InputGroupText>
                                            From
                                        </InputGroupText>
                                    </Col>
                                    <Col xs="9">
                                        <Controller
                                            name="from"
                                            control={control}
                                            render={({ field }) => (
                                                <DatePicker
                                                    className={`form-control `}
                                                    selected={field.value}
                                                    onChange={(date) => field.onChange(date)}
                                                />
                                            )}
                                        /></Col>
                                </InputGroup>                           
                            </FormGroup>
                        </Row>
                    </Col>
                    <Col xxl="3" xl="4"  md="6" sm="12">
                        <Row>
                            <FormGroup className="m-form__group">
                                <InputGroup>
                                    <Col xs="3">
                                        <InputGroupText>
                                            To
                                        </InputGroupText>
                                    </Col>
                                    <Col xs="9">
                                        <Controller
                                            name="to"
                                            control={control}
                                            render={({ field }) => (
                                                <DatePicker
                                                    className={`form-control digits`}
                                                    selected={field.value}
                                                    onChange={(date) => field.onChange(date)}
                                                />
                                            )}
                                        />
                                    </Col>
                                </InputGroup>

                            </FormGroup>
                        </Row>
                    </Col>
        <Col xxl="3" xl="4"  md="6" sm="12">
                        <FormGroup className="m-form__group">
                            <InputGroup>
                                <InputGroupText>Country</InputGroupText>
                                <Controller
                                    name="country"

                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={optionscountry}
                                            className="form-control p-0 border-0"
                                            placeholder="Select Country"
                                        />
                                    )}
                                />
                            </InputGroup> 
                        </FormGroup>
                    </Col>
                    <Col xxl="3" xl="4"  md="6" sm="12">
                        <FormGroup className="m-form__group">
                            <InputGroup >
                                <InputGroupText>Supplier</InputGroupText>
                                <Controller name="supplier"

                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={supplier}
                                            className="form-control p-0 border-0"
                                            placeholder="Select Supplier"
                                        />
                                    )}
                                />
                            </InputGroup>                    
                        </FormGroup>
                    </Col>
        <Col className='ms-auto' xxl="3" xl="4"  md="6" sm="12">
<div className='text-end'>
                            <Btn attrBtn={{ color: "primary", type: "submit" }} >Search Data</Btn>
                        </div>
                        </Col>
            
                </Row>
           


        </Form>
    )
}


export default CheckInvoiceForm
