import React, { useState } from "react";
import Select from "react-select";
import {
  chooseSupplierCheckBox,
  InvoiceStatus,
  invoiceType,
  currency,
  cardStatus
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
import DropDown from "../../Forms/FormControl/formInput/DropDown";
import {
  useItems,
  formatDate,
  useSupplierAll,
} from "../../../Hooks/Dropdowns";
import useCompany from "../../../Hooks/useCompany";
const ViewForm = ({ btnTitle, btnTitle1, onSearch }) => {
  const [selectedValues, setSelectedValues] = useState([]);

  const { companies } = useCompany();
  const { data: items } = useItems();
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
      supplier: [],
    },
  });

  const onSubmit = (data) => {
    const fullData = {
      supplier_id: data.supplier.value ||"",
      card_no: data.card_no || "",
      policy: data.policy || "",
      unit_number: data.unit || "",
    pin_number: data.pin || "",
      driver_name: data.driver_name || "",
      company_id: data.company?.value || "",
      status: data.status?.value || "",
    };
    if (onSearch) onSearch(fullData);
  };

  const handleReset = () => {
    reset();
    setSelectedValues([]);
    onSearch?.({});
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
                      <Row>
               <Col  xxl="3" xl="4"  md="6" sm="12">
                                           <FormGroup className="m-form__group">
                                             <InputGroup>
                                               <InputGroupText>Supplier</InputGroupText>
                         
                                               <Controller
                                                 name="supplier"
                                                 control={control}
                                                 defaultValue={null}
                                                 render={({ field }) => {
                                                   // Auto select if only one option exists                                                  
                                                   return (
                                                     <Select
                                                       {...field}
                                                       options={supplier}
                                                       id="supplier"
                                                       className="form-control p-0 border-0"
                                                       placeholder="Select supplier"
                                                       value={field.value}
                                                       onChange={(val) => field.onChange(val)}
                                                         menuPortalTarget={document.body}
                                                   menuPosition="fixed"
                                                          styles={{
                                         menuPortal: base => ({
                                           ...base,
                                           zIndex: 99999
                                         })
                                       }}
                                                     />
                                                   );
                                                 }}
                                               />
                                             </InputGroup>
                        
                                           </FormGroup>
                                         </Col>

      {/* Row 1 */}
         <Col xxl="3"  xl="4" md="6" sm="12">
          <FormGroup>
            <InputGroup>
              <InputGroupText>Card No</InputGroupText>
              <Controller
                name="card_no"
                id="card_no"
                control={control}
                render={({ field }) => <Input {...field} type="text" />}
              />
            </InputGroup>
          </FormGroup>
        </Col>

        <Col xxl="3"  xl="4" md="6" sm="12">
          <FormGroup>
            <InputGroup>
              <InputGroupText>policy</InputGroupText>
              <Controller
                name="policy"
                id="policy"
                control={control}
                render={({ field }) => <Input {...field} type="text" />}
              />
            </InputGroup>
          </FormGroup>
        </Col>

        <Col xxl="3"  xl="4" md="6" sm="12">
          <FormGroup>
            <InputGroup>
              <InputGroupText>Unit</InputGroupText>
              <Controller
                name="unit"
                id="unit"
                control={control}
                render={({ field }) => <Input {...field} type="text" />}
              />
            </InputGroup>
          </FormGroup>
        </Col>

      {/* Row 2 */}
         <Col xxl="3"  xl="4" md="6" sm="12">
          <FormGroup>
            <InputGroup>
              <InputGroupText>Pin</InputGroupText>
              <Controller
                name="pin"
                id="pin"
                control={control}
                render={({ field }) => <Input {...field} type="text" />}
              />
            </InputGroup>
          </FormGroup>
        </Col>
            <Col xxl="3"  xl="4" md="6" sm="12">
          <FormGroup>
            <InputGroup>
              <InputGroupText>Driver Name</InputGroupText>
              <Controller
                name="driver_name"
                id="driver_name"
                control={control}
                render={({ field }) => <Input {...field} type="text" />}
              />
            </InputGroup>
          </FormGroup>
        </Col>

        <Col xxl="3"  xl="4" md="6" sm="12">
          <DropDown
            name="company"
            id="company"
            label="Company"
            control={control}
            options={companies}
            menuPortalTarget={document.body}
            menuPosition="fixed"
                      styles={{
                        menuPortal: (base) => ({
                          ...base,
                          zIndex: 99999,
                        }),
                      }}

          />
        </Col>

    

        

      {/* Row 3 */}
        <Col xxl="3"  xl="4" md="6" sm="12">
          <DropDown
            name="status"
            id="status"
            label="Card Status"
            control={control}
            options={cardStatus}
            menuPortalTarget={document.body}
                      menuPosition="fixed"
                      styles={{
                        menuPortal: (base) => ({
                          ...base,
                          zIndex: 99999,
                        }),
                      }}
          />
        </Col>

       

        <Col xxl="3" md="12" sm="12" className="text-end ms-auto">
          <Btn attrBtn={{ color: "primary", type: "submit" }}>{btnTitle}</Btn>
          <button
            type="button"
            className="btn btn-secondary ms-2"
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
