import React,{Fragment} from 'react'
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
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
const PricingCommon = ({title,btnTitle,csvFile,fromUpto,pricingDate}) => {
      const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitted, isValid },
      } = useForm();
    
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
                {pricingDate===true &&(
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
                )}
          
                {csvFile==true &&(
   <Col sm="4">
                  <Row>
                    <Col className="pe-0" sm="3">
                      {" "}
                      <InputGroupText> CSV File</InputGroupText>
                    </Col>
                    <Col className="px-0" sm="9">
                      <Input
                        style={{ border: "1px solid #ccc" }}
                        className="form-control w-100c "
                        type="file"
                      />
                    </Col>
                  </Row>
                </Col>
                )}
                {fromUpto==true && (
                    <>
 <Col sm="4">
                    <Row>
                      <FormGroup className="m-form__group">
                        <InputGroup>
                          <Col sm="4">
                            <InputGroupText>Pricing from Date</InputGroupText>
                          </Col>
                          <Col sm="8">
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
                    <Row>
                      <FormGroup className="m-form__group">
                        <InputGroup>
                          <Col sm="4">
                            <InputGroupText>Pricing Upto Date</InputGroupText>
                          </Col>
                          <Col sm="8">
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
                  </>
                )}
  
                <Col >
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

export default PricingCommon
