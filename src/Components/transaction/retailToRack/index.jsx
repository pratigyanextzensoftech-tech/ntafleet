import React, { Fragment, useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from "../../UiKits/Tabs/BoostrapTabs/BasicTabCard";
import { RetailToRackTab } from "../../../Data/tab/RetailToRackTab";
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Transaction" title="Retail To Rack" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Retail To Rack" />
              <CardBody>
                <BasicTabCard tabContent={RetailToRackTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}; 
export default index;
