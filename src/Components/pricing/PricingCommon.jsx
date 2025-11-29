import React, { Fragment } from 'react'
import {
  Col,
  Row,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";
import { Btn } from '../../AbstractElements';
import { pricigSupplier } from '../Forms/FormWidget/FormSelect2/OptionDatas';
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import Select from 'react-select';
import { useCompany, useSupplier } from '../../Hooks/Dropdowns';
import { DiscountType } from '../Forms/FormWidget/FormSelect2/OptionDatas';
import InputText from '../Forms/FormControl/formInput/InputText';
const PricingCommon = ({
  title,
  btnTitle,
  csvFile,
  fromUpto,
  pricingDate,
  company,
  testingEmail,
  apiName,
  supplier,
  discountType,
  supplier_ids,
  validation, rackus,
  rackca
}) => {

  const { data: companies } = useCompany();
  const { data: supplierData } = useSupplier(supplier_ids);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    reset()
  };

  return (
    <Fragment>
      <Row>
        <Col>
          <fieldset>
            <legend>{title}</legend>

            <Form className="px-2" noValidate onSubmit={handleSubmit(onSubmit)}>
              <Row className="mt-3">

                {/* PRICING DATE */}
                {pricingDate === true && (
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
                              rules={
                                validation
                                  ? { required: "Required" }
                                  : {}
                              }
                              render={({ field }) => (
                                <DatePicker
                                  className="form-control"
                                  selected={field.value}
                                  onChange={(date) => field.onChange(date)}
                                />
                              )}
                            />
                          </Col>
                        </InputGroup>

                        {validation && errors.pricingDate && (
                          <span className="text-danger">
                            {errors.pricingDate.message}
                          </span>
                        )}
                      </FormGroup>
                    </Row>
                  </Col>
                )}
{rackus==true &&(
      <Col sm="4">
      <InputText
            name="rackus"
            label="Rack US"
            type="text"
            register={register}
            errors={errors}
            rules={ validation
                              ?{ required: "Required" }:{}}
            
          />
          </Col>
)}
{rackca==true &&(
      <Col sm="4">
      <InputText
            name="rackca"
            label="Rack CA"
            type="text"
            register={register}
            errors={errors}
            rules={ validation
                              ?{ required: "Required" }:{}}
            
          />
          </Col>
)}
                {/* SUPPLIER */}
                {supplier === true && (
                  <Col sm="4">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>Supplier</InputGroupText>

                        <Controller
                          name="supplier"
                          control={control}
                          rules={
                            validation
                              ? { required: "Supplier is required" }
                              : {}
                          }
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
                                onChange={field.onChange}
                              />
                            );
                          }}
                        />
                      </InputGroup>

                      {validation && errors.supplier && (
                        <span className="text-danger">
                          {errors.supplier.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                )}

                {/* DISCOUNT TYPE */}
                {discountType === true && (
                  <Col sm="4">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>Discount Type</InputGroupText>

                        <Controller
                          name="DiscountType"
                          control={control}
                          rules={
                            validation
                              ? { required: "Required" }
                              : {}
                          }
                          render={({ field }) => (
                            <Select
                              {...field}
                              className="form-control p-0 border-0"
                              options={DiscountType}
                              placeholder="Select Discount Type"
                              onChange={field.onChange}
                              value={field.value}
                            />
                          )}
                        />
                      </InputGroup>

                      {validation && errors.DiscountType && (
                        <span className="text-danger">
                          {errors.DiscountType.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                )}

                {testingEmail === true && (
                  <Col sm="4">
                  
                    <InputText
            name="testingEmail"
            label="Testing Email"
            type="text"
            register={register}
            errors={errors}
            rules={ validation
                              ?{ required: "Required" }:{}}
            
          />
                            </Col>

                )}

                {/* CSV FILE */}
                {csvFile === true && (
                  <Col sm="4">
                    <Row>
                      <Col sm="3" className="pe-0">
                        <InputGroupText>CSV File</InputGroupText>
                      </Col>

                      <Col sm="9" className="px-0">
                        <Input
                          style={{ border: "1px solid #ccc" }}
                          className="form-control"
                          type="file"
                          {...register("csvFile")}
                        />
                      </Col>
                    </Row>
                  </Col>
                )}

                {/* COMPANY */}
                {company === true && (
                  <Col sm="4">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>Company</InputGroupText>

                        <Controller
                          name="company"
                          control={control}
                          rules={
                            validation
                              ? { required: "Company is required" }
                              : {}
                          }
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={companies}
                              className="form-control p-0 border-0"
                              placeholder="Select company"
                            />
                          )}
                        />
                      </InputGroup>

                      {validation && errors.company && (
                        <span className="text-danger">
                          {errors.company.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                )}

                {/* PRICING FROM / UPTO */}
                {fromUpto === true && (
                  <>
                    {/* FROM DATE */}
                    <Col sm="4">
                      <Row>
                        <FormGroup className="m-form__group">
                          <InputGroup>
                            <Col sm="4">
                              <InputGroupText>Pricing From</InputGroupText>
                            </Col>

                            <Col sm="8">
                              <Controller
                                name="pricingFrom"
                                control={control}
                                rules={
                                  validation
                                    ? { required: "Required" }
                                    : {}
                                }
                                render={({ field }) => (
                                  <DatePicker
                                    className="form-control"
                                    selected={field.value}
                                    onChange={field.onChange}
                                  />
                                )}
                              />
                            </Col>
                          </InputGroup>

                          {validation && errors.pricingFrom && (
                            <span className="text-danger">
                              {errors.pricingFrom.message}
                            </span>
                          )}
                        </FormGroup>
                      </Row>
                    </Col>

                    {/* UPTO DATE */}
                    <Col sm="4">
                      <Row>
                        <FormGroup className="m-form__group">
                          <InputGroup>
                            <Col sm="4">
                              <InputGroupText>Pricing Upto</InputGroupText>
                            </Col>

                            <Col sm="8">
                              <Controller
                                name="pricingUpto"
                                control={control}
                                rules={
                                  validation
                                    ? { required: "Required" }
                                    : {}
                                }
                                render={({ field }) => (
                                  <DatePicker
                                    className="form-control"
                                    selected={field.value}
                                    onChange={field.onChange}
                                  />
                                )}
                              />
                            </Col>
                          </InputGroup>

                          {validation && errors.pricingUpto && (
                            <span className="text-danger">
                              {errors.pricingUpto.message}
                            </span>
                          )}
                        </FormGroup>
                      </Row>
                    </Col>
                  </>
                )}

                {/* SUBMIT BUTTON */}
                <Col className="text-end">
                  <Btn
                    attrBtn={{
                      color: "primary",
                      className: "m-r-15",
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

export default PricingCommon;
