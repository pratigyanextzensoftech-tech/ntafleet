import React from 'react'
import { Form, Row, Col, Card, CardBody, FormGroup, Input, InputGroupText } from 'reactstrap'
import { Btn } from '../../AbstractElements'
const ManageMacroForm = () => {
    return (
        <div>
            <Form className="form theme-form">
                <CardBody>
                    <Row>
                        <Col sm="9">
                            <Row>


                            <Col className='px-0' sm="2">

                                <InputGroupText className='h-100'>File</InputGroupText>
                            </Col>
                            <Col className='px-0' sm="10">

                                <Input style={{border:"1px solid #ccc"}} className="form-control w-100c " type="file" />
                            </Col>
                                                        </Row>
                        </Col>
                        <Col sm="3">

                            <div className='text-end'>
                                <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >Upload Us Transaction</Btn>

                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Form>
        </div>
    )
}

export default ManageMacroForm
