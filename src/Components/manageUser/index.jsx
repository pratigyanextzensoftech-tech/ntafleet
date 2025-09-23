import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../AbstractElements';
import FormComponent from './Form'
import { Container, Row, Col } from 'reactstrap';

const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='user login' title='user login'  />
      <Container fluid={true}>
        <Row>
          <Col sm='12'>
            <FormComponent />
            {/* <BasicInputCard2 /> */}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default index;