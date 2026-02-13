import React, { Fragment,useEffect } from "react";
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
import DatePicker from "react-datepicker";
import { useSupplier } from "../../../Hooks/Dropdowns";
import { formatDate } from "../../../Hooks/Dropdowns";
const TaPetro = ({ title, btnTitle }) => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm();
    const {data:supplier}=useSupplier("3,")
  
useEffect(() => {
      setValue("supplier", supplier[0]); 
    },
   [supplier, setValue]);
 const onSubmit = (data) => {
     const pricing_Date=data.pricingDate?formatDate(data.pricingDate):"";
     const supplier=data.supplier?data.supplier.value:"";
  console.log(pricing_Date,supplier)
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
                <Col  xl="4"  md="6" sm="12">
                  <Row>
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <Col xs="4">
                          <InputGroupText>Pricing Date</InputGroupText>
                        </Col>
                        <Col xs="8">
                          <Controller
                            name="pricingDate"
                            control={control}
                            render={({ field }) => (
                              <DatePicker
                                className={`form-control `}
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
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
                        rules={{ required: "Supplier is required" }}
                        defaultValue={supplier[5]}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="form-control p-0 border-0"
                            placeholder="Select supplier"
                            options={supplier}
                            onChange={(selectedOption) =>
                              field.onChange(selectedOption)
                            }
                            value={field.value}
                                menuPortalTarget={document.body}
                          menuPosition="fixed"
                                 styles={{
                menuPortal: base => ({
                  ...base,
                  zIndex: 99999
                })
              }}
                          />
                        )}
                      />
                    </InputGroup>

                   
                  </FormGroup>
                </Col>

                <Col className="ms-auto"  xl="4"  md="12" sm="12">
                  <div className="text-end">
                    <Btn
                      attrBtn={{
                        color: "primary",
                        type: "submit",
                      }}
                    >
                      {btnTitle}
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

export default TaPetro;
