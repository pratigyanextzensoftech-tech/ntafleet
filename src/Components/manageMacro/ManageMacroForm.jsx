import React from 'react'
import { Form, Row, Col, Card, CardBody, FormGroup, Input, InputGroupText,Container } from 'reactstrap'
import { Btn } from '../../AbstractElements'
import HeaderCard from '../Common/Component/HeaderCard'
const ManageMacroForm = ({title,btnTtitle}) => {
    return (
                                       <div style={{border:"1px solid #ccc",padding:"5px 5px",bprderRadius:"3px",marginBottom:"10px"}}>

        <Container fluid={true}>
 <div className="bg-primary p-2 my-3">
                           <HeaderCard title={title} />

                      </div>
            <Form >
                
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
                                <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTtitle}</Btn>

                            </div>
                        </Col>
                    </Row>
            </Form>
        </Container>
        </div>
    )
}

export default ManageMacroForm
