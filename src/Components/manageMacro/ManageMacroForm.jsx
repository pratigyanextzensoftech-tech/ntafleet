import React, { Fragment } from 'react'
import { Form, Row, Col, Card, CardBody, FormGroup, Input, InputGroupText, Container,InputGroup } from 'reactstrap'
import { Btn } from '../../AbstractElements'
import HeaderCard from '../Common/Component/HeaderCard'
const ManageMacroForm = ({ title, btnTtitle }) => {
    return (
        <Fragment>
            <Row className='my-2'>
                <Col>
                    <fieldset>
                        <legend>{title}</legend>
                        <Form >

                            <Row >
                               <Col xl="9" md="7" >
  <FormGroup>
    <InputGroup>
      <InputGroupText>File</InputGroupText>
      <Input
        type="file"
        className="form-control"
        style={{ border: "1px solid #ccc" }}
      />
    </InputGroup>
  </FormGroup>
</Col>

                                <Col xl="3" md="5">
                                    <div className='text-end '>
                                        <Btn attrBtn={{ color: "primary",  type: "submit" }} >{btnTtitle}</Btn>

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
