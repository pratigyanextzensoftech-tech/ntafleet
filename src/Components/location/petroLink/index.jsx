import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container,Row,Col,Card,CardBody } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import BasicTabCard from '../../UiKits/Tabs/BoostrapTabs/BasicTabCard';
import { LocPetroLink } from '../../../Data/tab/LocPetroLink';
import { LocPetroLinkTable } from '../../../Data/tab/LocPetroLinkTable';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Location' title='ESSO Petro Link' />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="ESSO Petro Link" />
              <CardBody>
                <BasicTabCard tabContent={LocPetroLink} />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="ESSO Petro Link List" />
              <CardBody>
                <BasicTabCard tabContent={LocPetroLinkTable} />
              </CardBody>
            </Card>
          </Col>
        </Row>


      </Container>
    </Fragment>
  );
};

export default index;