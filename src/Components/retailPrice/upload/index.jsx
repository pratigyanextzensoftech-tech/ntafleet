import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import Upload from './Upload';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Retail Prices' title='Upload Retail Prices'  />
      <Container fluid={true}>
                           <HeaderCard title="Manage Retail Prices" />

                    <div style={{border:"1px solid #ccc",padding:"5px 10px",bprderRadius:"3px",marginBottom:"10px"}}>

                    <div className='bg-primary p-2 my-3'>
                            <HeaderCard title="Upload Retail Prices " />
                    </div>      
                 <Upload btnTitle="Add Item"/>   
                   </div>
<DataTableComponent title="Items List" tableColumns={tableColumns}  tableData={dummytabledata}/>
      </Container>
    </Fragment>
  );
};

export default index;