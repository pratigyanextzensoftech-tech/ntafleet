import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container } from 'reactstrap';
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
        <HeaderCard title="Manage Menu" />
        <BasicTabCard tabContent={ManageMenuTab} />
        <div className='my-5'>
          <BasicTabCard tabContent={menuTabs} />
        </div>
      </Container>
    </Fragment>
  );
};

export default Index;
