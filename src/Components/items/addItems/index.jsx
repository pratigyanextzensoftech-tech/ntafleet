import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container, Row, Col } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import AddItems from './AddItems'
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Items' title='Manage Item'  />
      <Container fluid={true}>
                   <HeaderCard title="Manage Item" />
       
                <div className='bg-primary p-2 my-5'>
                            <HeaderCard title="Add Items" />
                 </div>      
                 <AddItems btnTitle="Add Item"/>   
                  
<DataTableComponent title="Items List" tableColumns={tableColumns}  tableData={dummytabledata}/>
      </Container>
    </Fragment>
  );
};

export default index;