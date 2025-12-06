import React, { Fragment, useState } from 'react';
import Select from 'react-select'
import { groupBy, optionscountry, displayFeatureCheckBox, chooseSupplierCheckBox, optionscompany, invoiceType, orderBy, fuelType, currency,Reportcurrency, InvoiceCategory, InvoiceShow, exportType, VolUnit } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import { useCompany,useCountry,useStates,useSupplier } from '../../../Hooks/Dropdowns';
import axios from 'axios';
import {
  report_new as api_name
} from "../../../api";
import InputText from '../../Forms/FormControl/formInput/InputText';
import { toast } from 'react-toastify';
import Loader from '../../../Layout/Loader';
const CreateReport = ({ title }) => {
    const [selectedValues, setSelectedValues] = useState([]);
const [featureState, setFeatureState] = useState({
pageBreak: "",
    showTaxes: "",
    excludeTax: "",
    showDiscountDetails: "",
    noTime: "",
});
    
        const [loading, setLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(true);
    const{data:company}=useCompany();
    const{data:country}=useCountry()
    const{data:states}=useStates()
    const{data:supplier}=useSupplier()

   const { register, control, reset, handleSubmit, isValid, formState: { errors } } = useForm({
  mode: "onChange",   defaultValues: {
  company: null, // required field
  country: null, // required field
  state: null,   // required field
  volUnit: VolUnit.find(x => x.value === "Gallon"),
  currency: Reportcurrency.find(x => x.label === "USD"),
  fuelType: fuelType[0],
  orderBy: orderBy[0],
  groupBy: groupBy[0],
  supplier: [],      // required array
  features: [],      // optional array
  startDate: null,   // required
  endDate: null,     // required
  exportType: null,  // required
  file: "",          // required
  card: "",          // required
  driverName: "",    // required
  unitNo: "",        // required
  city: "",          // required
}

  
});
 const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
  };

    const onSubmit = (data) => {
        console.log(data,"data")
const payload={
    company_id:data.company.value,
    company_name:data.company.label,
    file_name:data.file,
    start_date:formatDate(data.startDate),
    end_date:formatDate(data.endDate),
    export_type:data.exportType.value,
    supplier_ids:data.supplier.join(""),
    page_break:"1",
    show_taxes:"",
    exclude_tax:"",
    show_discount_details:"",
    no_time:"",
    exclude_tax:"",
    filter_by_country:data.country.label,
    group_by:data.groupBy.value,
    order_by:data.orderBy.vlaue||" ",
    volume_unit:data.volUnit.value,
    fuel_type:data.fuelType.value,
    currency:data.currency.value,
    fuel_card:data.card,
    driver_name:data.driverName,
    unit_number:data.unitNo,
    city:data.city,
    state:data.state.value,
    amount:0,
    retail_amount:0,
    saving:0,
    fees:0
}
        console.log("Form Data:", payload);  // ✅ This will print your inputs
        if (isValid) {
            setShowMessage(false);
          

        }
           axios
      .post(api_name, payload, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        toast.success(res.data.message);
        reset();
        setLoading(false)
      })
      .catch((err) => {
        toast.error("Something went wrong");
                setLoading(false)

      })
      .finally(() => setLoading(false));
    };


    
    return (
        <Fragment>
            {loading && <Loader loading={true} />}
            <Row>
                <Col>
                    <fieldset>
                        <legend>{title}</legend>
                        <Form noValidate onSubmit={handleSubmit(onSubmit)}  >
                                <fieldset>
                                    <legend>
                                        Cover transactions in date range</legend>
                                    <Row className="mt-3">
                                        <Col sm="9">
                                            <FormGroup className="m-form__group">
                                                <InputGroup >
                                                    <InputGroupText>Company</InputGroupText>
                                                    <Controller name="company"
                                                        rules={{ required:true,message: "company Name is required" }}

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
                                         <InputText
                                                                      name="file"
                                                                      label="Report File Name "
                                                                      type="text"
                                                                      register={register}
                                                                      errors={errors}
                                                                      rules={{ required: "Required" }}
                                                                  />
                                     
                                        </Col>


                                    </Row>

                                    <Row>
                                        <Col sm="4">
                                            <Row>
                                                <FormGroup className="m-form__group">
                                                    <InputGroup>

                                                        <Col sm="3">
                                                            <InputGroupText>
                                                                start Date
                                                            </InputGroupText>
                                                        </Col>
                                                        <Col sm="9">
                                                            <Controller
                                                                name="startDate"
                                                                control={control}
                                                                rules={{ required:"start Date s Required"}}
                                                                render={({ field }) => (
                                                                    <DatePicker
                                                                        className={`form-control `}
                                                                        selected={field.value}
                                                                        onChange={(date) => field.onChange(date)}
                                                                    />
                                                                )}
                                                            /></Col>




                                                    </InputGroup>

                                                    {errors.startDate && (
                                                        <span className="text-danger">{errors.startDate.message}</span>
                                                    )}
                                                </FormGroup>
                                            </Row>
                                        </Col>
                                        <Col sm="4">
                                            <Row>
                                                <FormGroup className="m-form__group">
                                                    <InputGroup>
                                                        <Col sm="3">

                                                            <InputGroupText>
                                                                End Date
                                                            </InputGroupText>
                                                        </Col>
                                                        <Col sm="9">

                                                            <Controller
                                                                name="endDate"
                                                                control={control}
                                                                rules={{ required: "End Date is Required" }}
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

                                                    {errors.endDate && (
                                                        <span className="text-danger">{errors.endDate.message}</span>
                                                    )}
                                                </FormGroup>
                                            </Row>
                                        </Col>
                                        <Col sm="4">
                                            <FormGroup className="m-form__group">
                                                <InputGroup>
                                                    <InputGroupText>
                                                        Export Type
                                                    </InputGroupText>
                                                    <Controller name="exportType"
                                                        rules={{required:"Export type is required" }}

                                                        control={control}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={exportType}
                                                                className="form-control p-0 border-0"
                                                            />
                                                        )}
                                                    />

                                                </InputGroup>
                                                {errors.exportType && (
                                                    <span className="text-danger">{errors.exportType.message}</span>
                                                )}
                                            </FormGroup>
                                        </Col>
                                    </Row>



                                </fieldset>

                           
                          
                              <Controller
  name="supplier"
  control={control}
  rules={{
    validate: value =>
      value && value.length > 0 || "Please select at least one supplier"
  }}
  render={({ field }) => {
    const { value, onChange } = field;

    const handleSupplierChange = (e) => {
      const { checked, value: val } = e.target;

      if (checked) {
        onChange([...(value || []), val]);
      } else {
        onChange((value || []).filter(v => v !== val));
      }
    };

    return (
      <>
        <fieldset className='inputField'>
          <legend>Choose Supplier Check All</legend>
          <Row>
            {supplier.map((item, index) => (
              <Col key={index} sm="3">
                <div className='checkbox checkbox-dark'>
                  <input
                    id={`supplier-checkbox-${index}`}
                    type="checkbox"
                    value={String(item.value)}
                    checked={(value || []).includes(String(item.value))}
                    onChange={handleSupplierChange}
                  />
                  <Label for={`supplier-checkbox-${index}`} className="ms-2">
                    {item.label}
                  </Label>
                </div>
              </Col>
            ))}
          </Row>
            {errors.supplier && (
          <span className="text-danger">{errors.supplier.message}</span>
        )}
        </fieldset>

      
      </>
    );
  }}
