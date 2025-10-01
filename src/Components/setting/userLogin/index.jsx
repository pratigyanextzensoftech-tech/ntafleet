import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Setting' title='User Login Log'  />
      <Container fluid={true}>
       <HeaderCard title="User Login Log"/>
<DataTableComponent title="User Login Log" tableColumns={tableColumns} tableData={dummytabledata}/>
      </Container>
    </Fragment>
  );
};

export default index;