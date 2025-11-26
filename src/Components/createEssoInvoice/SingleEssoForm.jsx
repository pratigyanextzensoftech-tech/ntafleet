import React, { Fragment,useState,useEffect } from "react";
import Select from "react-select";
import {
  checkBoxData,
  optionscountry,
  optionscompany,
  customizedTypeType,
  invoiceType1,
  InvoiceCategory,
  InvoiceShow,
  InVoiceSupplier,
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
const SingleEssoForm = ({ title, btnTtitle, type, supplier_ids, supplier_name, invoice_creation, invoice_type }) => {
     const[supplierData,setSupplierData]=useState([])
  
  const{data:company}=useCompany()
  const{data:country}=useCountry()
  console.log(type, "++++++++++++++");
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
  const onSubmit = (data) => {
    console.log("Form Data:", data); // ✅ This will print your inputs
    // alert("Form submitted successfully!");
  };
  const handleReset = () => {
    reset(); // reset all fields back to defaultValues (or empty if none given)
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    setSelectedValues((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((item) => item !== value);
      }
    });
  };
  return (
   <Fragment>
<Row>
<Col>
<fieldset>
<legend>{title}</legend>
 <Form noValidate="" onSubmit={handleSubmit(onSubmit)}>
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
                        options={company}
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
                    rules={{ required: "company Name is required" }}
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
                        rules={{ required: "End Date is required" }}
                        render={({ field }) => (
                          <DatePicker
                            placeholderText="Select End date"
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
                      {errors.endDate.message}
                    </span>
                  )}
                </Row>
              </FormGroup>
            </Col>
          </Row>
          <Row className="mt-3">
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
                        options={[country[1]]}
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
