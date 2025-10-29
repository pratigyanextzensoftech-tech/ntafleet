import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../AbstractElements';
import { Container, Row, Col,Card,CardBody } from 'reactstrap';
import HeaderCard from '../Common/Component/HeaderCard';
import UseFormEssl from './UseFormEssl'
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Help' title='Add Card' />
      <Container fluid={true}>

        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="How To Add Card" />
              <CardBody>
                <UseFormEssl title="How use efsllc.com With NTA" />
              </CardBody>
            </Card>
          </Col>
        </Row>

      </Container>
    </Fragment>
  );
};

export default index;