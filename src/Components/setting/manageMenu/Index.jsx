import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container, Row, Card, Col, CardBody } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import BasicTabCard from '../../UiKits/Tabs/BoostrapTabs/BasicTabCard';
import { ManageMenuTab } from '../../../Data/tab/ManageMenuTab';
import ManageMenuTable from '../../../Data/tab/ManageMenuTable'; 
const Index = () => {
const menuTabs = ManageMenuTable(); // returns array of tabs

  return (
    <Fragment>
      <Breadcrumbs parent='Setting' title='Manage Menu' />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Manage Menu" />
              <CardBody>
                <BasicTabCard tabContent={ManageMenuTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Menu List" />
              <CardBody>
                <BasicTabCard tabContent={menuTabs} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Index;
