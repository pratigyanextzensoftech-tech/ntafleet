import React, { Fragment, useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import UpdateEssocent from "./UpdateEssoCent";
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Pricing" title="Update ESSO Group Rack Cent" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="ESSO Group Rack Entry" />
              <CardBody>
                <UpdateEssocent btnTitle="Search Group" />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default index;
