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
                               <div style={{border:"1px solid #ccc",padding:"5px 5px",bprderRadius:"3px",marginBottom:"10px"}}>

                    <div className='bg-primary p-2 my-3'>
                            <HeaderCard title="Add TA-Petro Zero Discount Location  " />
                    </div>      
                 <ZeroDiscount btnTitle="Save Location" />   
                  </div> 
<DataTableComponent title="TA-Petro Location List  " tableColumns={tableColumns}  tableData={dummytabledata}/>
      </Container>
    </Fragment>
  );
};

export default index;