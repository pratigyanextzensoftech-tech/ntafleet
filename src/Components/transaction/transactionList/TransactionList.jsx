import React, { useState,useEffect } from "react";
import Select from "react-select";
import {
  optionscompany,
  Upload_Supplier,
  InvoiceStatus,
  currency,
} from "../../Forms/FormWidget/FormSelect2/OptionDatas";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useItems,formatDate } from "../../../Hooks/Dropdowns";
import useCompany from "../../../Hooks/useCompany";
import InputText from "../../Forms/FormControl/formInput/InputText";
const TransactionList = ({ btnTitle, btnTitle1,onSearch }) => {
  const[supplierData,setSupplierData]=useState()
  const {companies}=useCompany()
  const{data:items}=useItems() 

  const {
    register,

    control,
    reset,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm();
// useEffect(() => {

//   axios
//     .get(`${supplierById}/6`)
//     .then((res) => {
//       const formatted = res.data.map((s) => ({
//         value: s.id,
//         label: s.supplier_name,
//       }));

//       setSupplierData(formatted);

//      else {
//         setValue("supplier", null); // no default for no-type
//       }
//     })
// }, [type, setValue]);

  
  const onSubmit = (data) => {
      const fullData = {
        // ...data,
        from: data.from ? formatDate(data.from): "",
        to: data.to ? formatDate(data.to) : "",
        state_prov:data.stateProv?data.stateProv:"",
        unit:data.unitNo?data?.unitNo:"",
        card_no:data?.cardNo?data.cardNo:"",
        company_id: data.company?.value || "",
        currency: data.currency?.value || "",
        item: data.items?.value ,
        invoiced: data.status?.value || "",
        supplier_id:data.supplier.value || ""
      };
      console.log("✅ Full Form Data:", data);
      if (onSearch) onSearch(fullData); // ✅ trigger parent to refresh table
    };

  return (
    <Form noValidate="" onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col xxl="3" xl="4"  md="6" sm="12">
          <Row>
            <FormGroup className="m-form__group">
              <InputGroup>
                <Col xs="3">
                  <InputGroupText>From</InputGroupText>
                </Col>
                <Col xs="9">
                  <Controller
                    name="from"
                    control={control}
                  
                    render={({ field }) => (
                      <DatePicker
                        className={`form-control `}
                        id="from"
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                       dateFormat="yyyy-MM-dd"

                      />
                    )}
                  />
                </Col>
              </InputGroup>

              {errors.from && (
                <span className="text-danger">{errors.from.message}</span>
              )}
            </FormGroup>
          </Row>
        </Col>
        <Col xxl="3"  xl="4" md="6" sm="12">
          <Row>
            <FormGroup className="m-form__group">
              <InputGroup>
                <Col xs="3">
                  <InputGroupText>To</InputGroupText>
                </Col>
                <Col xs="9">
                  <Controller
                    name="to"
                    control={control}
                  
                    render={({ field }) => (
                      <DatePicker
                        className={`form-control digits`}
                        selected={field.value}
                         id="to"
                        onChange={(date) => field.onChange(date)}
                        dateFormat="yyyy-MM-dd"

                      />
                    )}
                  />
                </Col>
              </InputGroup>

              {errors.to && (
                <span className="text-danger">{errors.to.message}</span>
              )}
            </FormGroup>
          </Row>
        </Col>
        <Col xxl="3" xl="4"   md="6" sm="12">
         <InputText
                            name="stateProv"
                            label="State Prov"
                            id="state_prov"
                            type="text"
                            register={register}
                        />
     
        </Col>
        <Col xxl="3" xl="4"   md="6" sm="12">
          <InputText
                            name="unitNo"
                            label="Unit"
                            id="unit"
                            type="text"
                            register={register}
                        />
        </Col>
    
        <Col xxl="3"  xl="4" md="6" sm="12">
          <InputText
                            name="cardNo"
                            label="Card No."
                            id="card_no"
                            type="text"
                            register={register}
                        />
        </Col>
        <Col xxl="3" xl="4"  md="6" sm="12">
          <FormGroup className="m-form__group">
            <InputGroup>
              <InputGroupText>Company</InputGroupText>
              <Controller
                name="company"
               
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={companies}
                    className="form-control p-0 border-0"
                    id="company"
                    placeholder="Select Company "
                  />
                )}
              />
            </InputGroup>
          </FormGroup>
        </Col>
        <Col xxl="3" xl="4"  md="6" sm="12">
          <FormGroup className="m-form__group">
            <InputGroup>
              <InputGroupText>Currency</InputGroupText>
              <Controller
                name="currency" 
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={currency}
                    id="currency"
                    className="form-control p-0 border-0"
                    placeholder="Select Currency"
                  />
                )}
              />
            </InputGroup>  
          </FormGroup>
        </Col>
        <Col xxl="3" xl="4"  md="6" sm="12">
          <FormGroup className="m-form__group">
            <InputGroup>
              <InputGroupText>Items</InputGroupText>
              <Controller
                name="items" 
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={items}
                    id="items"
                    className="form-control p-0 border-0"
                    placeholder="Select Items"
                  />
                )}
              />
            </InputGroup> 
          </FormGroup>
        </Col>
     
        <Col xxl="3" xl="4"  md="6" sm="12">
          <FormGroup className="m-form__group">
            <InputGroup>
              <InputGroupText>Invoice Status</InputGroupText>
              <Controller
                name="status"
               
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={InvoiceStatus}
                    id="status"
                    className="form-control p-0 border-0"
                    placeholder="Select status"
                  />
                )}
              />
            </InputGroup> 
          </FormGroup>
        </Col>
        <Col xxl="3" xl="4"  md="6" sm="12">
          <FormGroup className="m-form__group">
            <InputGroup>
              <InputGroupText>Supplier</InputGroupText>
              <Controller
                name="supplier"
                control={control}
                rules={{ required: "Supplier is required" }}
                defaultValue={Upload_Supplier[2]}
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
              <span className="text-danger">{errors.supplier?.message}</span>
            )}
          </FormGroup>
        </Col>
        <Col xxl="3" xl="4"   md="12" sm="12" className="ms-auto">
          <div className="text-end">
            <Btn
              attrBtn={{
                color: "primary",
                className: "m-r-15",
                type: "submit",
              }}
            >
              {btnTitle}
            </Btn>
            <button className="btn btn-secondary">{btnTitle1}</button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default TransactionList;
