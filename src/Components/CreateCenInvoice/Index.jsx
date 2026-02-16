import React, { Fragment } from "react";
import { Breadcrumbs } from "../../AbstractElements";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import HeaderCard from "../Common/Component/HeaderCard";
import BasicTabCard from "../UiKits/Tabs/BoostrapTabs/BasicTabCard";
import { CenInvoiceTab } from "../../Data/tab/CreateCenTab";
const Index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Invoice" title="Create Esso Invoice" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Create Retail Invoice" />
              <CardBody>
                <BasicTabCard tabContent={CenInvoiceTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Index;
