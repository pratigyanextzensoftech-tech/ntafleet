import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container, Row, Card, Col, CardBody } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import BasicTabCard from '../../UiKits/Tabs/BoostrapTabs/BasicTabCard';
import { ManageMenuTab } from '../../../Data/tab/ManageMenuTab';
import ManageMenuTable from './ManageMenuTable'; 
import MenuTable from './MenuTable';
const Index = () => {
const menuTabs = MenuTable();
 // returns array of tabs
  return (
    <Fragment>
      <Breadcrumbs parent='Setting' title='Manage Menu' />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Manage Menu" />
              <CardBody>
<BasicTabCard
  tabContent={ManageMenuTab({
    selectedRow: menuTabs.selectedRow,
    Edit: menuTabs.Edit,
    row:menuTabs.Row,
    fetchPmenuData:menuTabs.menuData,
    fetchSmenuData:menuTabs.menuData,
    setEdit: menuTabs.setEdit
  })}
/>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Menu List" />
              <CardBody>
                <BasicTabCard tabContent={menuTabs.tabs} />
              </CardBody>
            </Card>
          </Col>
        </Row>

      </Container>
    </Fragment>
  );
};

export default Index;
