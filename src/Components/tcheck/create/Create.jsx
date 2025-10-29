import React, { Fragment } from 'react'
import { Col, Row, Form } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm } from 'react-hook-form';
import DatePickerInput from '../../Forms/FormControl/formInput/DatePickerInput';
import HeaderCard from '../../Common/Component/HeaderCard';
const Create = ({ title, btnTitle }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm();


  const onSubmit = (data) => {
    console.log("Form Data:", data);  // ✅ This will print your inputs
    // alert("Form submitted successfully!");
  };
  return (
    <Fragment>

      <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >
        <Row className="mt-3">
          <Col sm="4">
            <DatePickerInput
              name="startDate"
              control={control}              // ✅ make sure this is passed
              label="Start Date"
              placeholder="Select start date" // ✅ fixed spelling
              errors={errors}
              required="start Date is required"
            />
          </Col>

          <Col sm="4">
            <DatePickerInput
              name="endDate"
              control={control}              // ✅ make sure this is passed
              label="End Date"
              placeholder="Select end date" // ✅ fixed spelling
              errors={errors}
              required="End Date is required"
            />
          </Col>
          <Col sm={{ size: 2, offset: 2 }}>
            <div className='text-end'>
              <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTitle}</Btn>
            </div>
          </Col>
        </Row>
      </Form>

    </Fragment>
  )
}

export default Create
