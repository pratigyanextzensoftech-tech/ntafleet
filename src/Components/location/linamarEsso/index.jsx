import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata';
import LinamarForm from './LinamarForm';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Location' title='Manage Linamar Esso Location'  />
      <Container fluid={true}>
        <HeaderCard title="Manage Linamar Esso Location "/>
        <LinamarForm/>
           <div className='my-3'>
<DataTableComponent title=" Linamar Esso Location List  " tableColumns={tableColumns} tableData={dummytabledata}/>
</div>
      </Container>
    </Fragment>
  );
};

export default index;