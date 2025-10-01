import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import BasicTabCard from '../../UiKits/Tabs/BoostrapTabs/BasicTabCard';
import { ManageLocTable } from '../../../Data/tab/ManageLocTable';

const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Location' title='Manage Flying J Location
'  />
      <Container fluid={true}>
                <HeaderCard title="Manage Flying J Location
"/>
            <BasicTabCard   tabContent={ManageLocTable }/>


      </Container>
    </Fragment>
  );
};

export default index;