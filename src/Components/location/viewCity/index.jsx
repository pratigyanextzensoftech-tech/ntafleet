import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata';
import ViewCityForm from './ViewCityForm';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Location' title='Manage City'  />
      <Container fluid={true}>
        <HeaderCard title="Manage City "/>
        <ViewCityForm/>
           <div className='my-3'>
<DataTableComponent title="City List " tableColumns={tableColumns} tableData={dummytabledata}/>
</div>
      </Container>
    </Fragment>
  );
};

export default index;