/>

           <Controller
  name="features"
  control={control}
  defaultValue={[]}
  rules={{
    validate: (value) =>
      value.length > 0 || "Please select at least one feature"
  }}
  render={({ field }) => {
    const { value, onChange } = field;

    const handleFeatureChange = (e) => {
      const { value: v, checked } = e.target;

      // 👉 Store only "value", not object
      const updatedValues = checked
        ? [...(value || []), v]
        : (value || []).filter((item) => item !== v);

      onChange(updatedValues);

      // 👉 Also maintain 1 / "" state for each checkbox
      setFeatureState((prev) => ({
        ...prev,
        [v]: checked ? "1" : ""
      }));
    };

    return (
      <>
        <fieldset>
          <legend>Display features (optional)</legend>

          <Row>
            {displayFeatureCheckBox.map((item, index) => (
              <Col key={index} sm="3">
                <div className="checkbox checkbox-dark">
                  <input
                    id={`feature-${index}`}
                    type="checkbox"
                    value={item.value}
                    checked={(value || []).includes(item.value)}
                    onChange={handleFeatureChange}
                  />
                  <Label for={`feature-${index}`} className="ms-2">
                    {item.label}
                  </Label>
                </div>
              </Col>
            ))}
          </Row>

          {/* ERROR MESSAGE */}
          {errors.features && (
            <span className="text-danger small">
              {errors.features.message}
            </span>
          )}
        </fieldset>
      </>
    );
  }}
