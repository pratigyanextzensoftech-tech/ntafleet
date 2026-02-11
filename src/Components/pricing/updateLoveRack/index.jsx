import React, { Fragment, useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from "../../UiKits/Tabs/BoostrapTabs/BasicTabCard";
import { UpdateLoveRackTab } from "../../../Data/tab/UpdateLoveRackCentTab"; 
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Pricing" title="Update Love Rack Cent" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Update Love Rack Cent" />
              <CardBody>
                <BasicTabCard tabContent={UpdateLoveRackTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default index;
