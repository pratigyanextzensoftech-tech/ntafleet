import React, { Fragment, useState } from 'react'
import { Breadcrumbs } from '../../AbstractElements'
import HeaderCard from '../Common/Component/HeaderCard'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { View_Invoice_Table } from '../../Data/tab/ViewInvoiceTable'
import ViewMoneyCodeForm from './ViewMoneyCodeForm'
import DataTableComponent from '../Tables/DataTable/DataTableComponent'
import { tableColumns, dummytabledata } from '../../Data/Table/Defaultdata'
const ViewMoneyCode = () => {

  return (
    <Fragment>
      <Breadcrumbs parent='Invoice' title='view MoneyCode' />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="MoneyCode Invoices List" />
              <CardBody>
                <ViewMoneyCodeForm />
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* <div style={{ border: "1px solid #ccc", padding: "5px 5px", bprderRadius: "3px", marginBottom: "10px" }}>
          <div className="bg-primary p-2 my-3">

            <HeaderCard title="MoneyCode Invoices List" />
          </div>
          <ViewMoneyCodeForm />
        </div> */}

        <DataTableComponent title="MoneyCode Invoices List" tableColumns={tableColumns} tableData={dummytabledata} />
      </Container>
    </Fragment>
  )
}

export default ViewMoneyCode
