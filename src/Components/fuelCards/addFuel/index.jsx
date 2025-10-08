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
                                   <div style={{border:"1px solid #ccc",padding:"5px 5px",bprderRadius:"3px",marginBottom:"10px"}}>
      <div className='bg-primary p-2 my-3'>
                            <HeaderCard title="Add Fuel Cards" />
                 </div>    
                 <AddFuel title="Add Fuel Cards " btnTitle="Add Card" />   
           </div>
      </Container>
    </Fragment>
  );
};

export default index;