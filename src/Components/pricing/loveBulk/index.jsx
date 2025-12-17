import React, { Fragment, useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col,Card, CardBody } from "reactstrap";
import BasicTabCard from "../../UiKits/Tabs/BoostrapTabs/BasicTabCard"; 
import { LovePricingTab } from "../../../Data/tab/LovePricingTab";
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Pricing" title="Manage LOVE Bulk Pricing PDF" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Create LOVE Bulk Pricing" />
              <CardBody>
                <BasicTabCard tabContent={LovePricingTab} />
              </CardBody>
            </Card>
          </Col>
        </Row> 
       
      </Container>
    </Fragment>
  );
};

export default index;
