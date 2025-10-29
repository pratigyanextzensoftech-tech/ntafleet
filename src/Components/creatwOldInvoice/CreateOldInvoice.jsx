import React, { Fragment } from 'react'
import { Breadcrumbs } from '../../AbstractElements'
import HeaderCard from '../Common/Component/HeaderCard'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from '../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { CreateOldInvoiceTab } from '../../Data/tab/CreateOldInvoiceTab'
const CreateOldInvoice = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Invoice' title='Create Old Invoice' />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Create Old Rack  Invoice" />
              <CardBody>
                <BasicTabCard tabContent={CreateOldInvoiceTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>

      </Container>
    </Fragment>
  )
}

export default CreateOldInvoice
