import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../AbstractElements';
import { Container, Row, Col } from 'reactstrap';
import HeaderCard from '../Common/Component/HeaderCard';
import ReportDashboardForm from './ReportDashboardForm'
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Dashboard' title='Report Dashboard'  />
      <Container fluid={true}>
                   <HeaderCard title="Report Dashboard" />
                                   <div style={{border:"1px solid #ccc",padding:"5px 5px",bprderRadius:"3px",marginBottom:"10px"}}>
      <div className='bg-primary p-2 my-3'>
                            <HeaderCard title="Report Dashboard" />
                 </div>    
                 <ReportDashboardForm title="Filters " btnTitle="Add Card" btnTitle1="Reset"/>   
           </div>
      </Container>
    </Fragment>
  );
};

export default index;