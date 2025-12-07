import React, { useState } from "react";
import Select from "react-select";
import {
  chooseSupplierCheckBox,
  InvoiceStatus,
  invoiceType,
  currency,
} from "../../Forms/FormWidget/FormSelect2/OptionDatas";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import ItemsDropDown from "../../Forms/FormControl/formInput/ItemsDropDown";
import DropDown from "../../Forms/FormControl/formInput/DropDown";
import {  useCompany, useSalesman, useSupplierAll,useEssoRack,useItems} from "../../../Hooks/Dropdowns";
const ViewForm = ({ btnTitle, btnTitle1, onSearch }) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const { data: companyOptions, loading: companyLoading } = useCompany();
  const { data: items, loading: itemsLoading } = useItems();
    const { data: supplier } = useSupplierAll();
  
   

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      from: null,
      to: null,
      state_prov: "",
      unit: "",
      card_no: "",
      company: "",
      currency: null,
      items: null,
      status: null,
      invoice_type: null,
    },
  });

  const onSubmit = (data) => {
    const fullData = {
      // ...data,
      supplier_id: [...selectedValues],
      from: data.from ? data.from.toISOString().split("T")[0] : "",
      to: data.to ? data.to.toISOString().split("T")[0] : "",
      state_prov:data.state_prov,
      unit:data.unit,
      card_no:data.card_no,
      company_id: data.company?.value || "",
      currency: data.currency?.value || "",
      item: data.items?.value ,
      invoiced: data.status?.value || "",
      invoice_type: data.invoice_type?.value || "",
    };

    console.log("✅ Full Form Data:", data);
    if (onSearch) onSearch(fullData); // ✅ trigger parent to refresh table
  };

  const handleReset = () => {
    reset();
    setSelectedValues([]);
    if (onSearch) onSearch({}); // ✅ reload all data
  };

 

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* ✅ Supplier Checkboxes */}
 <Controller
   name="supplier"
   control={control}
   rules={{
     validate: (value) =>
       (value && value.length > 0) ||
       "Please select at least one supplier",
   }}
   render={({ field }) => {
     const { value, onChange } = field;
 
     const selectedValues = (value || []).map(String);
 
     const handleSupplierChange = (e) => {
       const { checked, value: val } = e.target;
 
       // 👉 Handle ALL checkbox
       if (val === "All") {
         if (checked) {
           const allSupplierValues = supplier.map((s) =>
             String(s.value)
           );
           onChange(allSupplierValues);
         } else {
           onChange([]);
         }
         return;
       }
 
       // 👉 Individual supplier logic
       let updated;
       if (checked) {
         updated = [...selectedValues, val];
       } else {
         updated = selectedValues.filter((v) => v !== val);
       }
 
       onChange(updated);
     };
 
     const allSelected =
       selectedValues.length === supplier.length;
 
     return (
       <>
         <fieldset className="inputField">
           <legend>
             Choose Supplier
             {/* 🔥 ALL checkbox inside legend (right side) */}
             <span className="ms-3">
               <input
                 id="supplier-all"
                 type="checkbox"
                 value="All"
                 checked={allSelected}
                 onChange={handleSupplierChange}
               />
               <Label
                 for="supplier-all"
                 className="ms-1"
               
               >
                  checkbox All
               </Label>
             </span>
           </legend>
 
           <Row>
             {supplier.map((item, index) => (
               <Col key={index} sm="3">
                 <div className="checkbox checkbox-dark">
                   <input
                     id={`supplier-checkbox-${index}`}
                     type="checkbox"
                     value={String(item.value)}
                     checked={selectedValues.includes(
                       String(item.value)
                     )}
                     onChange={handleSupplierChange}
                   />
                   <Label
                     for={`supplier-checkbox-${index}`}
                     className="ms-2"
                   >
                     {item.label}
                   </Label>
                 </div>
               </Col>
             ))}
           </Row>
 
           {errors.supplier && (
             <span className="text-danger">
               {errors.supplier.message}
             </span>
           )}
         </fieldset>
       </>
     );
   }}
 />

      {/* ✅ Row 1: Dates + StartProv + Unit */}
      <Row>
        
        <Col sm="3">
          <Row>
            <FormGroup>
              <InputGroup>
                <Col sm="3">
                  <InputGroupText>From</InputGroupText>
                </Col>
                <Col sm="9">
                  <Controller
                    name="from"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        className="form-control"
                        selected={field.value}
                        onChange={field.onChange}
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
          <Row>
            <FormGroup className="m-form__group">
              <InputGroup>
                <Col sm="3">
                  <InputGroupText>To</InputGroupText>
                </Col>
                <Col sm="9">
                  <Controller
                    name="to"
                    control={control}
                    rules={{ required: "Required" }}
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

              {errors.to && (
                <span className="text-danger">{errors.to.message}</span>
              )}
            </FormGroup>
          </Row>
        </Col>

        <Col sm="3">
          <FormGroup>
            <InputGroup>
              <InputGroupText>State Prov</InputGroupText>
              <Controller
                name="state_prov"
                control={control}
                render={({ field }) => (
                  <Input {...field} type="text" className="form-control" />
                )}
              />
            </InputGroup>
          </FormGroup>
        </Col>

        <Col sm="3">
          <FormGroup>
            <InputGroup>
              <InputGroupText>Unit</InputGroupText>
              <Controller
                name="unit"
                control={control}
                render={({ field }) => (
                  <Input {...field} type="text" className="form-control" />
                )}
              />
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>

      {/* ✅ Row 2: Card No, Company, Currency, Items */}
      <Row>
        <Col sm="3">
          <FormGroup>
            <InputGroup>
              <InputGroupText>Card No.</InputGroupText>
              <Controller
                name="card_no"
                control={control}
                render={({ field }) => (
                  <Input {...field} type="text" className="form-control" />
                )}
              />
            </InputGroup>
          </FormGroup>
        </Col>

        <Col sm="3">
          <DropDown
            name="company"
            label="Company"
            control={control}
            placeholder="Select Company"
            defaultValueId={0}
            // loading={companyLoading}
            options={companyOptions}
          />
        </Col>
 

        <Col sm="3">
          <FormGroup>
            <InputGroup>
              <InputGroupText>Currency</InputGroupText>
              <Controller
                name="currency"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={currency}
                    placeholder="Select Currency"
                    className="form-control p-0 border-0"
                    onChange={(val) => field.onChange(val)}
                  />
                )}
              />
            </InputGroup>
          </FormGroup>
        </Col>

        <Col sm="3">
          {/* <ItemsDropDown name="items" control={control} /> */}
          <DropDown
            name="items"
            label="Items"
            control={control}
            placeholder="Select Items"
            // loading={loading}
            options={items}
          />
        </Col>
      </Row>

      {/* ✅ Row 3: Status, Type, and Buttons */}
      <Row>
        <Col sm="3">
          <DropDown
            name="status"
            label="Invoice Status"
            control={control}
            placeholder="Select Status"
            // loading={loading}
            options={InvoiceStatus}
          />
          {/* <FormGroup>
            <InputGroup>
              <InputGroupText>Invoice Status</InputGroupText>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={InvoiceStatus}
                    placeholder="Select Status"
                    className="form-control p-0 border-0"
                    onChange={(val) => field.onChange(val)}
                  />
                )}
              />
            </InputGroup>
          </FormGroup> */}
        </Col>

        <Col sm="3">
          <DropDown
            name="invoice_type"
            label="Invoice Type"
            control={control}
            placeholder="Select Type"
            // loading={loading}
            options={invoiceType}
          />
        </Col>

        <Col sm="6" className="text-end">
          <Btn
            attrBtn={{ color: "primary", type: "submit", className: "m-r-15" }}
          >
            {btnTitle}
          </Btn>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
          >
            {btnTitle1}
          </button>
        </Col>
      </Row>
    </Form>
  );
};

export default ViewForm;
