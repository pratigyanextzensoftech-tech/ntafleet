import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata';
import CountryForm from './CountryForm';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Location' title='Manage Country'  />
      <Container fluid={true}>
        <HeaderCard title="Manage Country "/>
        <CountryForm/>
           <div className='my-3'>
<DataTableComponent title="Country List  " tableColumns={tableColumns} tableData={dummytabledata}/>
</div>
      </Container>
    </Fragment>
  );
};

export default index;