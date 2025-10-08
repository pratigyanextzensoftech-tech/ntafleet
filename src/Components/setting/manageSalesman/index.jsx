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
                     <div style={{border:"1px solid #ccc",padding:"5px 5px",bprderRadius:"3px",marginBottom:"10px"}}>

          <div  className='bg-primary p-2 my-3'>
                        <HeaderCard title="Add Sales Man  " />
                        </div>
        <ManageSalesman/>
           </div>
<DataTableComponent title=" Sales Man List " tableColumns={tableColumns} tableData={dummytabledata}/>
      </Container>
    </Fragment>
  );
};

export default index;