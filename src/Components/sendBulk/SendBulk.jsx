import React,{Fragment} from 'react'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from '../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { Breadcrumbs } from '../../AbstractElements'
import { SendBulkTab } from '../../Data/tab/SendBulkTab'
import HeaderCard from '../Common/Component/HeaderCard'
import { SendBulkTable } from '../../Data/tab/SendBulkTable'
const SendBulk = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Invoice" title="Send Bulk Invoice" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Send Bulk Invoice" />
              <CardBody>
                <BasicTabCard tabContent={SendBulkTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>
         <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Send Bulk Invoice" />
              <CardBody>
                <BasicTabCard tabContent={SendBulkTable} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment> 
               
  )
}

export default SendBulk
