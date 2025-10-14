import React, { Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import { Breadcrumbs } from '../../../AbstractElements';
import AddCard from './AddCard';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Help' title='How Add Card..?
'  />
      <Container fluid={true}>
                   <HeaderCard title="How Add Card..?
" />
    
                 <AddCard title="How Add Card..?
" />   
      </Container>
    </Fragment>
  );
};

export default index;