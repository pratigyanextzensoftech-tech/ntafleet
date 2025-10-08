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
                               <div style={{border:"1px solid #ccc",padding:"5px 5px",bprderRadius:"3px",marginBottom:"10px"}}>

                    <div className='bg-primary p-2 my-3'>
                            <HeaderCard title="Filters " />
                    </div>      
                 <ViewForm btnTitle="Search Data"  btnTitle1="Reset"/>   
                </div>
<DataTableComponent  title="Discount List " tableColumns={tableColumns}  tableData={dummytabledata}/>
      </Container>
    </Fragment>
  );
};

export default index;