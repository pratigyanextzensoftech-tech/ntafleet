import React, { Fragment,useState } from 'react'
import { Col, Row, Form } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm } from 'react-hook-form';
import DatePickerInput from '../../Forms/FormControl/formInput/DatePickerInput';
import HeaderCard from '../../Common/Component/HeaderCard';
import {CreateTcheckInvoice} from '../../../api/index'
import axios from 'axios';
import { toast } from 'react-toastify';
const Create = ({ title, btnTitle }) => {
    const [loading, setLoading] = useState(false);
  
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm();


  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const onSubmit = (data) => {
    setLoading(true);

    const basePayload = {
      // invoice_creation: "",
      from: data.startDate ? formatDate(data.startDate) : "",
      to: data.endDate ? formatDate(data.endDate) : "",
    };

   
      // ---- RACK CONDITIONS ----

setLoading(true)
      axios
        .post(CreateTcheckInvoice, basePayload, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          toast.success(res.data.message);
          reset();
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err);
          setLoading(false);
        });
    } 
  
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