/>



                             
                                <fieldset>
                                    <legend>
                                        Display Filters (optional) </legend>
                                    <Row className="mt-3">

                                        <Col sm="3">
                                            <FormGroup className="m-form__group">
                                                <InputGroup>
                                                    <InputGroupText>
                                                        Filter By Country <span className="text-danger fw-bold mx-1">*</span>
                                                    </InputGroupText>
                                                    <Controller name="country"
                                                        rules={{required: "country Name is required" }}

                                                        control={control}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={country}
                                                                className="form-control p-0 border-0"
                                                            />
                                                        )}
                                                    />

                                                </InputGroup>
                                                {errors.country && (
                                                    <span className="text-danger">{errors.country.message}</span>
                                                )}
                                            </FormGroup>
                                        </Col>





                                        <Col sm="3">
                                            <FormGroup className="m-form__group">
                                                <InputGroup >
                                                    <InputGroupText>Group By
                                                    </InputGroupText>
                                                    <Controller name="groupBy"
                                                        rules={{ required:"Group By is required" }}

                                                        control={control}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={groupBy}
                                                                className="form-control p-0 border-0"
                                                            />
                                                        )}
                                                    />
                                                </InputGroup>

                                                {errors.groupBy && (
                                                    <span className="text-danger">{errors.groupBy?.message}</span>
                                                )}
                                            </FormGroup>
                                        </Col>

                                        <Col sm="3">
                                            <FormGroup className="m-form__group">
                                                <InputGroup>
                                                    <InputGroupText>Order By </InputGroupText>
                                                    <Controller
                                                        name="orderBy"
                                                        rules={{ required: "Order By is required" }}

                                                        control={control}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={orderBy}
                                                                className="form-control p-0 border-0"
                                                            />
                                                        )}
                                                    />
                                                </InputGroup>

                                                {errors.orderBy && (
                                                    <span className="text-danger">{errors.orderBy?.message}</span>
                                                )}
                                            </FormGroup>
                                        </Col>
                                        <Col sm="3">
                                            <FormGroup className="m-form__group">
                                                <InputGroup>
                                                    <InputGroupText>Volume Unit </InputGroupText>
                                                    <Controller
                                                        name="volUnit"
                                                        rules={{ required: "Vol Unit is required" }}

                                                        control={control}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={VolUnit}
                                                                className="form-control p-0 border-0"
                                                            />
                                                        )}
                                                    />
                                                </InputGroup>

                                                {errors.volUnit && (

                                                    <span className="text-danger">{errors.volUnit?.message}</span>
                                                )}
                                            </FormGroup>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col sm="3">
                                            <FormGroup className="m-form__group">
                                                <InputGroup>
                                                    <InputGroupText>Fuel Type </InputGroupText>
                                                    <Controller
                                                        name="fuelType"
                                                        rules={{ required:"country is required" }}

                                                        control={control}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={fuelType}
                                                                className="form-control p-0 border-0"
                                                            />
                                                        )}
                                                    />
                                                </InputGroup>

                                                {errors.fuelType && (
                                                    <span className="text-danger">{errors.fuelType?.message}</span>
                                                )}
                                            </FormGroup>
                                        </Col>
                                        <Col sm="3">
                                            <FormGroup className="m-form__group">
                                                <InputGroup>
                                                    <InputGroupText>Currency </InputGroupText>
                                                    <Controller
                                                        name="currency"
                                                        rules={{ required: "currency is required" }}
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={Reportcurrency}
                                                                className="form-control p-0 border-0"
                                                            />
                                                        )}
                                                    />
                                                    
                                                </InputGroup>

                                                {errors.currency && (
                                                    <span className="text-danger">{errors.currency?.message}</span>
                                                )}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </fieldset>

                            
                                <fieldset>
                                    <legend>
                                        Match by (optional) </legend>
                                    <Row className="mt-3">

                                       <Col sm="4">
                                         <InputText
                                                                      name="card"
                                                                      label="Fuel Card "
                                                                      type="text"
                                                                      register={register}
                                                                      errors={errors}
                                                                      rules={{ required: "Required" }}
                                                                  />
 
</Col>




                                      <Col sm="4">
                                       <InputText
                                                                      name="driverName"
                                                                      label="Driver Name "
                                                                      type="text"
                                                                      register={register}
                                                                      errors={errors}
                                                                      rules={{ required: "Required" }}
                                                                  />
  
                                      
 
</Col>

<Col sm="4">
   <InputText
                                                                      name="unitNo"
                                                                      label="Unit Number "
                                                                      type="text"
                                                                      register={register}
                                                                      errors={errors}
                                                                      rules={{ required: "Required" }}
                                                                  />
  
</Col>

                                        <Row>
                                            
                                          <Col sm="4">
                                            <InputText
                                                                      name="city"
                                                                      label="City "
                                                                      type="text"
                                                                      register={register}
                                                                      errors={errors}
                                                                      rules={{ required: "Required" }}
                                                                  />
  
    
</Col>

                                            <Col sm="4">
                                                <FormGroup className="m-form__group">
                                                    <InputGroup>
                                                        <InputGroupText>
                                                            State
                                                        </InputGroupText>
                                                        <Controller name="state"
                                                            rules={{ required: "State Name is required" }}

                                                            control={control}
                                                            render={({ field }) => (
                                                                <Select
                                                                    {...field}
                                                                    options={states}
                                                                    className="form-control p-0 border-0"
                                                                    placeholder="select State"
                                                                />
                                                            )}
                                                        />
                                                    </InputGroup>
                                                    {errors.state && (
                                                        <span className="text-danger">{errors.state.message}</span>
                                                    )}
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                    </Row>
                                </fieldset>

                            
                            <Row>
                                <Col sm="9">
                                    {showMessage && (
                                        <marquee direction="right" className="text-danger mt-3 fw-bold">
                                            All fields marked with * are mandatory.
                                        </marquee>
                                    )}
                                </Col>

                                <Col sm="3">
                                    <div className='text-end'>
                                        <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >Create Reports</Btn>

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


export default CreateReport
