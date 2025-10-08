import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import List from './List';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Tcheck' title='T Check List '  />
      <Container fluid={true}>
                   <HeaderCard title="T Check List " />
                                        <div style={{border:"1px solid #ccc",padding:"5px 5px",bprderRadius:"3px",marginBottom:"10px"}}>

                    <div className='bg-primary p-2 mb-4'>
                            <HeaderCard title="Filters " />
                    </div>      
                 <List btnTitle="search Data" btnTitle1="Reset"/>   
                    </div>
                    <DataTableComponent title="T Check List" tableColumns={tableColumns} tableData={dummytabledata}/>
      </Container>
    </Fragment>
  );
};

export default index;