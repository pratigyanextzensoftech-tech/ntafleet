import React, { Fragment } from 'react'
import { Form, Row, Col, Card, CardBody, FormGroup, Input, InputGroupText, Container } from 'reactstrap'
import { Btn } from '../../AbstractElements'
import HeaderCard from '../Common/Component/HeaderCard'
const ManageMacroForm = ({ title, btnTtitle }) => {
    return (
        <Fragment>
            <Row>
                <Col>
                    <fieldset>
                        <legend>{title}</legend>
                        <Form >

                            <Row className='px-3'>
                                <Col sm="9">
                                    <Row>
                                        <Col className='px-0' sm="2">

                                            <InputGroupText className='h-100'>File</InputGroupText>
                                        </Col>
                                        <Col className='px-0' sm="10">

                                            <Input style={{ border: "1px solid #ccc" }} className="form-control w-100c " type="file" />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm="3">

                                    <div className='text-end'>
                                        <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTtitle}</Btn>

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

export default ManageMacroForm
