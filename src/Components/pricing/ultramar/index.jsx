import React, { Fragment, useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from "../../UiKits/Tabs/BoostrapTabs/BasicTabCard";
import { UltramarBulkTab } from "../../../Data/tab/UltramarBulkTab";
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Pricing" title="Manage ULTRAMAR Bulk Pricing PDF" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Create ULTRAMAR Bulk Pricing PDF" />
              <CardBody>
                <BasicTabCard tabContent={UltramarBulkTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default index;
