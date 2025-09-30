import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata';
import DiscountSheetForm from './DiscountSheet'
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Discount' title='Manage Discount Sheet'  />
      <Container fluid={true}>
                   <HeaderCard title="Manage Discount Sheet" />
                    <div className='bg-primary p-2 my-5'>
                            <HeaderCard title="Create Discount Sheet " />
                    </div>      
                 <DiscountSheetForm btnTitle="Create" />   
                   <div className='bg-primary p-2 my-5'>
                        <HeaderCard title="Discount Sheet List " />
                 </div>  
<DataTableComponent tableColumns={tableColumns}  tableData={dummytabledata}/>
      </Container>
    </Fragment>
  );
};

export default index;