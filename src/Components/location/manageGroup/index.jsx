import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import BasicTabCard from '../../UiKits/Tabs/BoostrapTabs/BasicTabCard';
import { ManageGroupTab } from '../../../Data/tab/ManageGroupTab';
import { ManageGroupTable } from '../../../Data/tab/ManageGroupTable';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Location' title='Manage Group' />
      <Container fluid={true}>

        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Manage Group" />
              <CardBody>
                <BasicTabCard tabContent={ManageGroupTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Manage Group List" />
              <CardBody>
                <BasicTabCard tabContent={ManageGroupTable} />
              </CardBody>
            </Card>
          </Col>
        </Row> 
      </Container>
    </Fragment>
  );
};

export default index;