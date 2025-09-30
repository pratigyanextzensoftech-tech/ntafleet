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
                    <div className='bg-primary p-2'>
                            <HeaderCard title="Multiple Rebate Entry  " />
                    </div>      
                 <BulkDiscount btnTitle="Enter Discount Cent" />   
                   
      </Container>
    </Fragment>
  );
};

export default index;