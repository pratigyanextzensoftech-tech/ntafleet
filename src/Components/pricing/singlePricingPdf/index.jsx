import React, { Fragment, useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from "../../UiKits/Tabs/BoostrapTabs/BasicTabCard";
import { SinglepricingTableTab } from "../../../Data/tab/SinglePricingTableTab";
import { SinglepricingTab } from "../../../Data/tab/SinglePricingTab";
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Pricing" title="Pricing List" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Create Pricing PDF" />
              <CardBody>
                <BasicTabCard tabContent={SinglepricingTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Pricing List" />
              <CardBody>
                <BasicTabCard tabContent={SinglepricingTableTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default index;
