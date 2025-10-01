import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata';
import BasicTabCard from '../../UiKits/Tabs/BoostrapTabs/BasicTabCard';
import {ManageMenuTab} from '../../../Data/tab/ManageMenuTab'
import { ManageMenuTable } from '../../../Data/tab/ManageMenuTable';
import { LocPetroLink } from '../../../Data/tab/LocPetroLink';
import { LocPetroLinkTable } from '../../../Data/tab/LocPetroLinkTable';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Location' title='ESSO Petro Link'  />
      <Container fluid={true}>
                <HeaderCard title="ESSO Petro Link"/>
            <BasicTabCard   tabContent={LocPetroLink}/>
            <div className='my-5'>
            <BasicTabCard   tabContent={LocPetroLinkTable }/>

</div>
      </Container>
    </Fragment>
  );
};

export default index;