import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata';
import StateForm from './StateForm';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Location' title='Manage State'  />
      <Container fluid={true}>
        <HeaderCard title="Manage State "/>
        <StateForm/>
           <div className='my-3'>
<DataTableComponent title="State List  " tableColumns={tableColumns} tableData={dummytabledata}/>
</div>
      </Container>
    </Fragment>
  );
};

export default index;