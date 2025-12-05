import React, { Fragment, useState } from 'react';
import Select from 'react-select'
import { groupBy, optionscountry, displayFeatureCheckBox, chooseSupplierCheckBox, optionscompany, invoiceType, orderBy, fuelType, currency,Reportcurrency, InvoiceCategory, InvoiceShow, exportType, VolUnit } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import { useCompany,useCountry,useStates,useSupplier } from '../../../Hooks/Dropdowns';

const CreateReport = ({ title }) => {
    const [selectedValues, setSelectedValues] = useState([]);
    const [showMessage, setShowMessage] = useState(true);
    const{data:company}=useCompany();
    const{data:country}=useCountry()
    const{data:states}=useStates()
    const{data:supplier}=useSupplier()

    const {
        register,

        control,
        reset,
        handleSubmit,
        formState: { errors, isSubmitted, isValid },
    } = useForm({
  defaultValues: {
    volUnit: VolUnit.find(x => x.value === "Gallon"),
    currency:Reportcurrency.find(x => x.label === "USD"),
    fuelType:fuelType[0],
    orderBy:orderBy[0],
    groupBy:groupBy[0],
  }
});

    const onSubmit = (data) => {
        console.log(data)
const payload={
    company_id:data.company.value,
    filename:data.file,
    start_date:data.startDate,
    end_date:data.endDate,
    export_type:data.exportType.value,
    supplier_id:data.selectedValues,
    end_date:data.selectedValues,
    country_id:data.country.value,
    group_by:data.groupBy.value,
    order_by:data.orderBy.vlaue,
    volume_unit:data.volUnit.value,
    fuel_type:data.fuelType.value,
    currency:data.currency.value,
    fuel_card:data.card,
    driver_name:data.driverName,
    unitno:data.unitNo,
    city:data.city,
    state:data.state.value,
}
        console.log("Form Data:", data);  // ✅ This will print your inputs
        // alert("Form submitted successfully!");
        if (isValid) {
            setShowMessage(false); // hide only when form is completely valid
        }
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
                            
                                <fieldset>
                                    <legend>
                                        Cover transactions in date range</legend>
                                    <Row className="mt-3">
                                        <Col sm="9">
                                            <FormGroup className="m-form__group">
                                                <InputGroup >
                                                    <InputGroupText>Company</InputGroupText>
                                                    <Controller name="company"
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
                                            <FormGroup className=" m-form__group">
                                                <InputGroup>
                                                    <InputGroupText>Report File Name</InputGroupText>
                                                    <Input className="form-control" name="file" type="text" {...register("file", { required: "File name is required" })}/>
                                                </InputGroup>
                                                 {errors.file && (
                                                        <span className="text-danger">{errors.file.message}</span>
                                                    )}
                                            </FormGroup>

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
                                                                rules={{ required: " Required" }}
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
                                                                rules={{ required: "Required" }}
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
                                                        <span className="text-danger">{errors.end.message}</span>
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
                                                        rules={{ required: "company Name is required" }}

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

                           
                          
                                <fieldset className='inputField ' >
                                    <legend>
                                        Choose Supplier Check All </legend>
                                    <Row>
                                        {supplier.map((item, index) => (
                                            <Col sm="3">
                                                <div className='checkbox checkbox-dark'>
                                                    <input
                                                        id={`checkbox-${index}`}
                                                        type="checkbox"
                                                        value={String(item.value)}
                                                        checked={selectedValues.includes(String(item.value))}
                                                        onChange={handleCheckboxChange} />
                                                    <Label for={`checkbox-${index}`} className="ms-2">
                                                        {item.label}
                                                    </Label>
                                                </div></Col>
                                        ))}
                                    </Row>

                                </fieldset>
                           
                           
                                <fieldset>
                                    <legend>
                                        Display features (optional) </legend>
                                    <Row>
                                        {displayFeatureCheckBox.map((item, index) => (
                                            <Col sm="3">
                                                <div className='checkbox checkbox-dark'>
                                                    <input
                                                        id={`checkbox-${index}`}
                                                        type="checkbox"
                                                        value={item.value}
                                                        checked={selectedValues.includes(item.value)}
                                                        onChange={handleCheckboxChange} />
                                                    <Label for={`checkbox-${index}`} className="ms-2">
                                                        {item.label}
                                                    </Label>
                                                </div></Col>
                                        ))}
                                    </Row>

                                </fieldset>
                             
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
                                                        rules={{ required: "country Name is required" }}

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
                                                        rules={{ required: "Group By is required" }}

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
                                                        rules={{ required: "country is required" }}

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
                                                        rules={{ required:"currency is required" }}
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
                                            <FormGroup className=" m-form__group">
                                                <InputGroup>
                                                    <InputGroupText>Fuel Card</InputGroupText>
                                                    <Input name="card" className="form-control" type="text" {...register("card", { required: "Card No is required" })}/>
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>



                                        <Col sm="4">
                                            <FormGroup className=" m-form__group">
                                                <InputGroup>
                                                    <InputGroupText>Driver Name</InputGroupText>
                                                    <Input name="driverName" className="form-control" type="text"  {...register("driverName", { required: "Driver Name is required" })}/>
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>

                                        <Col sm="4">
                                            <FormGroup className=" m-form__group">
                                                <InputGroup>
                                                    <InputGroupText>Unit Number</InputGroupText>
                                                    <Input name="unitNo" className="form-control" type="text" {...register("unitNo", { required: "Uit No is required" })}/>
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                        <Row>
                                            <Col sm="4">
                                                <FormGroup className=" m-form__group">
                                                    <InputGroup>
                                                        <InputGroupText>City</InputGroupText>
                                                        <Input name="city" className="form-control" type="text"  {...register("city", { required: "Uit No is required" })}/>
                                                    </InputGroup>
                                                </FormGroup>
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
