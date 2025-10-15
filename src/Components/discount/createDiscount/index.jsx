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
                               <div style={{border:"1px solid #ccc",padding:"5px 5px",bprderRadius:"3px",marginBottom:"10px"}}>
                   
                    <div className='bg-primary p-2 my-3'>
                            <HeaderCard title="Create Single Discount " />
                    </div>      
                 <Create btnTitle="Create" />   
                </div>
<DataTableComponent  title="Discount List "  tableColumns={tableColumns}  tableData={dummytabledata}/>
      </Container>
    </Fragment>
  );
};

export default index;