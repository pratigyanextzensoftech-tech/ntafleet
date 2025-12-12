import React, { Fragment, useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from "../../UiKits/Tabs/BoostrapTabs/BasicTabCard"; 
import { TaPetroTab } from "../../../Data/tab/TaPetroTab";

const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Pricing" title="Manage Ta-Petro Bulk Pricing PDF" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Bulk Pricing PDF" />
              <CardBody>
                <BasicTabCard tabContent={TaPetroTab} />
              </CardBody>
            </Card>
          </Col>
        </Row> 
     
      </Container>
    </Fragment>
  );
};

export default index;
