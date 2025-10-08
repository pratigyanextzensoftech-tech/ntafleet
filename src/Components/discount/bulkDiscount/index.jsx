import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';

import BulkDiscount from './BulkDiscount';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Discount' title='Multiple Rebate Entry'  />
      <Container fluid={true}>
                   <HeaderCard title="Multiple Rebate Entry" />
                               <div style={{border:"1px solid #ccc",padding:"5px 5px",bprderRadius:"3px",marginBottom:"10px"}}>

                    <div className='bg-primary p-2 my-3'>
                            <HeaderCard title="Multiple Rebate Entry  " />
                    </div>      
                 <BulkDiscount btnTitle="Enter Discount Cent" />   
                   </div>
      </Container>
    </Fragment>
  );
};

export default index;