import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata';
import BasicTabCard from '../../UiKits/Tabs/BoostrapTabs/BasicTabCard';
import {ManageMenuTab} from '../../../Data/tab/ManageMenuTab'
import { ManageMenuTable } from '../../../Data/tab/ManageMenuTable';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Setting' title='Manage Menu'  />
      <Container fluid={true}>
                <HeaderCard title="Manage Menu"/>
            <BasicTabCard   tabContent={ManageMenuTab}/>
            <div className='my-5'>
            <BasicTabCard   tabContent={ManageMenuTable}/>

</div>
      </Container>
    </Fragment>
  );
};

export default index;