import React, { Fragment,useState,useEffect } from 'react';
import Select from 'react-select'
import { checkBoxData, optionscountry, optionscompany, customizedTypeType, invoiceType1, InvoiceCategory, InvoiceShow, Customized_Supplier } from '../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText, Container } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import HeaderCard from '../Common/Component/HeaderCard';
import { useCompany,useCountry } from '../../Hooks/Dropdowns';
import { supplierById } from '../../api';
import axios from 'axios';
const SingleCustomized_ca = ({ title, btnTtitle, type }) => {
    const[supplierData,setSupplierData]=useState([])
  
  const {data:companies}=useCompany()
  const {data:country}=useCountry()
  console.log(type, '++++++++++++++')
  const [selectedValues, setSelectedValues] = useState([]);
  const { control, handleSubmit, formState: { errors }, setValue,reset } = useForm();
 
useEffect(() => {
  if (!country || country.length === 0) return;
    // Clear value if normal dropdown
 setValue("country", country[1]);   
}, [type, country]);
useEffect(() => {

  axios
    .get(`${supplierById}/6,10`)
    .then((res) => {
      const formatted = res.data.map((s) => ({
        value: s.id,
        label: s.supplier_name,
      }));

      setSupplierData(formatted);
        setValue("supplier", null); // no default for no-type
    })
    .catch((err) => console.log(err));
}, [type, setValue]);
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
    <Fragment>
      <Row>
        <Col>
          <fieldset>
            <legend>{title}</legend>
            <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >
              <Row className="mt-3">
                <Col sm="3">
                  <FormGroup className="m-form__group">
                    <InputGroup >
                      <InputGroupText>Company</InputGroupText>
                      <Controller name="company"
                        rules={{ required: "company Name is required" }}

                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={companies}
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
                      <InputGroupText>
                        Invoice Type
                      </InputGroupText>
                      <Controller name="invoice"
                        rules={{ required: "company Name is required" }}

                        defaultValue={type === "owner_operator" || type === "single_owner_ultramar" ? invoiceType1[3] : null}
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={type === "owner_operator" || type === "single_owner_ultramar" ? [invoiceType1[3]] : invoiceType1}
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
                        <span className="text-danger">{errors.startDate.message}</span>
                      )}
                    </Row>



                  </FormGroup>
                </Col>
                <Col sm="3">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                                            <Col sm="4">     

                      <InputGroupText>End Date</InputGroupText>
                      </Col>
                      <Col sm="8">
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
</Col>
                    </InputGroup>
                    {errors.endDate && (
                      <span className="text-danger">{errors.endDate.message}</span>
                    )}
                  </FormGroup>

                </Col>







              </Row>
              <Row className="mt-3">
                <Col sm="3">
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
                              supplierData
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
                             value={field.value}
        onChange={(val) => field.onChange(val)}
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
                  <div className='text-end'>
                    <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTtitle}</Btn>

                  </div>
                </Col>
              </Row>


            </Form>
          </fieldset>
        </Col>
      </Row>
    </Fragment>

  )
}


export default SingleCustomized_ca
