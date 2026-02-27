import React from "react";
import {
  Row,
  Col,
  FormGroup,
  InputGroup,
  InputGroupText,
  Container,
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
const DatePickerInput = ({
  name,
  id,
  control,
  placeholder,
    portalId,
  popperPlacement,
  label,
  errors = {},
  required,
}) => {
  return (
    <>
     <FormGroup className="m-form__group">
                    <Row>
                      <InputGroup>

                        <Col xs="5">        <InputGroupText>{label}</InputGroupText>
                        </Col>
                        <Col xs="7">
 <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <DatePicker
                placeholderText={placeholder}
                id={id}
                className={`form-control`}
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                  dateFormat="yyyy-MM-dd" 
                  portalId={portalId}
                  popperPlacement={popperPlacement}
              />
            )}
          />
        
        </Col>
                      
                      </InputGroup>
 
                    </Row>


                 
                  </FormGroup>  
    </>
  );
};

export default DatePickerInput;
