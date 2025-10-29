import React, { Fragment } from 'react'
import { Breadcrumbs } from '../../AbstractElements';
import HeaderCard from '../Common/Component/HeaderCard';
import BasicTabCard from '../UiKits/Tabs/BoostrapTabs/BasicTabCard';
import { Container, Card, CardBody, Col, Row } from 'reactstrap';
import Form from './CheckInvoiceForm';
import DataTableComponent from '../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../Data/Table/checkInvoiceTableData';
const CheckOldINvoice = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Invoice' title='check old Invoices' />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="check old Invoices" />
              <CardBody>
                <Form />
              </CardBody>
            </Card>
          </Col>
        </Row> 
        <DataTableComponent title="Invoices List" tableColumns={tableColumns} tableData={dummytabledata} />
      </Container>
    </Fragment>
  )
}

export default CheckOldINvoice
