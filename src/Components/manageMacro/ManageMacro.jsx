import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../AbstractElements';
import { Container, Row, Col } from 'reactstrap';
import HeaderCard from '../Common/Component/HeaderCard';
import BasicTabCard from '../UiKits/Tabs/BoostrapTabs/BasicTabCard';
import { ManageMacroTab } from '../../Data/tab/ManageMacroTab';
const ManageMacro = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Manage Macro' title='Upload US Transaction'  />
      <Container fluid={true}>
                   <HeaderCard title="Upload US Transaction" />
        <Row>
          <Col sm='12'>
                <BasicTabCard tabContent={ManageMacroTab}/>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ManageMacro;