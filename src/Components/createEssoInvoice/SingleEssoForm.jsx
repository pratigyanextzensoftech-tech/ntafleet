import React, { Fragment,useState,useEffect } from "react";
import Select from "react-select";
import {
 
  invoiceType1,
  InvoiceCategory
  
} from "../Forms/FormWidget/FormSelect2/OptionDatas";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupText,
  Container,
} from "reactstrap";
import { Btn } from "../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import { useCompany,useCountry } from "../../Hooks/Dropdowns";
import DatePicker from "react-datepicker";
import axios from "axios";
import { supplierById } from "../../api";
const SingleEssoForm = ({ title, btnTtitle, type, supplier_ids, supplier_name, invoice_creation, invoice_type,onSearch,company_list }) => {
     const[supplierData,setSupplierData]=useState([])
  
  const{data:company}=useCompany()
  const{data:country}=useCountry()
  // console.log(type, "++++++++++++++");
  const [selectedValues, setSelectedValues] = useState([]);
  const {
    register,
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm();
const getParamsByType = () => {
  switch (type) {
    case "single_ultramar":
      return "10";
    case "single_owner_ultramar":
      return "10";
      case "repeat_ultramar":
      return "10";
      case "esso_invoice":
        return 6;
        case "owner_operator":
          return 6;
        case "single":
        return "6"
    default:
      return "3,6"; // no type → hit default API
  }
};
useEffect(() => {
  const params = getParamsByType();
  axios
    .get(`${supplierById}/${params}`)
    .then((res) => {
      const formatted = res.data.map((s) => ({
        value: s.id,
        label: s.supplier_name,
      }));

      setSupplierData(formatted);

      // ⭐ Automatically set default supplier based on type
      if (type === "single_ultramar") {
        setValue("supplier", formatted[0]); // pick first data
      } else if (type === "single_owner_ultramar") {
        setValue("supplier", formatted[1] || formatted[0]);
      }
      else if(type==="repeat_ultramar"){
                setValue("supplier", formatted[0] );
      }
      else if(type==="esso_invoice" || type==="single" || type==="owner_operator"){
                        setValue("supplier", formatted[0] );

      }
      else { 
        setValue("supplier", null); // no default for no-type
      }
    })
    .catch((err) => console.log(err));
}, [type, setValue]);
 useEffect(() => {
    if (!country || country.length === 0) return;
      setValue("country", country[1]);
    
  }, [ country]);
    const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const onSubmit = (data) => {
    console.log("Form Data:", data); 
    const payload={
company_id:data.company?.value,
country:data.country?.label,
invoice_type:data.invoice?.value,
to:data.endDate? formatDate(data.endDate) : "",
from:data.startDate? formatDate(data.startDate) : "",
supplier_id:data.supplier?.value,
invcat:data?.invCat?.value?data?.invCat?.value:"",


    }
     if (onSearch) onSearch(payload);// ✅ This will print your inputs
    // alert("Form submitted successfully!");
  };
  const handleReset = () => {
    reset(); // reset all fields back to defaultValues (or empty if none given)
  };


  return (
   <Fragment>
<Row>
<Col>
<fieldset>
<legend>{title}</legend>
 <Form noValidate="" onSubmit={handleSubmit(onSubmit)}>
          <Row className="mt-3">
            {company_list==!false &&(
            <Col sm="3">
              <FormGroup className="m-form__group">
                <InputGroup>
                  <InputGroupText>Company</InputGroupText>
                  <Controller
                    name="company"
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
              )}
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
                        render={({ field }) => (
                          <DatePicker
                            placeholderText="Select start date"
                            className={`form-control `}
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            dateFormat="yyyy-MM-dd"

                          />
                        )}
                      />
                    </Col>
                  </InputGroup>
                 
                </Row>
              </FormGroup>
            </Col>
         <Col sm="3">
              <FormGroup className="m-form__group">
                <Row>
                  <InputGroup>
                    <Col sm="4">
                      {" "}
                      <InputGroupText>End Date</InputGroupText>
                    </Col>
                    <Col sm="8">
                      <Controller
                        name="endDate"
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            placeholderText="Select End date"
                            className={`form-control `}
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                             dateFormat="yyyy-MM-dd"

                          />
                        )}
                      />
                    </Col>
                  </InputGroup>
                 
                </Row>
              </FormGroup>
            </Col>
              <Col sm="3">
              <FormGroup className="m-form__group">
                <InputGroup>
                  <InputGroupText>Supplier</InputGroupText>
                  <Controller
                    name="supplier"
                    rules={{ required: "supplier is required" }}
                   
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={
                        supplierData
                        }
                        className="form-control p-0 border-0"
                        placeholder="Select supplier"
                      />
                    )}
                  />
                </InputGroup>

              
              </FormGroup>
            </Col>
            <Col sm="3">
              <FormGroup className="m-form__group">
                <InputGroup>
                  <InputGroupText>Country</InputGroupText>
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={[country[1]]}
                        className="form-control p-0 border-0"
                        placeholder="Select Country"
                      />
                    )}
                  />
                </InputGroup>

               
              </FormGroup>
            </Col>
            <Col sm="3">
              <FormGroup className="m-form__group">
                <InputGroup>
                  <InputGroupText>Invoice Type</InputGroupText>
                  <Controller
                    name="invoice"
                    defaultValue={
                      type === "owner_operator" ||
                      type === "single_owner_ultramar"
                        ? invoiceType1[3]
                        : type === "repeat_ultramar"
                        ? invoiceType1
                        : null
                    }
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={
                          type === "owner_operator" ||
                          type === "single_owner_ultramar"
                            ? [invoiceType1[3]]
                            : type === "repeat_ultramar"
                            ? invoiceType1
                            : invoiceType1
                        }
                        className="form-control p-0 border-0"
                      />
                    )}
                  />
                </InputGroup>
             
              </FormGroup>
            </Col>
 <Col sm="3">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>Invoice Category</InputGroupText>
                      <Controller
                        name="invCat"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={InvoiceCategory}
                            className="form-control p-0 border-0"
                          />
                        )}
                      />
                    </InputGroup>

                  
                  </FormGroup>
                </Col>
         
          
          

            <Col sm="6">
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

export default SingleEssoForm;
