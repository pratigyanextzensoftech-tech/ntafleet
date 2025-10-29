import React, { Fragment } from 'react'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from '../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { Breadcrumbs } from '../../AbstractElements'
import { RetailInvoiceTab } from '../../Data/tab/RetailInvoice'
import HeaderCard from '../Common/Component/HeaderCard'
const RetailInvoice = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Invoice' title='Create Rack Invoice' />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Create Rack Invoice" />
              <CardBody>
                <BasicTabCard tabContent={RetailInvoiceTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  )
}

export default RetailInvoice
