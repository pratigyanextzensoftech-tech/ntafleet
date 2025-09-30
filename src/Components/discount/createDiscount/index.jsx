import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import Create from './Create';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Discount' title='Create Single Discount'  />
      <Container fluid={true}>
                   <HeaderCard title="Create Single Discount" />
                    <div className='bg-primary p-2 my-5'>
                            <HeaderCard title="Create Single Discount " />
                    </div>      
                 <Create btnTitle="Create" />   
                   <div className='bg-primary p-2 my-5'>
                        <HeaderCard title="Discount List " />
                 </div>  
<DataTableComponent tableColumns={tableColumns}  tableData={dummytabledata}/>
      </Container>
    </Fragment>
  );
};

export default index;