import React, { Fragment, useState,useEffect } from "react";
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
import {
  DiscountType,
} from "../../Forms/FormWidget/FormSelect2/OptionDatas";
import HeaderCard from "../../Common/Component/HeaderCard";
import DatePicker from "react-datepicker";
import { supplierById } from "../../../api";
import axios from "axios";
const CreateLoveBulk = ({ title, btnTtitle }) => {
 const [supplierData,setSupplierData]=useState([])
     
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
       .get(`${supplierById}/7`)
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
                <Col sm="4">
                  <Row>
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <Col sm="3">
                          <InputGroupText>Pricing Date</InputGroupText>
                        </Col>
                        <Col sm="9">
                          <Controller
                            name="pricingDate"
                            control={control}
                            rules={{ required: " Required" }}
                            render={({ field }) => (
                              <DatePicker
                                className={`form-control `}
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                              />
                            )}
                          />
                        </Col>
                      </InputGroup>

                      {errors.pricingDate && (
                        <span className="text-danger">
                          {errors.pricingDate.message}
                        </span>
                      )}
                    </FormGroup>
                  </Row>
                </Col>
                <Col sm="4">
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
                <Col sm="4">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>Discount Type</InputGroupText>
                      <Controller
                        name="discountType"
                        control={control}
                        rules={{ required: "  Required" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={DiscountType}
                            className="form-control p-0 border-0"
                            placeholder="Select Discount Type"
                          />
                        )}
                      />
                    </InputGroup>

                    {errors.discountType && (
                      <span className="text-danger">
                        {errors.discountType.message}
                      </span>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm="4">
                  <FormGroup className=" m-form__group">
                    <InputGroup>
                      <InputGroupText>Testing Email </InputGroupText>
                      <Input className="form-control" type="text" />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col sm="8">
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

export default CreateLoveBulk;
