
import React, { Fragment } from 'react';
import { Row, Col, Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from "../../../AbstractElements";
import InputText from '../../Forms/FormControl/formInput/InputText';
import { useForm } from 'react-hook-form';
const PetroLinkForm = ({ title }) => {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm();
  return (
    <Fragment>
      <Row>
        <Col>
          <fieldset>
            <legend>{title}</legend>
            <Form>
              <Row>
                <Col md="4">
                  <InputText
                    name="essoLoc"
                    label="Esso Location"
                    type="text"
                    register={register}
                    errors={errors}
                    rules={{ required: "Required" }}
                  /> 
                </Col>
                <Col md="4">
                  <InputText
                    name="essoCity"
                    label="Esso City"
                    type="text"
                    register={register}
                    errors={errors}
                    rules={{ required: "Required" }}
                  /> 
                </Col>
                <Col md="4">
                  <InputText
                    name="essoState"
                    label="Esso State"
                    type="text"
                    register={register}
                    errors={errors}
                    rules={{ required: "Required" }}
                  /> 
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <InputText
                    name="petroLoc"
                    label="Petro Location"
                    type="text"
                    register={register}
                    errors={errors}
                    rules={{ required: "Required" }}
                  />
                </Col>

                <Col md="4">
                  <InputText
                    name="petroCity"
                    label="Petro City"
                    type="text"
                    register={register}
                    errors={errors}
                    rules={{ required: "Required" }}
                  />
                </Col>

                <Col md="4">
                  <InputText
                    name="petroState"
                    label="Petro State"
                    type="text"
                    register={register}
                    errors={errors}
                    rules={{ required: "Required" }}
                  /> 
                </Col> 
              </Row>
              <Row>
                <Col md={12}>
                  <div className='text-end'>
                    <Btn attrBtn={{ color: "primary", className: "m-r-15 ", type: "submit" }} >Add Location</Btn>
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

export default PetroLinkForm;