import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container, Row, Col } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import AddFuel from './AddFuel'
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Fuel Cards' title='Add Fuel Card'  />
      <Container fluid={true}>
                   <HeaderCard title="Add Fuel Cards" />
                    <div className='bg-primary p-2'>
                            <HeaderCard title="Add Fuel Cards " />
                    </div>      
                 <AddFuel btnTitle="Add Card" />   
           
      </Container>
    </Fragment>
  );
};

export default index;