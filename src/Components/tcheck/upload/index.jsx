import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import Upload from './Upload';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Tcheck' title='Upload T Check '  />
      <Container fluid={true}>
                   <HeaderCard title="Upload T Check " />
                    <div className='bg-primary p-2 mb-4'>
                            <HeaderCard title="Upload T Check " />
                    </div>      
                 <Upload btnTitle="Upload T Check" />   
                  
      </Container>
    </Fragment>
  );
};

export default index;