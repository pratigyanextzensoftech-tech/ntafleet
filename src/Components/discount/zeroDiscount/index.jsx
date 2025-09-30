import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata';
import ZeroDiscount from './ZeroDiscount';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Discount' title='TA-Petro Zero Discount Location'  />
      <Container fluid={true}>
                   <HeaderCard title="TA-Petro Zero Discount Location" />
                    <div className='bg-primary p-2'>
                            <HeaderCard title="Add TA-Petro Zero Discount Location  " />
                    </div>      
                 <ZeroDiscount btnTitle="Save Location" />   
                   <div className='bg-primary p-2 my-5'>
                        <HeaderCard title="TA-Petro Location List  " />
                 </div>  
<DataTableComponent tableColumns={tableColumns}  tableData={dummytabledata}/>
      </Container>
    </Fragment>
  );
};

export default index;