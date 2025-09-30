import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata';
import ViewForm from './ViewForm';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Discount' title='View Discounts'  />
      <Container fluid={true}>
                   <HeaderCard title="View Discounts" />
                    <div className='bg-primary p-2 my-5'>
                            <HeaderCard title="Filters " />
                    </div>      
                 <ViewForm btnTitle="Search Data"  btnTitle1="Reset"/>   
                   <div className='bg-primary p-2 my-5'>
                        <HeaderCard title="Discount List " />
                 </div>  
<DataTableComponent tableColumns={tableColumns}  tableData={dummytabledata}/>
      </Container>
    </Fragment>
  );
};

export default index;