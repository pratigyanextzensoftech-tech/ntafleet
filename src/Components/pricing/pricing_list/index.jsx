import React, { Fragment, useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from "../../UiKits/Tabs/BoostrapTabs/BasicTabCard";
import { pricingListTableTab } from "../../../Data/tab/PricingListTableTab";
import { pricingListTab } from "../../../Data/tab/PricingListTab";
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Pricing" title=" Flying J Pricing List" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Pricing List Filter" />
              <CardBody>
                <BasicTabCard tabContent={pricingListTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Pricing List" />
              <CardBody>
                <BasicTabCard tabContent={pricingListTableTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default index;
