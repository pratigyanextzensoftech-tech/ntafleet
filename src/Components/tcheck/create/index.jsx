import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container,Row,Col,Card,CardBody } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import Create from './Create';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Tcheck' title='Create T-Check Invoice ' />
      <Container fluid={true}> 
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Create T-Check Invoice" />
              <CardBody>
                <Create btnTitle="Create T-check Invoice" />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default index;