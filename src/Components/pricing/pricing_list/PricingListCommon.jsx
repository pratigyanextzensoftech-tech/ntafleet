import React, { Fragment,useState,useEffect } from 'react'
import {
  Col,
  Row,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
 
} from "reactstrap";
import { Btn } from '../../../AbstractElements';
import { pricigSupplier } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import Select from 'react-select';
import {  useSupplier } from '../../../Hooks/Dropdowns';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../../../Layout/Loader';
const PricingListCommon = ({
    onSearch ,
  title,
  btnTitle,
  csvFile,
  fromUpto,
  pricingDate,
  company,
  company_list,
  testingEmail,
  apiName,
  listapi,
  supplier,
  discountType,
  supplier_ids,
  search,
  tax,
  table,
  taxOption,
  validation, rackus,
  tableTitle,
  rackca,invoiceType
}) => {

const { data: supplierData } = useSupplier(supplier_ids);
const[loading,setLoading]=useState(false)
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

   const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
 const userId=localStorage.getItem("userId")

 const onSubmit = (data) => {
    setLoading(true);
    const payload = {
      pricing_date: formatDate(data?.pricingDate),
      supplier_id: data?.supplier?.value || "",
    };
setLoading(false)
    if (onSearch) {
        console.log(payload);
      onSearch(payload, apiName);
    }
 }
  


  return (
    <Fragment>
            {loading && <Loader loading={true} />}
      <Row>
        <Col>
          <fieldset>
            <legend>{title}</legend>
            <Form className="px-2" noValidate onSubmit={handleSubmit(onSubmit)}>
              <Row className="mt-3">
                  <Col  xl="4"  md="6" sm="12">
                    <Row>
                      <FormGroup className="m-form__group">
                        <InputGroup>
                          <Col xs="4" md="5" lg="4">
                            <InputGroupText>Pricing Date</InputGroupText>
                          </Col>
                          <Col xs="8" md="7" lg="8">
                            <Controller
                              name="pricingDate"
                              control={control}
                              render={({ field }) => (
                                <DatePicker
                                  className="form-control"
                                  selected={field.value}
                                  onChange={(date) => field.onChange(date)}
                                   dateFormat="yyyy-MM-dd"
                                    portalId="root"
                                    popperPlacement="bottom-start"
                                />
                              )}
                            />
                          </Col>
                        </InputGroup>

                    
                      </FormGroup>
                    </Row>
                  </Col>
                  <Col  xl="4"  md="6" sm="12">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>Supplier</InputGroupText>

                        <Controller
                          name="supplier"
                          control={control}
                        
                          render={({ field }) => {

                            // Auto select supplier when only 1 option
                            if (supplierData?.length === 1 && !field.value) {
                              field.onChange(supplierData[0]);
                            }
                            return (
                              <Select
                                {...field}
                                className="form-control p-0 border-0"
                                options={
                                  supplier_ids ? supplierData : pricigSupplier
                                }
                                placeholder="Select supplier"
                                value={field.value}
                                  menuPortalTarget={document.body}
                                  menuPosition="fixed"
                                onChange={field.onChange}
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
                <Col className="text-end">
                  <Btn
                    attrBtn={{
                      color: "primary",
                      type: "submit",
                    }}
                  >
                    {btnTitle}
                  </Btn>
                </Col>

              </Row>
            </Form>
          </fieldset>
        </Col>
      </Row>
    </Fragment>
  );
};

export default PricingListCommon;
