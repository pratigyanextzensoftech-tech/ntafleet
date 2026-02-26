import React, { Fragment, useState,useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from "../../UiKits/Tabs/BoostrapTabs/BasicTabCard";
import { EssoBulkTab } from "../../../Data/tab/EssoBulkTab";
const Index = () => {
  
  return (
    <Fragment>
      <Breadcrumbs parent="Pricing" title="Manage ESSO Bulk Pricing PDF" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Create ESSO Bulk Pricing PDF" />
              <CardBody>
                <BasicTabCard tabContent={EssoBulkTab}  />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Index;
