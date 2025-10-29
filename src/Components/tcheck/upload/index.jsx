import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container ,Row,Col,Card,CardBody} from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import Upload from './Upload';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Tcheck' title='Upload T Check ' />
      <Container fluid={true}> 
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Upload T Check" />
              <CardBody>
                <Upload btnTitle="Upload T Check" />
              </CardBody>
            </Card>
          </Col>
        </Row> 
      </Container>
    </Fragment>
  );
};

export default index;