import React, { Fragment } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import HeaderCard from "../../Common/Component/HeaderCard";

import BulkDiscount from "./BulkDiscount";
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Discount" title="Multiple Rebate Entry" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Multiple Rebate Entry" />
              <CardBody>
                <BulkDiscount btnTitle="Enter Discount Cent" />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default index;
