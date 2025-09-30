import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container, Row, Col } from 'reactstrap';
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
                    <div className='bg-primary p-2 my-5'>
                            <HeaderCard title="Upload Retail Prices " />
                    </div>      
                 <Upload btnTitle="Add Item"/>   
                   <div className='bg-primary p-2 my-5'>
                        <HeaderCard title="Items List" />
                 </div>  
<DataTableComponent tableColumns={tableColumns}  tableData={dummytabledata}/>
      </Container>
    </Fragment>
  );
};

export default index;