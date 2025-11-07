import React from 'react'
import { Row, Col, FormGroup, InputGroup, InputGroupText, Container } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker'
const DatePickerInput = ({name,control,placeholder,label,errors={},required}) => {
    
  return (
    <>
     <FormGroup className="m-form__group">
                    <Row>
                      <InputGroup>

                        <Col sm="4">        <InputGroupText>{label}</InputGroupText>
                        </Col>
                        <Col sm="8">
 <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <DatePicker
                placeholderText={placeholder}
                className={`form-control `}
                selected={field.value}
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
        
        </Col>
                      
                      </InputGroup>
 
                    </Row>


                 
                  </FormGroup>  
    </>
  )
}

export default DatePickerInput
