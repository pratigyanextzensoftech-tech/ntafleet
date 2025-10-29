import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata';
import ViewCityForm from './ViewCityForm';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Location' title='Manage City' />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Add City" />
              <CardBody>
                <ViewCityForm />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <DataTableComponent title="City List " tableColumns={tableColumns} tableData={dummytabledata} />
      </Container>
    </Fragment>
  );
};

export default index;