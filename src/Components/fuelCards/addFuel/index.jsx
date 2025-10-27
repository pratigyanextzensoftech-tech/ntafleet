import React, { Fragment } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import HeaderCard from "../../Common/Component/HeaderCard";
import AddFuel from "./AddFuel";
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Fuel Cards" title="Add Fuel Card" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Add Fuel Cards" />
              <CardBody>
                <AddFuel title="Add Fuel Cards " btnTitle="Add Card" />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default index;
