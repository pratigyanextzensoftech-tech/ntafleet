import React, { Fragment, useState } from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import DataTableComponent from '../../Tables/DataTable/DataTableComponent'
import { tableColumns, dummytabledata } from '../../../Data/Table/Defaultdata'
import { Btn } from '../../../AbstractElements'
import AddMoneyCodeForm from './AddMoneyCodeForm'
const index = () => {

  return (
    <Fragment>
      <Breadcrumbs parent='Money Code' title=' Add MoneyCode ' />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Add MoneyCode" />
              <CardBody>
                <AddMoneyCodeForm btntitle="Add Money Code" />
              </CardBody>
            </Card>
          </Col>
        </Row>
</Container>
    </Fragment>
  )
}

export default index
