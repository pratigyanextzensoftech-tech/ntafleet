import React, { useState } from 'react';
import Select from 'react-select'
import { optionscompany } from '../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText, Container } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import { useCompany } from '../../Hooks/Dropdowns';
const ViewMoneyCodeForm = ({onSearch}) => {
    const [selectedValues, setSelectedValues] = useState([]);
    const{data:company}=useCompany()
    const {
        register,
        control,
        reset,
        handleSubmit,
        formState: { errors, isSubmitted, isValid },
    } = useForm();

 const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
  };

      const onSubmit = (data) => {
    
   
    const basePayload = {
      company_id:data?.company?.value ||"" ,
      from: data.from ? formatDate(data.from) : "",
      to: data.to ? formatDate(data.to) : "",
     
    };
 if (onSearch){
onSearch(basePayload)

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
  

    
    return (

        <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >
            <Row className="mt-3">
                <Col sm="3">
                    <Row>
                        <FormGroup className="m-form__group">
                            <InputGroup>

                                <Col sm="3">
                                    <InputGroupText>
                                        From Date
                                    </InputGroupText>
                                </Col>
                                <Col sm="9">
                                    <Controller
                                        name="from"
                                        control={control}
                                        render={({ field }) => (
                                            <DatePicker
                                                className={`form-control `}
                                                selected={field.value}
                                                onChange={(date) => field.onChange(date)}
                                                dateFormat="yyyy-MM-dd"

                                            />
                                        )}
                                    /></Col>




                            </InputGroup>

                           
                        </FormGroup>
                    </Row>
                </Col>
                <Col sm="3">
                    <Row>
                        <FormGroup className="m-form__group">
                            <InputGroup>
                                <Col sm="3">

                                    <InputGroupText>
                                        To
                                    </InputGroupText>
                                </Col>
                                <Col sm="9">

                                    <Controller
                                        name="to"
                                        control={control}
                                        render={({ field }) => (
                                            <DatePicker
                                                className={`form-control digits`}
                                                selected={field.value}
                                                onChange={(date) => field.onChange(date)}
                                                 dateFormat="yyyy-MM-dd"

                                            />
                                        )}
                                    />
                                </Col>
                            </InputGroup>

                           
                        </FormGroup>
                    </Row>
                </Col>
                <Col sm="3">
                    <FormGroup className="m-form__group">
                        <InputGroup >
                            <InputGroupText>Company</InputGroupText>
                            <Controller name="company"

                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={company}
                                        className="form-control p-0 border-0"
                                        placeholder="Select Company Name"
                                    />
                                )}
                            />
                        </InputGroup>

                      
                    </FormGroup>
                </Col>
                <Col sm="3">

                    <div className='text-end'>
                        <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >Search Data</Btn>

                    </div>
                </Col>

            </Row>



        </Form>
    )
}


export default ViewMoneyCodeForm
