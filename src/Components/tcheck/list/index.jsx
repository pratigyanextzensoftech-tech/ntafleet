import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import List from './List';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Tcheck' title='T Check List '  />
      <Container fluid={true}>
                   <HeaderCard title="T Check List " />
                    <div className='bg-primary p-2 mb-4'>
                            <HeaderCard title="Filters " />
                    </div>      
                 <List btnTitle="search Data" btnTitle1="Reset"/>   
                   <div className='bg-primary p-2'>
                            <HeaderCard title="T Check List  " />
                    </div>   
                    <DataTableComponent tableColumns={tableColumns} tableData={dummytabledata}/>
      </Container>
    </Fragment>
  );
};

export default index;