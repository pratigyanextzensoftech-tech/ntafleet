
import React, { Fragment } from 'react';
import { Row, Col, Form } from 'reactstrap';
import { Btn } from "../../../AbstractElements";
import HeaderCard from '../../Common/Component/HeaderCard';
import { useForm } from 'react-hook-form';
import { type } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import DropDown from '../../Forms/FormControl/formInput/DropDown';
import InputText from '../../Forms/FormControl/formInput/InputText';
import usePmenu from '../../../Hooks/usePmenu';

const SecondaryMenu = ({ title }) => {
    const { pmenu, loading, error } = usePmenu();
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
                                <Col sm="4">
                                    <DropDown
                                        name="primaryMenu"
                                        label="Primary Menu "
                                        control={control}
                                        errors={errors}
                                        rules={{ required: "Menu is required" }}
                                        placeholder="Select Menu"
                                        // loading={companyLoading}
                                        options={pmenu}
                                    />

                                </Col>
                                <Col md="4">
                                    <InputText
                                        name="menuName"
                                        label="Menu Name "
                                        type="text"
                                        register={register}
                                        errors={errors}
                                        rules={{ required: " Required" }}
                                    />


                                </Col>
                                <Col md="4">
                                    <InputText
                                        name="menuLink"
                                        label="Menu Link "
                                        type="text"
                                        register={register}
                                        errors={errors}
                                        rules={{ required: " Required" }}
                                    />

                                </Col>

                            </Row>
                            <Row>
                                <Col md="4">
                                    <DropDown
                                        name="type"
                                        label="Type "
                                        control={control}
                                        errors={errors}
                                        rules={{ required: "Required" }}
                                        placeholder="Select Type"
                                        // loading={companyLoading}
                                        autoSelectFirst={true}
                                        options={type}
                                    />

                                </Col>
                                <Col md={8}>
                                    <div className='text-end'>
                                        <Btn attrBtn={{ color: "primary", className: "m-r-15 ", type: "submit" }} >Add Menu</Btn>
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

export default SecondaryMenu;