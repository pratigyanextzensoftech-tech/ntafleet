import React, { useState } from 'react';
import Select from 'react-select'
import { optionscompany } from '../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText, Container } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import useCompany from '../../Hooks/useCompany';
const ViewMoneyCodeForm = ({onSearch}) => {
    const [selectedValues, setSelectedValues] = useState([]);
    const{companies}=useCompany()
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
                <Col  xl="3"  md="6" sm="12">
                    <Row>
                        <FormGroup className="m-form__group">
                            <InputGroup>

                                <Col xs="3">
                                    <InputGroupText>
                                        From Date
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
                                                dateFormat="yyyy-MM-dd"

                                            />
                                        )}
                                    /></Col>




                            </InputGroup>

                           
                        </FormGroup>
                    </Row>
                </Col>
                <Col  xl="3"  md="6" sm="12">
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
                                                 dateFormat="yyyy-MM-dd"

                                            />
                                        )}
                                    />
                                </Col>
                            </InputGroup>

                           
                        </FormGroup>
                    </Row>
                </Col>
                <Col  xl="3"  md="6" sm="12">
                    <FormGroup className="m-form__group">
                        <InputGroup >
                            <InputGroupText>Company</InputGroupText>
                            <Controller name="company"

                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={companies}
                                        className="form-control p-0 border-0"
                                        placeholder="Select Company "
                                    />
                                )}
                            />
                        </InputGroup>

                      
                    </FormGroup>
                </Col>
                <Col  xl="3"  md="6" sm="12">

                    <div className='text-end'>
                        <Btn attrBtn={{ color: "primary",  type: "submit" }} >Search Data</Btn>

                    </div>
                </Col>

            </Row>



        </Form>
    )
}


export default ViewMoneyCodeForm
