import React, { Fragment, useState } from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import UploadForm from './UploadForm'
import DataTableComponent from '../../Tables/DataTable/DataTableComponent'
import { tableColumns, dummytabledata } from '../../../Data/Table/Defaultdata'
import { Btn } from '../../../AbstractElements'
const index = () => {

  return (
    <Fragment>
      <Breadcrumbs parent='Money Code' title='Upload Money Code ' />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Upload Money Code" />
              <CardBody>
                <UploadForm btntitle="Upload Money Code" />
              </CardBody>
            </Card>
          </Col>
        </Row>
        </Container>
    </Fragment>
  )
}

export default index
