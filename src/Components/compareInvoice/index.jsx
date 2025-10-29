import React, { Fragment } from 'react'
import { Breadcrumbs } from '../../AbstractElements'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import HeaderCard from '../Common/Component/HeaderCard'
import CompareForm from './CompareForm'
import { tableColumns, dummytabledata } from '../../Data/Table/Defaultdata'
import DataTableComponent from '../Tables/DataTable/DataTableComponent'
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Invoice' title='Compare Invoice' />
      <Container fluid={true}><Row>
        <Col sm="12">
          <Card>
            <HeaderCard title="Compare Invoice " />
            <CardBody>
              <CompareForm btnTtitle="Search Data" btnTtitle1="Reset" />
            </CardBody>
          </Card>
        </Col>
      </Row>
        <DataTableComponent title="Compare Invoice List" tableColumns={tableColumns} tableData={dummytabledata} />
      </Container>
    </Fragment>
  )
}

export default index
