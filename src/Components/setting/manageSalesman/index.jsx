import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata';
import ManageSalesman from './ManageSalesman';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Setting' title='Manage Sales Man'  />
      <Container fluid={true}>
        <HeaderCard title="Manage Sales Man "/>
        <ManageSalesman/>
           
<DataTableComponent title=" Sales Man List " tableColumns={tableColumns} tableData={dummytabledata}/>
      </Container>
    </Fragment>
  );
};

export default index;