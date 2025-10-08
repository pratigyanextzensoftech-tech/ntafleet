import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../AbstractElements';
import FormComponent from './Form'
import { Container } from 'reactstrap';
import DataTableComponent from '../Tables/DataTable/DataTableComponent';
import { tableColumns } from '../../Data/Table/Defaultdata';
import HeaderCard from '../Common/Component/HeaderCard';
import { dummytabledata } from '../../Data/Table/Defaultdata';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='user login' title='user login'  />
      <Container fluid={true}>
         <HeaderCard title="Manage User" />
                            <div style={{border:"1px solid #ccc",padding:"5px 5px",bprderRadius:"3px",marginBottom:"10px"}}>

               <div className='p-2 my-3 bg-primary '>
                <HeaderCard title="Add User "/>
            </div>
            <FormComponent />
            </div>
            {/* <BasicInputCard2 /> */}
                      <DataTableComponent title="User List"  tableColumns={tableColumns}  tableData={dummytabledata}/>

      </Container>
    </Fragment>
  );
};

export default index;