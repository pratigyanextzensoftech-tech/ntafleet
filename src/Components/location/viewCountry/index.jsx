import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata';
import CountryForm from './CountryForm';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Location' title='Manage Country' />
      <Container fluid={true}>

        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Add Country" />
              <CardBody>
                <CountryForm />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <DataTableComponent title="Country List  " tableColumns={tableColumns} tableData={dummytabledata} />

      </Container>
    </Fragment>
  );
};

export default index;