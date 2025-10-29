import React, { Fragment, useState } from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from '../../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { ViewReportsTab } from '../../../Data/tab/ViewReportsTab'

const index = () => {

  return (
    <Fragment>
      <Breadcrumbs parent='Reports' title='view Reports' />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Report List" />
              <CardBody>
                <BasicTabCard title="Reports list" tabContent={ViewReportsTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  )
}

export default index
