import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import View from './View';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Tcheck' title='T-Check Invoices List '  />
      <Container fluid={true}>
                   <HeaderCard title="T-Check Invoices List " />
                    <div className='bg-primary p-2 mb-4'>
                            <HeaderCard title="Filters " />
                    </div>      
                 <View btnTitle="search Data"/>   
                    
                    <DataTableComponent title="T Check Invoice List  " tableColumns={tableColumns} tableData={dummytabledata}/>
      </Container>
    </Fragment>
  );
};

export default index;