
import React, { Fragment } from 'react';
import { Row, Col, Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from "../../../AbstractElements";
import HeaderCard from '../../Common/Component/HeaderCard';
import InputText from '../../Forms/FormControl/formInput/InputText';
import { useForm } from 'react-hook-form';
const CountryForm = () => {
    const {
        register,
        control,
        reset,
        handleSubmit,
        formState: { errors, isSubmitted, isValid },
    } = useForm();
    return (
        <Fragment >
            <Form>
                <Row>
                    <Col md="8">
                        <InputText
                            name="country"
                            label="Country Name"
                            type="text"
                            register={register}
                            errors={errors}
                            rules={{ required: "Required" }}
                        />

                    </Col>
                    <Col md="4">
                        <div className='text-end'>
                            <Btn attrBtn={{ color: "primary", className: "m-r-15 ", type: "submit" }} >Add Country</Btn>
                        </div>
                    </Col>

                </Row>

            </Form> 
        </Fragment>
    );
};

export default CountryForm;