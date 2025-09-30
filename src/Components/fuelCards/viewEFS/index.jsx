import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Fuel Cards' title=' View EFS Fual Cards'  />
      <Container fluid={true}>
                   <HeaderCard title="View EFS Fual Cards" />
                    <div className='bg-primary p-2'>
                            <HeaderCard title=" View EFS Fual Cards " />
                    </div>      
<DataTableComponent tableColumns={tableColumns} tableData={dummytabledata}/>    
      </Container>
    </Fragment>
  );
};

export default index;