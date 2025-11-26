import React, { Fragment,useState,useEffect } from "react";
import {
  Col,
  Row,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { Upload_Supplier,UlramarinvoiceType } from "../../Forms/FormWidget/FormSelect2/OptionDatas"; 
import DatePicker from "react-datepicker";
import { supplierById } from "../../../api";
import { useCountry } from "../../../Hooks/Dropdowns";
import axios from "axios";
import { useCompany } from "../../../Hooks/Dropdowns";
const CreateUltramar = ({ title, btnTtitle }) => {
   const [supplierData,setSupplierData]=useState([])
   const{data:Company}=useCompany()
    const{data:country}=useCountry()
    const {
       control,
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
       .get(`${supplierById}/10`)
       .then((res) => {
         const formatted = res.data.map((s) => ({
           value: s.id,
           label: s.supplier_name,
         }));
   
         setSupplierData(formatted);
         setValue("supplier", supplierData);
   
         // ⭐ Automatically set default supplier based on type
         
       })
       .catch((err) => console.log(err));
      
     }, [supplierData, setValue]);
  useEffect(() => {
    if (!country || country.length === 0) return;
  
      // Clear value if normal dropdown
      setValue("country", country[1]);
    
  }, [ country]);
  const onSubmit = (data) => {
    console.log("Form Data:", data); // ✅ This will print your inputs
    // alert("Form submitted successfully!");
  };
  return (
    <Fragment>
      <Row>
        <Col>
          <fieldset>
            <legend>{title}</legend>
            <Form
              className="px-2"
              noValidate=""
              onSubmit={handleSubmit(onSubmit)}
            >
              <Row className="mt-3">
                 <Col sm="3">
              <FormGroup className="m-form__group">
                <InputGroup>
                  <InputGroupText>Company</InputGroupText>
                  <Controller
                    name="company"
                    rules={{ required: "company Name is required" }}
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={Company}
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
              <Col sm="3">
              <FormGroup className="m-form__group">
                <InputGroup>
                  <InputGroupText>Invoice Type</InputGroupText>
                  <Controller
                    name="invoice"
              
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={
                            UlramarinvoiceType
                        }
                        className="form-control p-0 border-0"
                      />
                    )}
                  />
                </InputGroup>
                {errors.invoice && (
                  <span className="text-danger">{errors.invoice.message}</span>
                )}
              </FormGroup>
            </Col>
               <Col sm="3">
              <FormGroup className="m-form__group">
                <Row>
                  <InputGroup>
                    <Col sm="4">
                      {" "}
                      <InputGroupText>Start Date</InputGroupText>
                    </Col>
                    <Col sm="8">
                      <Controller
                        name="startDate"
                        control={control}
                        rules={{ required: "Start Date is required" }}
                        render={({ field }) => (
                          <DatePicker
                            placeholderText="Select start date"
                            className={`form-control `}
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                          />
                        )}
                      />
                    </Col>
                  </InputGroup>
                  {errors.startDate && (
                    <span className="text-danger">
                      {errors.startDate.message}
                    </span>
                  )}
                </Row>
              </FormGroup>
            </Col>
            <Col sm="3">
              <FormGroup className="m-form__group">
                <InputGroup>
                  <InputGroupText>End Date</InputGroupText>
                  <Controller
                    name="endDate"
                    control={control}
                    rules={{ required: "End Date is required" }}
                    render={({ field }) => (
                      <DatePicker
                        placeholderText="Select end date"
                        className={`form-control digits`}
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                      />
                    )}
                  />
                </InputGroup>
                {errors.endDate && (
                  <span className="text-danger">{errors.endDate.message}</span>
                )}
              </FormGroup>
            </Col>
             
                <Col sm="3">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>Supplier</InputGroupText>
                      <Controller
                        name="supplier"
                        control={control}
                        rules={{ required: "Supplier is required" }}
                        defaultValue={supplierData}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="form-control p-0 border-0"
                            placeholder="Select supplier"
                            onChange={(selectedOption) =>
                              field.onChange(selectedOption)
                            }
                            value={field.value}
                          />
                        )}
                      />
                    </InputGroup>

                    {errors.supplier && (
                      <span className="text-danger">
                        {errors.supplier?.message}
                      </span>
                    )}
                  </FormGroup>
                </Col>

             <Col sm="3">
                         <FormGroup className="m-form__group">
                           <InputGroup>
                             <InputGroupText>Country</InputGroupText>
                             <Controller
                               name="country"
                               rules={{ required: "country is required" }}
                               control={control}
                               render={({ field }) => (
                                 <Select
                                   {...field}
                                   className="form-control p-0 border-0"
                                   placeholder="Select Country"
                                 />
                               )}
                             />
                           </InputGroup>
           
                           {errors.country && (
                             <span className="text-danger">{errors.country?.message}</span>
                           )}
                         </FormGroup>
                       </Col>
                <Col sm="3">
                  <div className="text-end">
                    <Btn
                      attrBtn={{
                        color: "primary",
                        className: "m-r-15",
                        type: "submit",
                      }}
                    >
                      {btnTtitle}
                    </Btn>
                  </div>
                </Col>
              </Row>
            </Form>
          </fieldset>
        </Col>
      </Row>
    </Fragment>
  );
};
export default CreateUltramar;
