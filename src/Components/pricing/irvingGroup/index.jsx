import React, { Fragment, useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from "../../UiKits/Tabs/BoostrapTabs/BasicTabCard";
import { IrvingGroupRackTab } from "../../../Data/tab/IrvingGroupRackTab";
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Pricing" title="Update ESSO Group Rack Cent" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Update Irving Group Rack Cent" />
              <CardBody>
                <BasicTabCard tabContent={IrvingGroupRackTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default index;
