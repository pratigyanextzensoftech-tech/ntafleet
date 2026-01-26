
import React, { Fragment } from 'react';
import { Row, Col, Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from "../../../AbstractElements";
import { useForm } from 'react-hook-form';
import InputText from '../../Forms/FormControl/formInput/InputText';
const UltramarPetro = ({ title }) => {
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
                <Col xl="4"  md="6" sm="12">
                  <InputText
                    name="essoLoc"
                    label="Esso Location"
                    type="text"
                    register={register}
                    errors={errors}
                    rules={{ required: "Required" }}
                  />

                </Col>
                <Col xl="4"  md="6" sm="12">
                  <InputText
                    name="essoCity"
                    label="Esso City"
                    type="text"
                    register={register}
                    errors={errors}
                    rules={{ required: "Required" }}
                  />

                </Col>
                <Col xl="4"  md="6" sm="12">
                  <InputText
                    name="essoState"
                    label="Esso State"
                    type="text"
                    register={register}
                    errors={errors}
                    rules={{ required: "Required" }}
                  />
                </Col>
             
                <Col xl="4"  md="6" sm="12">
                  <InputText
                    name="petroLoc"
                    label="Petro Location"
                    type="text"
                    register={register}
                    errors={errors}
                    rules={{ required: "Required" }}
                  />

                </Col>

                <Col xl="4"  md="6" sm="12">
                  <InputText
                    name="petroCity"
                    label="Petro City"
                    type="text"
                    register={register}
                    errors={errors}
                    rules={{ required: "Required" }}
                  />
                </Col>

                <Col xl="4"  md="6" sm="12">
                  <InputText
                    name="petroState"
                    label="Petro State"
                    type="text"
                    register={register}
                    errors={errors}
                    rules={{ required: "Required" }}
                  />
                </Col>


           
                <Col xl="12"  md="12" sm="12">
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

export default UltramarPetro;