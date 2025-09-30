import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Fuel Cards' title='Fual Cards Update History'  />
      <Container fluid={true}>
                   <HeaderCard title="Fual Cards Update History" />
                    <div className='bg-primary p-2'>
                            <HeaderCard title="Fual Cards Update History " />
                    </div>      
<DataTableComponent tableColumns={tableColumns} tableData={dummytabledata}/>    
      </Container>
    </Fragment>
  );
};

export default index;