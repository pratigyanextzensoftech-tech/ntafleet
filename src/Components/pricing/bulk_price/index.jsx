import React, { Fragment } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from "../../UiKits/Tabs/BoostrapTabs/BasicTabCard";
import { BulkPricingTab } from "../../../Data/tab/BulkPricingTab";
const Index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Pricing" title=" Manage Bulk Pricing PDF" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Manage Bulk Pricing PDF" />
              <CardBody>
                <BasicTabCard tabContent={BulkPricingTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>   
       
      </Container>
    </Fragment>
  );
};

export default Index;
