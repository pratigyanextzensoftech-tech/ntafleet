import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container, Row, Col } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import PetroForm from './PetroForm';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Retail Prices' title='Petro Retail Price'  />
      <Container fluid={true}>
                   <HeaderCard title="Petro Retail Price" />
                    <div className='bg-primary p-2 my-5'>
                            <HeaderCard title="Filters " />
                    </div>      
                 <PetroForm btnTitle="Search Data" btnTitle1="Reset"/>   
                    
<DataTableComponent title="Items List" tableColumns={tableColumns}  tableData={dummytabledata}/>
      </Container>
    </Fragment>
  );
};

export default index;